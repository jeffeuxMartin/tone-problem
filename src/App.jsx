import CORPUS from "./data.json";
import { useState } from "react";

import InputBox from './components/inputbox';
import MYMAP from './j43.json';
import UMAP from './j44.json';

function TTS(sent) {
  let utterance = new SpeechSynthesisUtterance(sent);
  speechSynthesis.speak(utterance);
}

function App() {
  // alert(CORPUS);
  const [value, set_value] = useState("");
  const [score, set_score] = useState(0);
  const [corpIndex, set_corpIndex] = useState(0);
  let sent = CORPUS[corpIndex];
  const tt = char => {
    if (!(char in UMAP)) {
      return char;
    }
    // console.log(char);
    let zhu = (UMAP[char]);
    let syl = (zhu.slice(0, zhu.length - 1));
    let uu = MYMAP[syl][syl + 'ˍ'];
    
    // alert(uu)
    if (uu === undefined) {
      return char;
    }
    return uu[0];
  }
  let corrupted_sent = Array.from(sent).map(tt).join('');
  
  const handleSubmission = e => {
    e.preventDefault();
    // TTS(value);
    
    if (value === sent) {
      set_score(score + 1);
      let j = Math.floor(Math.random() * CORPUS.length);
      if (j >= CORPUS.length) {
        j = CORPUS.length - 1;
      }
      set_corpIndex(j);
    }
    
    set_value('');
  };
  
  const TTSTextCallback = text => {
    return event => {
      console.log(text);
      TTS(text);
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>猜猜我在說什麼？</h1>
        <h3>聲調實驗</h3>
        <h2>得分：{score}</h2>
        <button type="button" onClick={TTSTextCallback(corrupted_sent)}>猜猜我在說什麼</button>
        {" "}
        <button type="button" onClick={TTSTextCallback(sent)}>好啦告訴你答案</button>
        <InputBox 
          onChange={e => { set_value(e.target.value); }}
          value={value}
          handleSubmission={handleSubmission}
        />
      </header>
    </div>
  );
}

export default App;

import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

const InputBox = ({ handleSubmission, onChange, value }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <Paper
      component="form"
      sx={{ p: "2ex 4ex", display: "flex", width: "80%" }}
      onSubmit={handleSubmission}
    >
      <InputBase
        inputRef={inputElement}
        sx={{ ml: 1, flex: 1, fontSize: "2ex", }}
        placeholder="你猜我在說什麼呢？..."
        inputProps={{ "aria-label": "input english sentence" }}
        onChange={onChange}
        value={value}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={handleSubmission}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

InputBox.propTypes = {
  boxValue: PropTypes.string,
  setBoxValue: PropTypes.func,
  handleSubmission: PropTypes.func,
};

export default InputBox;

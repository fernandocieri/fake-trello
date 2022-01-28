//This Hook gives functionality of toggle a button
import * as React from "react";
import { useState } from "react";
import { Button, Input } from "@mui/material";
export default function useAddButton() {
  const [add, setAdd] = useState(false);
  const [inputState, setInputstate] = useState("");
  function toggleAdd() {
    setAdd(!add);    
  }

  function handleChange(e) {
    setInputstate(e.target.value);
  }

  function renderAdd(accept, addItem, handleNewElement) {

    function callOnClick() {
      toggleAdd();      
      handleNewElement();      
    }
    
    if (add === true) {
      return (
        <>
          <Input placeholder="Insert Name" onChange={handleChange} />
          <Button variant="contained" className="editButton" onClick={callOnClick}>
            {accept}
          </Button>
        </>
      );
    } else {
      return (
        <Button variant="outlined" onClick={toggleAdd}>
          {addItem}
        </Button>
      );
    }
  }
  return { renderAdd, inputState };
}

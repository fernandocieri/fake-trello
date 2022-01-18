import * as React from "react";
import { organizationsContext } from "./WorkspaceContainer";
import { useState, useEffect, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ActionMenu from "./Actions";
import useActions from "./hooks/useActions";

export default function WorkSpaceHeader({
  name = "Provisional Workspace Name",
}) {
  const organizations = useContext(organizationsContext);
  const { open, selectedValue, handleClose, handleClickOpen } = useActions();
  return (
    <div className="workSpace">
      <div>{name}</div>
      {/* Now, button has a prop called "onClick", as the attribute, to pass a function that will work 
        in the same way as if you call the event straigth from a button tag. */}
      <IconButton aria-label="settings">
        <MoreVertIcon onClick={handleClickOpen} />
      </IconButton>
      <ActionMenu
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />     
      {console.log(selectedValue)}
    </div>
  );
}

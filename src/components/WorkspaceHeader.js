import * as React from "react";
<<<<<<< HEAD
import axios from "axios";
import Button from "@mui/material/Button";
import { credentialsContext, organizationsContext } from "./WorkspaceContainer";
import { useState, useEffect, useContext } from "react";
import Input from '@mui/material/Input';

export default function WorkSpaceHeader() {
    const credentials = useContext(credentialsContext);
    const organization = useContext(organizationsContext);
    const [editableState, setEditableState] = useState({ currentValue: '', newValue: '', isBeingEdited: false })

    async function handleSaveEdition() {
        setEditableState({ ...editableState, currentValue: editableState.newValue, isBeingEdited: false });
        let updateResponse = await axios.put(`https://api.trello.com/1/organizations/${organization.id}/?displayName=${editableState.newValue}&key=${credentialsContext.key}&token=${credentialsContext.token}`);
    }

    let currentRender = undefined;
    function handleRender() {
        if ((editableState.isBeingEdited === false)&& (organization !== undefined)) {
            return (
                <>
                    <h1>{organization.displayName}</h1>
                    <Button variant="contained" className="editButton" onClick={() => { setEditableState({ ...editableState, isBeingEdited: true }) }}>Edit</Button>
                </>
            )
        } else if ((editableState.isBeingEdited === true) && (organization !== undefined)) {
            return (
                <>
                    <Input onChange={event => setEditableState({ ...editableState, newValue: event.target.value })} defaultValue={editableState.currentValue} />
                    <Button variant="contained" className="editButton" onClick={handleSaveEdition}>Save</Button>
                </>
            )
        }
    }

    return (
        <div className="workSpace">
            {handleRender()}
            {/* Now, button has a prop called "onClick", as the attribute, to pass a function that will work 
        in the same way as if you call the event straigth from a button tag. */}

        </div>
    );
}
=======
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
>>>>>>> a46e9e4619415e2a5f30d0c45e5c41a1b6ec55c3

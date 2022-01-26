import * as React from "react";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import { credentialsContext, organizationsContext } from "../App";
import { useState, useEffect, useContext } from "react";
import Input from '@mui/material/Input';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function WorkSpaceHeader() {
    const credentials = useContext(credentialsContext);
    const organization = useContext(organizationsContext);
    const [editableState, setEditableState] = useState({ currentValue: '', newValue: '', isBeingEdited: false })

    useEffect(() => {
        if (organization !== undefined) {
            setEditableState({ ...editableState, currentValue: organization.displayName })
        }
    }, [organization]);

    async function handleSaveEdition() {
        //setOrganization({ ...organization, displayName: editableState.currentValue })
        if (editableState.newValue === '') {
            setEditableState({ ...editableState, isBeingEdited: false });
        } else {
            const updateResponse = await axios.put(`https://api.trello.com/1/organizations/${organization.id}/?displayName=${editableState.newValue}&key=${credentials.key}&token=${credentials.token}`);
            setEditableState({ ...editableState, currentValue: editableState.newValue, isBeingEdited: false });
        }
    }

    let currentRender = <></>;
    
    if ((editableState.isBeingEdited === false) && (organization !== undefined)) {
        currentRender = (
            <>
                <h1>{editableState.currentValue}</h1>
                <IconButton aria-label="edit" onClick={() => { setEditableState({ ...editableState, isBeingEdited: true }) }}>
                    <ModeEditOutlineOutlinedIcon fontSize='medium' sx={{ color: '#1A5F7A' }} />
                </IconButton>
            </>
        );
    } else if ((editableState.isBeingEdited === true) && (organization !== undefined)) {
        currentRender = (
            <>
                <Input onChange={event => setEditableState({ ...editableState, newValue: event.target.value })} defaultValue={editableState.currentValue} />
                <IconButton aria-label="save" onClick={handleSaveEdition}>
                    <CheckCircleIcon fontSize='small' sx={{ color: '#1A5F7A' }}  />
                </IconButton>
            </>
        );
    }

    return (
        <div className="workSpace">
            {currentRender}
            {/* Now, button has a prop called "onClick", as the attribute, to pass a function that will work 
        in the same way as if you call the event straigth from a button tag. */}

        </div>
    );
}

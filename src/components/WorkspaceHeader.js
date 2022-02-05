import * as React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { credentialsContext, organizationsContext } from "../App";

import { Input, IconButton } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function WorkSpaceHeader() {
    const { credentialsData, setCredentialsData } = useContext(credentialsContext);
    const { organizationsData } = useContext(organizationsContext);
    const [editableState, setEditableState] = useState({ currentValue: '', newValue: '', isBeingEdited: false });

    useEffect(() => {
        if (organizationsData[0] !== undefined) {
            setEditableState({ ...editableState, currentValue: organizationsData[0].displayName });
        }
    }, [organizationsData]);

    async function handleSaveEdition() {
        //APPLY REGEX TO STOP THE USER FROM WRITING A NAME WITH A BLANK SPACE AT THE BEGINNING OR END;
        if (editableState.newValue === '') {
            setEditableState({ ...editableState, isBeingEdited: false });
        } else {
            const updateResponse = await axios.put(`${process.env.REACT_APP_HTTPS}organizations/${organizationsData[0].id}/?displayName=${editableState.newValue}&key=${credentialsData.key}&token=${credentialsData.token}`);
            setEditableState({ ...editableState, currentValue: editableState.newValue, isBeingEdited: false });
        }
    }
    let currentRender = <></>;
    
    if ((editableState.isBeingEdited === false) && (organizationsData[0] !== undefined)) {
        currentRender = (
            <section className="header-title-section">
                <div className="org-title">{editableState.currentValue}</div>
                <IconButton aria-label="edit" onClick={() => { setEditableState({ ...editableState, isBeingEdited: true }) }}>
                    <ModeEditOutlineOutlinedIcon sx={{ color: '#1A5F7A', fontSize:33}} />
                </IconButton>
            </section>
        );
    } else if ((editableState.isBeingEdited === true) && (organizationsData !== undefined)) {
        currentRender = (
            <section>
                <Input onChange={event => setEditableState({ ...editableState, newValue: event.target.value })} defaultValue={editableState.currentValue} />
                <IconButton aria-label="save" onClick={handleSaveEdition}>
                    <CheckCircleIcon fontSize='small' sx={{ color: '#1A5F7A' }} />
                </IconButton>
            </section>
        );
    }

    return (
        <div className="workSpace">
            {currentRender}
        </div>
    );
}

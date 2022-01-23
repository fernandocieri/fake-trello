import * as React from "react";
import { useState } from "react";
import { Input, IconButton } from "@mui/material";
import useActions from './useActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function useEditFeature(oldName, handleClickOpen, customButton) {
    const [newName, setNewName] = useState('');

    let editButton = (
        <IconButton aria-label="settings" onClick={handleClickOpen}>
            {customButton}
        </IconButton>
    )

    let titleRender = oldName;

    function handleEditing(selectedValue, handleSaveEditing) {
        if (selectedValue === 'change name') {
            editButton = <></>
            titleRender = (
                <>
                    <Input onChange={event => setNewName(event.target.value)} defaultValue={oldName} />
                    <IconButton aria-label="save" onClick={handleSaveEditing}>
                        <CheckCircleIcon fontSize="small" sx={{ color: "#1A5F7A" }}/>
                    </IconButton>
                </>
            )
        }
        return [titleRender, editButton];
    }

    return { handleEditing, titleRender, newName, editButton }

}


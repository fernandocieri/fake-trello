import * as React from "react";
import {
    CardActionArea,
    IconButton,
    Card,
    CardHeader,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { useState, useEffect, useContext } from "react";
import { credentialsContext } from "./WorkspaceContainer";
import { blueGrey } from '@mui/material/colors';

export default function BoardPreview(props) {
    const credentials = useContext(credentialsContext);
    const [boardData, setBoardData] = useState({ ...props.data });

    console.log(boardData.prefs.backgroundTopColor);
    return (
        <Card sx={{ maxWidth: 300, maxHeight: 150, backgroundColor: boardData.prefs.backgroundBottomColor, color: '292929', borderRadius: 4 }}
        //onClick={ }
        >
            <CardActionArea>
                <CardHeader
                    title={boardData.name}
                />

                <IconButton aria-label="settings" >
                    <ModeEditOutlineOutlinedIcon fontSize="small" sx={{ color: blueGrey[800] }} />
                </IconButton>
                <IconButton aria-label="settings">
                    <DeleteOutlineOutlined fontSize="small" sx={{ color: blueGrey[800] }} />
                </IconButton>

            </CardActionArea>
        </Card>
    );
}
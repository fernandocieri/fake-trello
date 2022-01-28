import * as React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import {
    IconButton,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { useState, useContext } from "react";
import { credentialsContext, boarDataContext } from "../App";

import { CirclePicker } from 'react-color';

export default function BoardPreview(props) {
    const { credentialsData } = useContext(credentialsContext);
    const [propsData, setPropsData] = useState({ ...props.data });
    const { boardData, setBoardData } = useContext(boarDataContext);
    const [isColorBeingPicked, setIsColorBeingPicked] = useState(false);
    const hexToColorName = { blue: '#0000ff', orange: '#ffa500', green: '#008000', red: '#ff0000', purple: '#800080', pink: '#ffc0cb', grey: '#808080' }

    let boardDataCopy = [...boardData];

    let newBoardData = boardDataCopy.filter((board) => board.id !== propsData.id);

    async function handleDelete() {
        const deleteResponse = await axios.delete(
            `https://api.trello.com/1/boards/${propsData.id}/?key=${credentialsData.key}&token=${credentialsData.token}`
        );
        setBoardData(newBoardData)
    }

    async function handleColorChange(color) {
        const hexColor = color.hex;
        const newColor = Object.keys(hexToColorName).find(key => hexToColorName[key] === hexColor);
        const updateResponse = await axios.put(`https://api.trello.com/1/boards/${propsData.id}/?prefs/background=${newColor}&key=${credentialsData.key}&token=${credentialsData.token}`);
        setPropsData({ ...propsData, prefs: { ...propsData.prefs, backgroundBottomColor: color.hex } });
        setIsColorBeingPicked(false);
    }

    const allowedColors = ['blue', 'orange', 'green', 'red', 'purple', 'pink', 'grey'];
    let colorPickerRender = <></>;
    if (isColorBeingPicked) {
        colorPickerRender = <CirclePicker color={propsData.prefs.backgroundBottomColor} colors={allowedColors} onChangeComplete={handleColorChange} />
    }

    let iconsContainer = (
        <>
            <IconButton aria-label="settings" onClick={(event) => { event.stopPropagation(); setIsColorBeingPicked(!isColorBeingPicked); }}>
                <AutoFixHighIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
            <IconButton aria-label="settings" onClick={handleDelete} >
                <DeleteOutlineOutlined fontSize="small" sx={{ color: "white" }} />
            </IconButton>
            {boardData.map(board =>
                board.id === propsData.id ? <Link to={`board/${board.id}`}>
                    <IconButton aria-label="settings" className="open-board">
                        <OpenInNewIcon sx={{ color: "white", fontSize: 32 }} />
                    </IconButton>
                </Link> : <></>)}
        </>
    )
    let icons = (props.icons === true) ? iconsContainer : <></>;


    return (

        <>
            <Card sx={{ maxWidth: 300, backgroundColor: propsData.prefs.backgroundBottomColor, color: '#292929', borderRadius: 2.5}} className={props.className}
            >
                <CardHeader sx={{ color: "white"}}
                    title={propsData.name}
                >
                </CardHeader>

                <CardContent>
                    {icons}
                </CardContent>
            </Card>
            {colorPickerRender}
        </>
    );
}
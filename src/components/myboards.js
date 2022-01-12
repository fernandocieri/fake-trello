import * as React from 'react';
import { Box, Tab, Tabs, TabContext, TabList, TabPanel, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Board from './board';
import { credentialsContext } from "./container";

export default function Myboards(props) {
    const credentials = useContext(credentialsContext);
    const [allBoards, setAllBoards] = useState([]);

    useEffect(async () => {
        const apiBoards = await axios.get(`https://api.trello.com/1/organizations/${props.name}/boards?key=${credentials.key}&token=${credentials.token}`);
        setAllBoards([...apiBoards.data]);
    }, []);

    async function createBoard(newBoardName) {
        /*let data = JSON.stringify({
        name: 'prueba api',
        idBoard: '61c2184ec5370301a1cf0420'
        });*/
        const newBoard = await axios.post(`https://api.trello.com/1/boards/?name=${newBoardName}&key=${credentials.key}&token=${credentials.token}`);
        console.log(newBoard.status);
        console.log(newBoard);
        //REVISAR es posible que sea necesario hacer push de newBoard al estado con setAllBoards;
    }
    return (
        <div>
            <h5>My Boards</h5>
            {/* This button element will have a openCreateBoard function*/}
            {/* <Button variant="contained"> + </Button> */}
            {/*  {Here  We are going to create a     tag for every board found on the database with the two respectives buttons 
            to edit the board Name and colour.
            The e.stopPropagation() method will prevent that when you click a button inside a div, if the div has an onClick
            event, this one will not be launched.*/}
            {/* {boards.map(board => 
            <div onClick={() => prueba("el div")}>{board.name}
            <button onClick={(e) =>  {e.stopPropagation(); console.log("este es un boton")}}>Prueba</button>
            <button onClick={(e) => {e.stopPropagation();prueba("prueba2")}}>Prueba2</button>
            </div>)}}
 */}
            {allBoards.map(board => <Board data={board} />)}

        </div>
    );
} 
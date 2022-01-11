import * as React from 'react';
import { Box, Tab, Tabs, TabContext, TabList, TabPanel, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Board from './board';
import BasicTabs from "./basicTabs";

export default function Myboards(props) {
    const [allBoards, setAllBoards] = useState([]);

    useEffect(async () => {
        const apiBoards = await axios.get(`https://api.trello.com/1/organizations/${props.name}/boards?key=278ed1bfd74ea3d23445703059a2fd01&token=4fc08ef1719c90b1a2576c8e260cc3190641b849c048a773ce35f55a6b394a51`);
        setAllBoards([...apiBoards.data]);
    }, []);

    async function createBoard() {
        //let urlBoard = 'https://api.trello.com/1/boards?key=ce5abaa238f274a5ea5ae0b3986e140d'
        //let urlList = 'https://api.trello.com/1/boards/61c2184ec5370301a1cf0420/lists?key=ce5abaa238f274a5ea5ae0b3986e140d&token=fb4d92026015c96f9e12f8278240a94ad2a82c8f0de1f0649028458134ab12c5'
        let data = { name: 'hola miguel', key: '278ed1bfd74ea3d23445703059a2fd01', token: '4fc08ef1719c90b1a2576c8e260cc3190641b849c048a773ce35f55a6b394a51' }
        /*let data = JSON.stringify({
        name: 'prueba api',
        idBoard: '61c2184ec5370301a1cf0420'
        });*/
        const newBoard = await axios.post(`https://api.trello.com/1/boards/?name=${data.name}&key=${data.key}&token=${data.token}`);
        console.log(newBoard.status);
        console.log(newBoard);
        //console.log(data);
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
            {allBoards.map(board => <Board id={board.id} name={board.name} />)}

        </div>
    );
} 
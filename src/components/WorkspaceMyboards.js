import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Board from './Board';
import {Link} from 'react-router-dom'
import { credentialsContext, organizationsContext, boarDataContext } from "../App";
import BoardPreview from './BoardPreview';

export default function Myboards() {
    const {credentialsData} = useContext(credentialsContext);  
    const {boardData} = useContext(boarDataContext);  
    

    async function createBoard(newBoardName) {
        const newBoard = await axios.post(`https://api.trello.com/1/boards/?name=${newBoardName}&key=${credentialsData.key}&token=${credentialsData.token}`);
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
            
            {boardData.map((board) => <Link to={`board/${board.id}`} key={board.id+10}><BoardPreview data={board}  icons={true} /> </Link>)}
        </div>
    );
} 

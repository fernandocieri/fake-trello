import * as React from "react";
import { useContext } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { credentialsContext, boarDataContext } from "../App";
import useAddButton from "./hooks/useAddButton";
import BoardPreview from './BoardPreview';

export default function Myboards() {
    const { credentialsData } = useContext(credentialsContext);
    const { boardData, setBoardData } = useContext(boarDataContext);
    const { renderAdd, inputState } = useAddButton();

    async function handleNewElement() {
        let postResponse = await axios.post(
            `https://api.trello.com/1/boards/?name=${inputState}&key=${credentialsData.key}&token=${credentialsData.token}`
        );
        setBoardData([...boardData, postResponse.data]);
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
            {boardData.map((board) => <Link to={`board/${board.id}`} key={board.id + 10}><BoardPreview data={board} icons={true} /> </Link>)}
            {renderAdd("Accept", "+ Add Board", handleNewElement)}
        </div>
    );
} 

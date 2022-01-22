import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Board from './Board';
import { credentialsContext, organizationsContext } from "./WorkspaceContainer";
import BoardPreview from './BoardPreview';

export default function Myboards() {
  const credentials = useContext(credentialsContext);
  const organization = useContext(organizationsContext);
  const [allBoards, setAllBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(0);

  useEffect(() => {
    async function getInfo() {
        if (organization !== undefined) {
            let response = await axios.get(`https://api.trello.com/1/organizations/${organization.id}/boards?key=${credentials.key}&token=${credentials.token}`)
            setAllBoards([...response.data]);
        }
    }
    getInfo()
}, [organization]);

    async function createBoard(newBoardName) {
        const newBoard = await axios.post(`https://api.trello.com/1/boards/?name=${newBoardName}&key=${credentials.key}&token=${credentials.token}`);
        console.log(newBoard.status);
        console.log(newBoard);
        //REVISAR es posible que sea necesario hacer push de newBoard al estado con setAllBoards;
    }

    function handleRender() {
        if (allBoards.length !== 0) {
            return <Board data={allBoards[currentBoard]} />
        }
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
            {handleRender()}
            {allBoards.map(board => <BoardPreview data={board} key={board.id} />)}
        </div>
    );
} 

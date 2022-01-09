import * as React from 'react';
import {Box, Tab, Tabs, TabContext, TabList, TabPanel, Button} from "@mui/material";
import BasicTabs from "./basicTabs"


const boards= [{name: "board 1" }]
function prueba(argumento){
   
   console.log(argumento);
   
}
export default function Myboards({title = "My Boards"}){
    return(
        <div >
            <h5>{title}</h5>
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
            <BasicTabs/>

        </div>
    ); 
} 
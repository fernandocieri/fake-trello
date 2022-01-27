import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stack, Box, IconButton, List } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./ActivityList";
import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import { credentialsContext, getApiData } from "./WorkspaceContainer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({ 
    ...props.data,
  });
  const [boardLists, setBoardLists] = useState([ ]);
  const { open, selectedValue, handleClose, handleClickOpen } = useActions();
  


  useEffect(() => {
    getApiData(setBoardLists, `https://api.trello.com/1/boards/${boardData.id}/lists?key=${credentials.key}&token=${credentials.token}`)
  }, [])




  useEffect(() => {
    async function getInfo() {
        let item = []
        for (let i = 0; i < boardLists.length; i++) {
            if (boardData !== undefined) {
              let response = await axios.get(`https://api.trello.com/1/boards/${boardData[i].id}/lists?key=${credentials.key}&token=${credentials.token}`);
              item = [i];
              console.log(item,"item");  
            }
        }
        //setBoardLists([...item]);
    }
    getInfo()
  }, []);

  console.log(boardData.name,"el board data de 0")

  /* const handleDrag = (result) =>{
    const {destination, source, draggableid} = result;

    if(!result.destination){
      return;
    }

    if(result.source.droppableId!== result.destination.droppableId){
      const sourceColumn = [source.droppableId]
      console.log(sourceColumn)
      const destColumn = [destination.droppableId];
      let item= {items: []};
      const sourceItems = sourceColumn.push(item);
      console.log(sourceItems)
      const destItems = destColumn.push(item);
      console.log(destItems)
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setBoardLists({
        ...boardLists,
        [source.droppableId]:{
          ...sourceColumn,
          items: sourceItems

        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      })
}} */
      /* const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setBoardLists({
        ...boardLists,
        [source.droppableId]:{
          ...sourceColumn,
          items: sourceItems

        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      })
      }
    } */
  





  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{boardData.name}</div>
          <IconButton variant="outlined" onClick={handleClickOpen} >
            <MoreVertIcon />
          </IconButton>
          <ActionMenu
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>

        <DragDropContext onDragEnd={result => console.log(result)}> 
        <section className="boardLists">
          {boardLists.map((list,index) => <ActivityList data={list} key={list.id} index={index} name={list.name}/>)}
        </section>
        </DragDropContext>

      </Stack>
    </Box>
  );
}

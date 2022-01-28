import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  ListItem,
  Button,
  Stack,
  Box,
  IconButton,
  List,
  Input,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./ActivityList";
import ActionMenu from "./Actions";
import useEditFeature from "./hooks/useEditFeature";
import useActions from "./hooks/useActions";
import {
  boarListContext,
  credentialsContext,
  getApiData,
  organizationsContext,
  boarDataContext,
  listCardsContext
} from "../App";
import useAddButton from "./hooks/useAddButton";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { result } from "lodash";
import { Source } from "@mui/icons-material";
import {range} from "lodash";

export default function Board() {
  const { credentialsData } = useContext(credentialsContext);
  const { organizationsData } = useContext(organizationsContext);
  const { boardData, setBoardData } = useContext(boarDataContext);
  const { boardLists, setBoardLists } = useContext(boarListContext);
  const {
    open,
    selectedValue,
    handleClose,
    handleClickOpen,
    setSelectedValue,
  } = useActions();
  let { handleEditing, titleRender, newName, editButton } = useEditFeature(
    boardData.name,
    handleClickOpen,
    <MoreVertIcon />
  );
  const { renderAdd, inputState } = useAddButton();
  const { id } = useParams();
  const { listCards, setListCards } = useContext(listCardsContext);

  async function handleNewElement() {
    let postResponse = await axios.post(
      `https://api.trello.com/1/lists?name=${inputState}&idBoard=${boardData.id}&key=${credentialsData.key}&token=${credentialsData.token}`
    );
    setBoardLists([...boardLists, postResponse.data]);
  }

  async function handleDelete() {
    const deleteResponse = await axios.delete(
      `https://api.trello.com/1/boards/${boardData.id}/?key=${credentialsData.key}&token=${credentialsData.token}`
    );
  }


  if (selectedValue === "delete") {
    handleDelete();
    return <></>;
  }

  async function handleSaveEditing() {
    if (newName === "") {
      setSelectedValue("");
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/boards/${boardData.id}/?name=${newName}&key=${credentialsData.key}&token=${credentialsData.token}`
      );
      setBoardData({ ...boardData, name: newName });
      setSelectedValue("");
    }
  }


  const handleDrag = (result, draggableId)=> {
    const {destination, source} = result;
    console.log(destination, source)

    if(!destination || !source){
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    const movementOfDrag = destination.index >source.index? "greater" : "less";

    const directionDrag = destination.droppableId != source.droppableId ? "new" : "same"; 

    console.log(movementOfDrag, directionDrag)

    let affectedRange;

    if(movementOfDrag === "greater"){
      affectedRange = range(source.index, destination.index+1)
    }else {
      affectedRange = range(destination.index, source.index)
    }


    console.log( "affected Range", affectedRange)

    

    if (source.droppableId===destination.droppableId){
    const items = Array.from(listCards);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(destination.index, 0, reorderItem);
    setListCards(items)
    return;
    }
  

  }

  console.log(listCards)


  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{boardData.name}</div>
          <IconButton variant="outlined" onClick={handleClickOpen}>
            <MoreVertIcon />
          </IconButton>
          <ActionMenu
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>

        <DragDropContext onDragEnd={handleDrag}>
          <section className="boardLists">
            {boardLists.map((list, index) =>
              list.idBoard === id ? (
                <>
                  <ActivityList
                    data={list}
                    key={list.id}
                    index={index}
                    name={list.name}
                  />
                </>
              ) : (
                <></>
              )
            )}
          </section>
        </DragDropContext>

        <List
          className="add-list"
          sx={{
            width: "50%",
            height: "10%",
            maxWidth: 360,
            border: 2,
            borderColor: "grey.500",
            borderRadius: 2,
          }}
        >
          <ListItem>
            {renderAdd("Accept", "ADD List", handleNewElement)}
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
}

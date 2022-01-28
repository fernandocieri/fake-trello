import * as React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { boarListContext, credentialsContext, organizationsContext, boarDataContext, listCardsContext } from "../App";

import ActivityList from "./ActivityList";
import ActionMenu from "./Actions";
import useEditFeature from "./hooks/useEditFeature";
import useActions from "./hooks/useActions";
import useAddButton from "./hooks/useAddButton";

import {
  ListItem,
  Stack,
  Box,
  List
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { result } from "lodash";
import { Source } from "@mui/icons-material";
import {range} from "lodash";

export default function Board() {
  const { credentialsData } = useContext(credentialsContext);
  const { organizationsData } = useContext(organizationsContext);
  const { boardData, setBoardData } = useContext(boarDataContext);
  const { boardLists, setBoardLists } = useContext(boarListContext)
  const { open, selectedValue, handleClose, handleClickOpen, setSelectedValue, } = useActions();
  const { renderAdd, inputState } = useAddButton();
  const { id } = useParams();
  const [currentBoard, setCurrentBoard] = useState(boardData.filter((board) => board.id === id))
  const { listCards, setListCards } = useContext(listCardsContext);

  let { handleEditing, titleRender, newName, editButton } = useEditFeature(currentBoard[0].name, handleClickOpen, <MoreVertIcon />);

  async function handleNewElement() {
    let postResponse = await axios.post(
      `https://api.trello.com/1/lists?name=${inputState}&idBoard=${currentBoard[0].id}&key=${credentialsData.key}&token=${credentialsData.token}`
    );
    setBoardLists([...boardLists, postResponse.data]);
  }

  async function handleDelete() {
    const deleteResponse = await axios.delete(
      `https://api.trello.com/1/boards/${currentBoard[0].id}/?key=${credentialsData.key}&token=${credentialsData.token}`
    );
  }

  if (selectedValue === "delete") {
    handleDelete();
    return <></>;
  }


  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/boards/${currentBoard[0].id}/?name=${newName}&key=${credentialsData.key}&token=${credentialsData.token}`
      );
      let boardDataCopy = [...boardData];

      let currentBoardCopy = (boardDataCopy.filter(board => board.id === id));
      currentBoardCopy[0].name = newName;

      let newBoardData = boardDataCopy.filter((board) => board.id !== id);
      newBoardData.push(currentBoardCopy[0]);

      setBoardData(newBoardData)
      setSelectedValue('');
    }

  }

  const handleDrag = (result, draggableId) => {
    const { destination, source } = result;
    console.log(destination, source)

    if (!destination || !source) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const movementOfDrag = destination.index > source.index ? "greater" : "less";

    const directionDrag = destination.droppableId != source.droppableId ? "new" : "same";

    console.log(movementOfDrag, directionDrag)

    let affectedRange;

    if (movementOfDrag === "greater") {
      affectedRange = range(source.index, destination.index + 1)
    } else {
      affectedRange = range(destination.index, source.index)
    }


    console.log("affected Range", affectedRange)



    if (source.droppableId === destination.droppableId) {
      const items = Array.from(listCards);
      const [reorderItem] = items.splice(result.source.index, 1);
      items.splice(destination.index, 0, reorderItem);
      setListCards(items)
      return;
    }
  }

  [titleRender, editButton] = handleEditing(selectedValue, handleSaveEditing);
  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">
            {titleRender}
          </div>
          {editButton}
          <ActionMenu
            sx={{ fontSize: 32 }}
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>


        <DragDropContext onDragEnd={handleDrag}>
          <section className="boardLists">

            {boardLists.map((list, index) => (
              list.idBoard === id ? <ActivityList data={list} key={`board${list.id}`} index={index} /> : <></>
            ))}
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

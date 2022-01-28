import * as React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { boarListContext, credentialsContext, organizationsContext, boarDataContext } from "../App";

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

export default function Board() {
  const { credentialsData } = useContext(credentialsContext);
  const { organizationsData } = useContext(organizationsContext);
  const { boardData, setBoardData } = useContext(boarDataContext);
  const { boardLists, setBoardLists } = useContext(boarListContext)
  const { open, selectedValue, handleClose, handleClickOpen, setSelectedValue, } = useActions();
  const { renderAdd, inputState } = useAddButton();
  const { id } = useParams();
  const [currentBoard, setCurrentBoard] = useState(boardData.filter((board) => board.id === id))

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
  [titleRender, editButton] = handleEditing(selectedValue, handleSaveEditing);
  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{titleRender}</div>
          {editButton}
          <ActionMenu
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>

        <section className="boardLists">

          {boardLists.map((list, index) => (
            list.idBoard === id ? <ActivityList data={list} key={list.id} index={index} /> : <></>
          ))}

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
        </section>
      </Stack>
    </Box>
  );
}

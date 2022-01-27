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
  Input
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ActivityList from "./ActivityList";
import ActionMenu from "./Actions";
import useEditFeature from "./hooks/useEditFeature";
import useActions from "./hooks/useActions";
import { boarListContext, credentialsContext, getApiData, organizationsContext, boarDataContext } from "../App";
import useAddButton from "./hooks/useAddButton";
import { useParams } from "react-router-dom";
export default function Board() {
  const { credentialsData } = useContext(credentialsContext);
  const { organizationsData } = useContext(organizationsContext);
  const { boardData, setBoardData } = useContext(boarDataContext);
  const { boardLists, setBoardLists } = useContext(boarListContext)
  const { open, selectedValue, handleClose, handleClickOpen, setSelectedValue, } = useActions();
  let { handleEditing, titleRender, newName, editButton } = useEditFeature(boardData.name, handleClickOpen, <MoreVertIcon />);
  const { renderAdd, inputState } = useAddButton();
  const { id } = useParams();

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
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/boards/${boardData.id}/?name=${newName}&key=${credentialsData.key}&token=${credentialsData.token}`
      );
      setBoardData({ ...boardData, name: newName });
      setSelectedValue('');
    }
  }

  [titleRender, editButton] = handleEditing(selectedValue, handleSaveEditing);

  function renderLists() {
    boardLists.map((list, index) => (
      list.idBoard === id ? <ActivityList data={list} key={list.id} index={index} /> : <></>
    ))
  }

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

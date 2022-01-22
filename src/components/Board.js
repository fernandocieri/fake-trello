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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ActivityList from "./ActivityList";
import ActionMenu from "./Actions";
import useActions from "./hooks/useActions";
import { credentialsContext, getApiData } from "./WorkspaceContainer";
import useAddButton from "./hooks/useAddButton";

export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({ ...props.data });
  const [boardLists, setBoardLists] = useState([]);
  const {
    open,
    selectedValue,
    handleClose,
    handleClickOpen,
    setSelectedValue,
  } = useActions();
  const { renderAdd, inputState } = useAddButton();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    getApiData(
      setBoardLists,
      `https://api.trello.com/1/boards/${boardData.id}/lists?key=${credentials.key}&token=${credentials.token}`
    );
  }, []);

  async function handleNewElement() {
    let postResponse = await axios.post(
      `https://api.trello.com/1/lists?name=${inputState}&idBoard=${boardData.id}&key=${credentials.key}&token=${credentials.token}`
    );
    setBoardLists([...boardLists, postResponse.data]);
  }

  async function handleDelete() {
    const deleteResponse = await axios.delete(
      `https://api.trello.com/1/boards/${boardData.id}/?key=${credentials.key}&token=${credentials.token}`
    );
  }

  if (selectedValue === "delete") {
    handleDelete();
    return <></>;
  }

  async function handleSaveEdition() {
    if (newName === "") {
      setSelectedValue("");
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/boards/${boardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`
      );
      setBoardData({ ...boardData, name: newName });
      setSelectedValue("");
    }
  }
  // check if the code for title can be made into a custom hook;
  let titleRender = boardData.name;

  let editButton = (
    <IconButton aria-label="settings" onClick={handleClickOpen}>
      <MoreVertIcon />
    </IconButton>
  );

  if (selectedValue === "change name") {
    editButton = <></>;
    titleRender = (
      <>
        <Input
          onChange={(event) => setNewName(event.target.value)}
          defaultValue={boardData.name}
        />
        <IconButton aria-label="save" onClick={handleSaveEdition}>
          <CheckCircleIcon fontSize="small" sx={{ color: "#1A5F7A" }} />
        </IconButton>
      </>
    );
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
          {boardLists.map((list) => (
            <ActivityList data={list} key={list.id} />
          ))}
        </section>
        <List
          className="add-list"
          sx={{
            width: "100%",
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

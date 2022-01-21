import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ListItem, Button, Stack, Box, IconButton, List } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./ActivityList";
import ActionMenu from "./Actions";
import useActions from "./hooks/useActions";
import { credentialsContext, getApiData } from "./WorkspaceContainer";
import useAddButton from "./hooks/useAddButton";

export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({ ...props.data });
  const [boardLists, setBoardLists] = useState([]);
  const { open, selectedValue, handleClose, handleClickOpen } = useActions();
  const { renderAdd, inputState } = useAddButton();

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

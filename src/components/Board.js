import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stack, Box, IconButton, List } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./ActivityList";
import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import { credentialsContext } from "./WorkspaceContainer";

export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({ ...props.data });
  const [boardLists, setBoardLists] = useState([]);
<<<<<<< HEAD
  const {open, selectedValue, handleClose, handleClickOpen} = useActions();
=======
  const { open, selectedValue, handleClose, handleClickOpen } = useActions();

>>>>>>> d39a249234130920bbef2a657895be3088f158c3

  useEffect(() => {
    async function getInfo() {
      let response = await axios.get(`https://api.trello.com/1/boards/${boardData.id}/lists?key=${credentials.key}&token=${credentials.token}`)
      setBoardLists([...response.data]);
    }
    getInfo()
  }, [])

  function editBoard() {
  }

  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{boardData.name}</div>
          <IconButton variant="outlined" onClick={handleClickOpen}>
            <MoreVertIcon  />
          </IconButton>
          <ActionMenu
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>

        <section className="boardLists">
          {boardLists.map(list => <ActivityList data={list} key={list.id} />)}
        </section>
      </Stack>
    </Box>
  );
}

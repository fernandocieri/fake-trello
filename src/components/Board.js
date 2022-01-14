import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stack, Box, IconButton, List } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./ActivityList";
import ActionMenu from './Actions';
import { credentialsContext } from "./WorkspaceContainer";

export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({ ...props.data });
  const [boardLists, setBoardLists] = useState([]);

  useEffect(() => {
    async function getInfo() {
      let response = await axios.get(`https://api.trello.com/1/boards/${boardData.id}/lists?key=${credentials.key}&token=${credentials.token}`)
      setBoardLists([...response.data]);
    }
    getInfo()
  }, [])

  function editBoard() {

  }

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{boardData.name}</div>
          <IconButton variant="outlined">
            <MoreVertIcon onClick={handleClickOpen} />
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

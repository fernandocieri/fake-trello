import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stack, Box, IconButton, List } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./list";
import ActionMenu from './actions';
import { credentialsContext } from "./container";

export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({...props.data});
  const [boardLists, setBoardLists] = useState([]);

  useEffect(async () => {
    const apiLists = await axios.get(`https://api.trello.com/1/boards/${boardData.id}/lists?key=${credentials.key}&token=${credentials.token}`);
    setBoardLists([...apiLists.data]);
    console.log(boardData);
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
          {boardLists.map(list => <ActivityList data={list} key={list.id}/>)}
        </section>
      </Stack>
    </Box>
  );
}

import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stack, Box, IconButton, Input, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./ActivityList";
import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import { credentialsContext, getApiData } from "./WorkspaceContainer";

export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({ ...props.data });
  const [boardLists, setBoardLists] = useState([]);
  const [newName, setNewName] = useState('');
  const { open, selectedValue, setSelectedValue, handleClose, handleClickOpen } = useActions();

  useEffect(() => {
    getApiData(setBoardLists, `https://api.trello.com/1/boards/${boardData.id}/lists?key=${credentials.key}&token=${credentials.token}`)
  }, [])

  async function handleDelete() {
    const deleteResponse = await axios.delete(`https://api.trello.com/1/boards/${boardData.id}/?key=${credentials.key}&token=${credentials.token}`)
  }

  if (selectedValue === 'delete') {
    handleDelete()
    return <></>
  }

  async function handleSaveEdition() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(`https://api.trello.com/1/boards/${boardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`);
      setBoardData({ ...boardData, name: newName });
      setSelectedValue('');
    }
  }

  function handleTitleRender() {
    if ((selectedValue !== 'change name') && (selectedValue !== 'delete')) {
      return boardData.name;
    } else if (selectedValue === 'change name') {
      return (
        <>
          <Input onChange={event => setNewName(event.target.value)} defaultValue={boardData.name} />
          <Button variant="contained" className="editButton" onClick={handleSaveEdition}>Save</Button>
        </>
      );
    }
  }

  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{handleTitleRender()}</div>
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

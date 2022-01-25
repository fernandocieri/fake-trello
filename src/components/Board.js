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
import useEditFeature from "./hooks/useEditFeature";
import useActions from "./hooks/useActions";
import { credentialsContext, getApiData, organizationsContext } from "./WorkspaceContainer";
import useAddButton from "./hooks/useAddButton";
import { useParams } from 'react-router-dom';

export default function Board(props) {
  const {index} = useParams();
   const credentials = useContext(credentialsContext);
  const [organization, setOrganizations] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [boardLists, setBoardLists] = useState([]);
  const { open, selectedValue, handleClose, handleClickOpen, setSelectedValue, } = useActions();
  let { handleEditing, titleRender, newName, editButton } = useEditFeature(boardData.name, handleClickOpen, <MoreVertIcon />);
  const { renderAdd, inputState } = useAddButton(); 
  console.log("board Lists");
 console.log(boardLists);

  
  useEffect(() => {
    getApiData(setOrganizations, `https://api.trello.com/1/members/me/organizations?key=${credentials.key}&token=${credentials.token}`)
  
  }, [])

  useEffect(() => {
    async function getInfo() {
        if (organization[0] !== undefined) {
            let response = await axios.get(`https://api.trello.com/1/organizations/${organization[0].id}/boards?key=${credentials.key}&token=${credentials.token}`)
            setBoardData([response.data[index]]);
           
            
            
        }        
    }
    getInfo()
}, [organization]);

  useEffect(() => {
    boardData.map((board) =>
    getApiData(
      setBoardLists,
      `https://api.trello.com/1/boards/${board.id}/lists?key=${credentials.key}&token=${credentials.token}`
    ))
    
  }, [boardData]);

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

  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/boards/${boardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`
      );
      setBoardData({ ...boardData, name: newName });
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

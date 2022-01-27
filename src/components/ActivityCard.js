import * as React from "react";
import {
  CardActionArea,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Input
} from "@mui/material";
import axios from "axios";
import { useState, useContext } from "react";
import { credentialsContext } from "./WorkspaceContainer";
import SettingsIcon from '@mui/icons-material/Settings';
import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import useEditFeature from "./hooks/useEditFeature";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ActivityCard(props) {
  const credentials = useContext(credentialsContext);
  const [cardData, setCardData] = useState({ ...props.data });
  const { open, selectedValue, setSelectedValue, handleClose, handleClickOpen } = useActions();
  let { handleEditing, titleRender, newName, editButton } = useEditFeature(cardData.name, handleClickOpen, <SettingsIcon fontSize="small" />);

  async function handleDelete() {
    const deleteResponse = await axios.delete(
      `https://api.trello.com/1/cards/${cardData.id}/?key=${credentials.key}&token=${credentials.token}`
      );
  }

  if (selectedValue === 'delete') {
    handleDelete()
    return <></>
  }

<<<<<<< HEAD
  async function handleSaveEdition() {
    const updateResponse = await axios.put(`https://api.trello.com/1/cards/${cardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`);
    setCardData({ ...cardData, name: newName });
    setSelectedValue('');
  }

  async function handleDelete() {
    const deleteResponse = await axios.delete(`https://api.trello.com/1/cards/${cardData.id}/?key=${credentials.key}&token=${credentials.token}`)
  }

  function handleTitleRender() {
    if ((selectedValue !== 'change name') && (selectedValue !== 'delete')) {
      return cardData.name;
    } else if (selectedValue === 'change name') {
      return (
        <>
          <Input onChange={event => setNewName(event.target.value)} defaultValue={cardData.name} />
          <Button variant="contained" className="editButton" onClick={handleSaveEdition} placeholder="Save">Save</Button>
        </>
=======
  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/cards/${cardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`
>>>>>>> a5846905fd783d16e109f8b599a7f15ebee60b72
      );
      setCardData({ ...cardData, name: newName });
      setSelectedValue('');
    }
  }

  [titleRender, editButton] = handleEditing(selectedValue, handleSaveEditing);

  return (

    <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
      <div className="card-action-area">
        <CardHeader
          action={
            <>
<<<<<<< HEAD
              <IconButton aria-label="settings" onClick={handleClickOpen}>
                <MoreVertIcon  />
              </IconButton>
=======
              {editButton}
>>>>>>> a5846905fd783d16e109f8b599a7f15ebee60b72
              <ActionMenu
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />
            </>
          }

          title={titleRender}
          subheader={cardData.dateLastActivity}
        >

        </CardHeader>

        <CardContent>
          <Typography component={'span'} variant="body2" color="text.secondary">
            {cardData.desc}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}
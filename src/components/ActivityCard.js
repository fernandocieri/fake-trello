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
import { useState, useEffect, useContext } from "react";
import { credentialsContext } from "./WorkspaceContainer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useActions from './hooks/useActions'
import ActionMenu from './Actions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ActivityCard(props) {
  const credentials = useContext(credentialsContext);
  const [cardData, setCardData] = useState({ ...props.data });
  const [newName, setNewName] = useState('');
  const { open, selectedValue, setSelectedValue, handleClose, handleClickOpen } = useActions();

  async function handleDelete() {
    const deleteResponse = await axios.delete(`https://api.trello.com/1/cards/${cardData.id}/?key=${credentials.key}&token=${credentials.token}`)
  }

  if (selectedValue === 'delete') {
    handleDelete()
    return <></>
  }

  async function handleSaveEdition() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(`https://api.trello.com/1/cards/${cardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`);
      setCardData({ ...cardData, name: newName });
      setSelectedValue('');
    }
  }

  // check if the code for title can be made into a custom hook; 
  let titleRender = cardData.name;

  let editButton = (
    <IconButton aria-label="settings" onClick={handleClickOpen}>
      <MoreVertIcon  />
    </IconButton>
  )

  if (selectedValue === 'change name') {
    editButton = <></>
    titleRender = (
      <>
        <Input onChange={event => setNewName(event.target.value)} defaultValue={cardData.name} />
        <IconButton aria-label="save" onClick={handleSaveEdition}>
          <CheckCircleIcon fontSize='small' sx={{ color: '#1A5F7A' }}  />
        </IconButton>
      </>
    )
  }


  return (
   
    <Card sx={{ maxWidth: 300, maxHeight: 200 }}>    
      <div className="card-action-area">
        <CardHeader
          action={
            <>
              {editButton}
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
          <Typography variant="body2" color="text.secondary">
            {cardData.desc}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}
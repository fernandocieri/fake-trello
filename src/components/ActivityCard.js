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
import ActionMenu from './Actions';
import useActions from './hooks/useActions'

export default function ActivityCard(props) {
  const credentials = useContext(credentialsContext);
  const [newName, setNewName] = useState('');
  const [cardData, setCardData] = useState({ ...props.data });
  const { open, selectedValue, setSelectedValue, handleClose, handleClickOpen } = useActions();

  if (selectedValue === 'delete') {
    handleDelete()
    return <></>
  }

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
      );
    }
  }

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
      <CardActionArea>
        <CardHeader
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClickOpen}>
                <MoreVertIcon  />
              </IconButton>
              <ActionMenu
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />
            </>
          }

          title={handleTitleRender()}
          subheader={cardData.dateLastActivity}
        >

        </CardHeader>

        <CardContent>
          <Typography component={'span'} variant="body2" color="text.secondary">
            {cardData.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
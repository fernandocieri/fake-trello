import * as React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { credentialsContext, listCardsContext, boarListContext } from "../App";
import { useParams } from "react-router-dom";

import { Button, Stack, Box, TextField, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AssignmentIcon from '@mui/icons-material/Assignment';


export default function Activityspecs() {
  const { credentialsData } = useContext(credentialsContext);
  const { idCard } = useParams();

  const { listCards, setListCards } = useContext(listCardsContext);
  const [currentCard, setCurrentCard] = useState(listCards.filter((card) => card.id === idCard));

  const { boardLists, setBoardLists } = useContext(boarListContext)
  const [currentList, setCurrentList] = useState(boardLists.filter((list) => list.id === currentCard[0].idList));

  let listCardsCopy = [...listCards];

  let currentCardCopy = (listCardsCopy.filter(card => card.id === currentCard[0].id));

  let newCardData = listCardsCopy.filter(card => card.id !== currentCard[0].id);

  async function handleDelete() {
    const deleteResponse = await axios.delete(`https://api.trello.com/1/cards/${currentCard[0].id}/?key=${credentialsData.key}&token=${credentialsData.token}`);
    setListCards(newCardData);
    //HACER QUE VUELVA A ATRÁS;
  }

  async function handleSaveEditing() {
    if (/[a-zA-Z]/.test(currentCardCopy[0].name)) {
      newCardData.push(currentCardCopy[0]);
      setListCards(newCardData);
      const updateResponse = await axios.put(
        `https://api.trello.com/1/cards/${currentCard[0].id}/?name=${currentCardCopy[0].name}&desc=${currentCardCopy[0].name}&key=${credentialsData.key}&token=${credentialsData.token}`);
    }
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <Stack className="left-flex-container">
        <TextField id="name" label="name" variant="outlined" defaultValue={currentCard[0].name} onChange={(event => currentCardCopy[0].name = event.target.value)} />
        <TextField id="description" label="description" variant="outlined" multiline rows={5} defaultValue={currentCard[0].desc} onChange={(event => currentCardCopy[0].desc = event.target.value)} />
      </Stack>

      <div className="extra-info">
        <Grid item xs={3}>
          <AssignmentIcon fontSize="small" sx={{ color: '#1A5F7A' }} />
          {currentList[0].name}

        </Grid>
        <Grid item xs={3}>
          <AccessTimeFilledIcon fontSize="small" sx={{ color: '#1A5F7A' }} />
          {currentCard[0].dateLastActivity}
        </Grid>
      </div>

      <div className='button-section'>
        <Button variant="outlined"><KeyboardReturnIcon fontSize="small" sx={{ color: '#1A5F7A' }} />Back to Board</Button>
        <Button variant="outlined" onClick={handleDelete}><DeleteIcon fontSize="small" sx={{ color: '#1A5F7A' }} />Delete Card</Button>
        <Button variant="outlined" onClick={handleSaveEditing}><CheckCircleIcon fontSize='small' sx={{ color: '#1A5F7A' }} />Save Changes</Button>
      </div>
    </Box >
  );
}


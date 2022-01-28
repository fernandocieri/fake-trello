import * as React from "react";
import { useState, useContext } from "react";
import { credentialsContext, listCardsContext, boarListContext } from "../App";
import axios from "axios";
import {Link} from 'react-router-dom';
import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import useEditFeature from "./hooks/useEditFeature";

import {
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent
} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SettingsIcon from '@mui/icons-material/Settings';


export default function ActivityCard(props) {
  const {credentialsData} = useContext(credentialsContext);
  const [cardData, setCardData] = useState({ ...props.data });
  const { boardLists, setBoardLists } = useContext(boarListContext)
  const { open, selectedValue, setSelectedValue, handleClose, handleClickOpen } = useActions();
  let { handleEditing, titleRender, newName, editButton } = useEditFeature(cardData.name, handleClickOpen, <SettingsIcon fontSize="small" />);

  const { listCards, setListCards } = useContext(listCardsContext);
  const [currentCard, setCurrentCard] = useState(listCards.filter((card) => card.id === cardData.id));

  async function handleDelete() {
    const deleteResponse = await axios.delete(
      `https://api.trello.com/1/cards/${cardData.id}/?key=${credentialsData.key}&token=${credentialsData.token}`
    );
  }

  if (selectedValue === 'delete') {
    handleDelete()
    return <></>
  }

  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/cards/${cardData.id}/?name=${newName}&key=${credentialsData.key}&token=${credentialsData.token}`
      );
      let listCardsCopy = [...listCards];

      let currentCardCopy = (listCardsCopy.filter(card => card.id === cardData.id));
      currentCardCopy[0].name = newName;

      let newCardData = listCardsCopy.filter(card => card.id !== cardData.id);
      newCardData.push(currentCardCopy[0]);

      setListCards(newCardData);
      setCardData({ ...cardData, name: newName });
      setSelectedValue('');
    }
  }

  [titleRender, editButton] = handleEditing(selectedValue, handleSaveEditing);

  return (

    <Card sx={{ maxWidth: 300, maxHeight: 200, border: ' 2.5px solid #757A94', marginBottom:'10px', fontSize:'10px' }}>
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
        {listCards.map(card =>
                card.id === cardData.id ? <Link to={`/list/${cardData.idBoard}/card/${card.id}/${card.name}`}>
                    <IconButton aria-label="settings"  className = "open-board">
                        <OpenInNewIcon  sx={{ fontSize: 32}}  />
                    </IconButton>
                </Link> : <></>)}
          <Typography variant="body2" color="text.secondary">
            {cardData.desc}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}
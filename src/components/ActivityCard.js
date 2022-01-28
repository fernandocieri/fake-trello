import * as React from "react";
import { useState, useContext } from "react";
import { credentialsContext, listCardsContext } from "../App";
import axios from "axios";

import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import useEditFeature from "./hooks/useEditFeature";

import {
  Typography,
  Card,
  CardHeader,
  CardContent
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

export default function ActivityCard(props) {
  const credentials = useContext(credentialsContext);
  const [cardData, setCardData] = useState({ ...props.data });
  const { open, selectedValue, setSelectedValue, handleClose, handleClickOpen } = useActions();
  let { handleEditing, titleRender, newName, editButton } = useEditFeature(cardData.name, handleClickOpen, <SettingsIcon fontSize="small" />);

  const { listCards, setListCards } = useContext(listCardsContext);
  const [currentCard, setCurrentCard] = useState(listCards.filter((card) => card.id === cardData.id));

  async function handleDelete() {
    const deleteResponse = await axios.delete(
      `https://api.trello.com/1/cards/${cardData.id}/?key=${credentials.key}&token=${credentials.token}`
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
        `https://api.trello.com/1/cards/${cardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`
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
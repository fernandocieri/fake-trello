import * as React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useState, useContext } from "react";
import { credentialsContext } from "./WorkspaceContainer";
import SettingsIcon from '@mui/icons-material/Settings';
import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import useEditFeature from "./hooks/useEditFeature";

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

  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/cards/${cardData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`
      );
      setCardData({ ...cardData, name: newName });
      setSelectedValue('');
    }
  }

  [titleRender, editButton] = handleEditing(selectedValue, handleSaveEditing);

  return (

    <Card sx={{ maxWidth: 300, maxHeight: 200, borderRadius:3 }}>
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
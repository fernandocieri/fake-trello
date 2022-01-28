import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import ActionMenu from "./Actions";
import useEditFeature from "./hooks/useEditFeature";
import UseActions from "./hooks/useActions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { credentialsContext, getApiData } from "./WorkspaceContainer";
import {
  ListItem,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import useAddButton from './hooks/useAddButton';

export default function ActivityList(props) {
  const credentials = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const [listCards, setListCards] = useState([]);
  const { open, selectedValue, handleClose, handleClickOpen, setSelectedValue, } = UseActions();
  let { handleEditing, titleRender, newName, editButton } = useEditFeature(listData.name, handleClickOpen, <MoreVertIcon />);
  const { renderAdd, inputState } = useAddButton();

  useEffect(() => {
    getApiData(setListCards, `https://api.trello.com/1/lists/${listData.id}/cards?key=${credentials.key}&token=${credentials.token}`)
  }, [])

  async function handleDelete() {
    const deleteResponse = await axios.put(
      `https://api.trello.com/1/lists/${listData.id}/closed?value=true&key=${credentials.key}&token=${credentials.token}`
    );
  }

  if (selectedValue === 'delete') {
    handleDelete()
    return <></>
  }


  async function handleNewElement() {
    let postResponse = await axios.post(`https://api.trello.com/1/cards?name=${inputState}&idList=${listData.id}&key=${credentials.key}&token=${credentials.token}`)
    setListCards([...listCards, postResponse.data]);
  }

  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      const updateResponse = await axios.put(
        `https://api.trello.com/1/lists/${listData.id}/?name=${newName}&key=${credentials.key}&token=${credentials.token}`
      );
      setListData({ ...listData, name: newName });
      setSelectedValue('');
    }
  }

  [titleRender, editButton] = handleEditing(selectedValue, handleSaveEditing);

  return (

    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        border: 2,
        borderColor: "grey.500",
        borderRadius: 2,
      }}
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ borderColor: "grey.500", borderRadius: 2 }}
        >
          <Typography variant="h5" color="text.secondary">
            {titleRender}
            {editButton}
            <ActionMenu
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          </Typography>
        </ListSubheader>
      }
    >
      {listCards.map(card => {
        return (
          <ListItem key={card.id}>
            <ActivityCard data={card} />
          </ListItem>
        )
      })}

      <ListItem >
        {renderAdd("Accept", "Add Card", handleNewElement)}
      </ListItem>
    </List>

  );
}

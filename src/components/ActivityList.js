import { useState,  useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import { credentialsContext, listCardsContext } from "../App";
import { Link } from 'react-router-dom'
//import { useParams } from "react-router-dom";

import ActionMenu from "./Actions";
import useAddButton from './hooks/useAddButton';
import useEditFeature from "./hooks/useEditFeature";
import useActions from "./hooks/useActions";

import {
  ListItem,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ActivityList(props) {
  //const { idList } = useParams();
  const { credentialsData } = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const { listCards, setListCards } = useContext(listCardsContext);
  const { renderAdd, inputState } = useAddButton();
  const { open, selectedValue, handleClose, handleClickOpen, setSelectedValue, } = useActions();

  let { handleEditing, titleRender, newName, editButton } = useEditFeature(listData.name, handleClickOpen, <MoreVertIcon />);


  async function handleNewElement() {
    let postResponse = await axios.post(`https://api.trello.com/1/cards?name=${inputState}&idList=${listData.id}&key=${credentialsData.key}&token=${credentialsData.token}`)
    setListCards([...listCards, postResponse.data]);
  }

  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {

      let updateResponse = await axios.put(`https://api.trello.com/1/lists/${listData.id}/?name=${newName}&key=${credentialsData.key}&token=${credentialsData.token}`);
      // let listDataCopy = [...listData];

      // let currentListCopy = (listDataCopy.filter(list => list.id === idList));
      // currentListCopy[0].name = newName;

      // let newListData = listDataCopy.filter((list) => list.id !== idList);
      // newListData.push(currentListCopy[0]);

      setListData({ ...listData, name: newName });
      setSelectedValue('');
    }
  }

  async function handleDelete() {
    let response = await axios.delete(`https://api.trello.com/1/lists/${listData.id}&key=${credentialsData.key}&token=${credentialsData.token}`);
  }
  if (selectedValue === "delete") {
    handleDelete();
    return <></>;
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
        margin: 1
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
      } className="list"
    >
      {listCards.map((card) => (
        card.idList === listData.id ? <Link to={`/list/${listData.id}/card/${card.id}/${card.name}`}><ListItem key={card.id} className="listItem"> <ActivityCard data={card} /> </ListItem> </Link> : <></>
      ))}

      <ListItem className="listItem">
        {renderAdd("Accept", "+ Add Card", handleNewElement)}
      </ListItem>
    </List>

  );
}

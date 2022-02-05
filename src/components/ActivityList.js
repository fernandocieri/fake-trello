import { useState, useContext } from "react";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export default function ActivityList(props) {
  const { credentialsData } = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const { listCards, setListCards } = useContext(listCardsContext);
  const { renderAdd, inputState } = useAddButton();
  const { open, selectedValue, handleClose, handleClickOpen, setSelectedValue, } = useActions();

  let { handleEditing, titleRender, newName, editButton } = useEditFeature(listData.name, handleClickOpen, <MoreVertIcon />);


  async function handleNewElement() {
    let postResponse = await axios.post(`${process.env.REACT_APP_HTTPS}cards?name=${inputState}&idList=${listData.id}&key=${credentialsData.key}&token=${credentialsData.token}`)
    setListCards([...listCards, postResponse.data]);
  }

  async function handleSaveEditing() {
    if (newName === '') {
      setSelectedValue('');
    } else {
      let updateResponse = await axios.put(`${process.env.REACT_APP_HTTPS}lists/${listData.id}/?name=${newName}&key=${credentialsData.key}&token=${credentialsData.token}`);
      setListData({ ...listData, name: newName });
      setSelectedValue('');
    }
  }

  async function handleDelete() {
    const deleteResponse = await axios.put(
      `${process.env.REACT_APP_HTTPS}lists/${listData.id}/closed?value=true&key=${credentialsData.key}&token=${credentialsData.token}`
    );
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
      
       <Droppable droppableId={`activityList${props.index}`}>
          {(provided) => (
          
          
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listCards.map((card, index) => card.idList === listData.id ? <><Draggable key={card.id} draggableId={card.id} index={index} >
                  {(dprovided)=> (
                    <div {...dprovided.draggableProps}
                    ref={dprovided.innerRef} {...dprovided.dragHandleProps}><ActivityCard data={card} item={card.name} /></div>)}              
                </Draggable></> : <></>
                
              )}
              {provided.placeholder}
            </div>
        
          )}
        </Droppable>

      <ListItem className="listItem">
        {renderAdd("Accept", "+ Add Card", handleNewElement)}
      </ListItem>
    </List>

  );
}

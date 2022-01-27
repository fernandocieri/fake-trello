import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import { credentialsContext, getApiData } from "./WorkspaceContainer";
// import { colors = red[500] } from '@mui/material/colors';
import {
  ListItem,
  List,
  Button,
  ListSubheader,
  Typography,
} from "@mui/material";
import useAddButton from './hooks/useAddButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function ActivityList(props) {
  const credentials = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const [listCards, setListCards] = useState([]);
  const {renderAdd, inputState} = useAddButton();



  useEffect(() => {
    getApiData(setListCards, `https://api.trello.com/1/lists/${listData.id}/cards?key=${credentials.key}&token=${credentials.token}`)
  }, [])

  
  async function handleNewElement(){
    let postResponse = await axios.post(`https://api.trello.com/1/cards?name=${inputState}&idList=${listData.id}&key=${credentials.key}&token=${credentials.token}`)
      setListCards([...listCards, postResponse.data]);
    }
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
            {listData.name}
          </Typography>
        </ListSubheader>
      }
    >
       <Droppable droppableId={`activitylist${props.index}`}>
          {(provided) => (
          
          
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index} >
                  {(dprovided)=> (
                    <div {...dprovided.draggableProps}
                    ref={dprovided.innerRef} {...dprovided.dragHandleProps}><ActivityCard data={card} item={card.name} /></div>)}              
                </Draggable>
                )
              )}
              {provided.placeholder}
            </div>
        
          )}
        </Droppable>

      <ListItem >
        {renderAdd("Accept","Add Card", handleNewElement)}
      </ListItem>      
    </List>
    
  );
}

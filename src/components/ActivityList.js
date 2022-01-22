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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



/*function ListCreator() {
  return (
    <div id='addNewCard'>
      <div className='cardTitle'>add a new list</div>
      <button onClick={ }>+</button>
    </div>
  )
}*/

export default function ActivityList(props) {
  const credentials = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const [listCards, setListCards] = useState([]);



  useEffect(() => {
    getApiData(setListCards, `https://api.trello.com/1/lists/${listData.id}/cards?key=${credentials.key}&token=${credentials.token}`)
  }, [])

  const reorder= (list, startIndex, endIndex) => {
    const result =[...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

function handleDrag(result) {
  const items = Array.from(listCards);
  const [reorderItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderItem);

  setListCards(items)
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
            <Typography component={'span'} variant="h5" color="text.secondary">
              {listData.name}
            </Typography>
          </ListSubheader>
        }
      >
        <Droppable droppableId="activitylist">
          {(provided) => (
          
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {listCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index} >
                  {(provided)=> (
                    <li {...provided.draggableProps}
                    ref={provided.innerRef} {...provided.dragHandleProps}><ActivityCard data={card}  /></li>)}              
                </Draggable>
                )
              )} 
              {provided.placeholder}
            </ul>
        
          )}
        </Droppable>
        <ListItem>
          <Button variant="outlined">add card</Button>
        </ListItem>
      </List>

  );
}

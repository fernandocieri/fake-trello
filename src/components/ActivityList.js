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
<<<<<<< HEAD
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



/*function ListCreator() {
  return (
    <div id='addNewCard'>
      <div className='cardTitle'>add a new list</div>
      <button onClick={ }>+</button>
    </div>
  )
}*/
=======
import useAddButton from './hooks/useAddButton';
>>>>>>> a5846905fd783d16e109f8b599a7f15ebee60b72

export default function ActivityList(props) {
  const credentials = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const [listCards, setListCards] = useState([]);
  const {renderAdd, inputState} = useAddButton();



  useEffect(() => {
    getApiData(setListCards, `https://api.trello.com/1/lists/${listData.id}/cards?key=${credentials.key}&token=${credentials.token}`)
  }, [])

<<<<<<< HEAD


  function handleDrag(result) {
  const items = Array.from(listCards);
  const [reorderItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderItem);

  setListCards(items) }


console.log(listCards)
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
        <ListItem>
          <Button variant="outlined">add card</Button>
        </ListItem>
      </List>
     
            
=======
  
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
      {listCards.map(card => {
        return (
          <ListItem key={card.id}>
            <ActivityCard data={card} />
          </ListItem>
        )
      })}

      <ListItem >
        {renderAdd("Accept","Add Card", handleNewElement)}
      </ListItem>      
    </List>
    
>>>>>>> a5846905fd783d16e109f8b599a7f15ebee60b72
  );
}

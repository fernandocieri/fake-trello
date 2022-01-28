import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import { credentialsContext, getApiData, listCardsContext } from "../App";
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
  const { credentialsData } = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const { listCards, setListCards } = useContext(listCardsContext);
  const { renderAdd, inputState } = useAddButton();
  // listCards.map(list=> console.log(list))


  async function handleNewElement() {
    let postResponse = await axios.post(`https://api.trello.com/1/cards?name=${inputState}&idList=${listData.id}&key=${credentialsData.key}&token=${credentialsData.token}`)
    setListCards([...listCards, postResponse.data]);
  }

  /* useEffect(() => {
    async function getInfo() {
      let items = [];
      for (let i = 0; i < boardData.length; i++) {
        if (listCards !== undefined) {
          setListData({...listData})
          items = [ {...response.data, test: [...items]} ];
        }
      }
      //setBoardLists([...items]);
      console.log(items);
    }
    getInfo();
  }, []); */

  useEffect(() => {
    function cardMovement() {
      let card = ({...listData, test:[...listCards]});
      setListData({...card})
      console.log(card);
    } 
    cardMovement()
  }, []);



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
            {listData.name}
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
        {renderAdd("Accept", "Add Card", handleNewElement)}
      </ListItem>
    </List>

  );
}

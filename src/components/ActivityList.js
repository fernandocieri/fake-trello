import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import { credentialsContext } from "./WorkspaceContainer";
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
    async function getInfo() {
      let response = await axios.get(`https://api.trello.com/1/lists/${listData.id}/cards?key=${credentials.key}&token=${credentials.token}`)
      setListCards([...response.data]);
    }
    getInfo()
  }, [])

  function handleOnDragEnd(result) {
    if (!result.destination) return;
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="activitylist" >
          {(card)=> ( 
            <ListItem className="activitylist" {...card.droppableProps} ref={card.innerRef}>
              {listCards.map(card =>{
                return(
                  <Draggable key={card.id} draggableId={card.id} index={card.index}>
                    <ActivityCard data={card} key={card.id}  ref={card.innerRef} {...card.draggableProps} {...card.dragHandleProps} />
                  </Draggable>
                )} )}
                {card.placeholder}
            </ListItem>
          )}
        </Droppable>
      </DragDropContext>

      <ListItem>
        <Button variant="outlined" >add card</Button>
      </ListItem>
    </List>
  );
}

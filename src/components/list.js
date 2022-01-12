import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./card";
import { credentialsContext } from "./container";
// import { colors = red[500] } from '@mui/material/colors';
import {
  ListItem,
  List,
  Button,
  ListSubheader,
  Typography,
} from "@mui/material";

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
  const [listData, setListData] = useState({...props.data});
  const [listCards, setListCards] = useState([]);

  useEffect(async () => {
    const apiCards = await axios.get(`https://api.trello.com/1/lists/${listData.id}/cards?key=${credentials.key}&token=${credentials.token}`);
    setListCards([...apiCards.data]);
    console.log(apiCards.data);
  }, [])

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
      {/* { map component ActivityCard} */}
      <ListItem>
      {listCards.map(card => <ActivityCard data={card} />)}
      </ListItem>

      <ListItem>
        <Button variant="outlined">add card</Button>
      </ListItem>
    </List>
  );
}

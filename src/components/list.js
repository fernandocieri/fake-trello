import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./card";
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

export default function ActivityList({ listName = "New List" }, { id }) {
  const [listID, setListID] = useState(id);
  const [listCards, setListCards] = useState(undefined);

  async function getCards() {
    /*get info of all cards for the list matching the id in the request. Stil not sure about the format of the info*/
    const resp = await axios.get(
      `https://api.trello.com/1/lists/${listID}/cards`
    );
    setListCards([...resp.text]);
  }
  return (
    //<ThemeProvider theme={customTheme}>
    
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
            List
          </Typography>
        </ListSubheader>
      }
    >
      {/* { map component ActivityCard} */}
      <ListItem>
        <ActivityCard />
      </ListItem>

      <ListItem>
        <Button variant="outlined">add card</Button>
      </ListItem>
    </List>
   //</ThemeProvider>
  );
}

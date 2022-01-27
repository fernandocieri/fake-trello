import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import { credentialsContext, getApiData,listCardsContext } from "../App";
// import { colors = red[500] } from '@mui/material/colors';
import {
  ListItem,
  List,
  Button,
  ListSubheader,
  Typography,
} from "@mui/material";
import useAddButton from './hooks/useAddButton';

export default function ActivityList(props) {
  const {credentialsData} = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const {listCards, setListCards} = useContext(listCardsContext);
  const {renderAdd, inputState} = useAddButton(); 
  // listCards.map(list=> console.log(list))
  async function handleNewElement(){
    let postResponse = await axios.post(`https://api.trello.com/1/cards?name=${inputState}&idList=${listData.id}&key=${credentialsData.key}&token=${credentialsData.token}`)
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
    
  );
}

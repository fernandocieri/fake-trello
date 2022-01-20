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

export default function ActivityList(props) {
  const credentials = useContext(credentialsContext);
  const [listData, setListData] = useState({ ...props.data });
  const [listCards, setListCards] = useState([]);
  const {renderAdd, inputState} = useAddButton();

  useEffect(() => {
    getApiData(setListCards, `https://api.trello.com/1/lists/${listData.id}/cards?key=${credentials.key}&token=${credentials.token}`)
  }, [])

  async function handleSaveEdition(){
    await axios.post(`https://api.trello.com/1/lists?name=${inputState}&idBoard=${listData.idBoard}?key=${credentials.key}&token=${credentials.token}`)   
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
      <ListItem>
        {listCards.map(card => <ActivityCard data={card} key={card.id} />)}
      </ListItem>

      <ListItem>
        {renderAdd("Accept","Add Card", handleSaveEdition())}
      </ListItem>
      {console.log(listData)}
    </List>
    
  );
}

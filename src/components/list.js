import { useState, useEffect, useContext } from 'react';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Activityspecs from './Activityspecs';
import Box from '@mui/material/Box';
/*function ListCreator() {
  return (
    <div id='addNewCard'>
      <div className='cardTitle'>add a new list</div>
      <button onClick={ }>+</button>
    </div>
  )
}*/
export default function List({listName="New List"},{id}) {
    const [listID, setListID] = useState(id);
    const [listCards, setListCards] = useState(undefined);
  
    async function getCards() {
      /*get info of all cards for the list matching the id in the request. Stil not sure about the format of the info*/
      const resp = await axios.get(`https://api.trello.com/1/lists/${listID}/cards`);
      setListCards([...resp.text]);
    }  
    return (
      <Box className='list' sx={{ p: 10, border: '1px dashed grey' }}>
        <div className='listName'>{listName}</div>        
        {/* {component card} */}
        <Button variant="outlined">add card</Button>
      </Box>
    )
  }
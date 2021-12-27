import { useState, useEffect, useContext } from 'react';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import ReactDOM from 'react-dom';

/*function ListCreator() {
  return (
    <div id='addNewCard'>
      <div className='cardTitle'>add a new list</div>
      <button onClick={ }>+</button>
    </div>
  )
}*/

function List(props) {
  const [listID, setListID] = useState(props.id);
  const [listCards, setListCards] = useState(undefined);

  async function getCards() {
    /*get info of all cards for the list matching the id in the request. Stil not sure about the format of the info*/
    const resp = await axios.get(`https://api.trello.com/1/lists/${listID}/cards`);
    setListCards([...resp.text]);
  }

  return (
    <Stack className='list' spacing={2}>
      <div className='listName'></div>
      <Card /*fill props for card from mapping listCards. Check later*//>
      <Button variant="outlined">add card</Button>
    </Stack>
  )
}

ReactDOM.render(
  <List />,
  document.getElementById('root')
);

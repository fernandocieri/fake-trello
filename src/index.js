import React, { useState, useEffect, useContext } from 'react';
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
    <div className='list'>
      <Card /*fill props for card from mapping listCards. Check later*//>
      <button>add card</button>
    </div>
  )
}

ReactDOM.render(
  <List />,
  document.getElementById('root')
);

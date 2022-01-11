import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stack, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./list";
import ActionMenu from './actions';

export default function Board(props) {
  const [boardId, setBoardId] = useState(props.id);

  /*async function testCreateComponents() {
    //let urlBoard = 'https://api.trello.com/1/boards?key=ce5abaa238f274a5ea5ae0b3986e140d'
    let urlList = 'https://api.trello.com/1/boards/61c2184ec5370301a1cf0420/lists?key=ce5abaa238f274a5ea5ae0b3986e140d&token=fb4d92026015c96f9e12f8278240a94ad2a82c8f0de1f0649028458134ab12c5'
    let notStringifiedData = {name:'prueba api not stringified', idBoard:'61c2184ec5370301a1cf0420'}
    let data = JSON.stringify({
    name: 'prueba api',
    idBoard: '61c2184ec5370301a1cf0420'
    });
    const resp = await axios.post(`https://api.trello.com/1/lists?name=${notStringifiedData.name}&idBoard=${notStringifiedData.idBoard}&key=ce5abaa238f274a5ea5ae0b3986e140d&token=fb4d92026015c96f9e12f8278240a94ad2a82c8f0de1f0649028458134ab12c5`);
    console.log(resp.status);
    console.log(resp);
    console.log(notStringifiedData);
  }*/

  //testCreateComponents()

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{props.name}</div>
          <IconButton variant="outlined">
            <MoreVertIcon onClick={handleClickOpen} />
          </IconButton>
          <ActionMenu
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>

        <section className="boardLists">
          {/* mapear listas */}
          {/* <ActivityList /> */}
        </section>
      </Stack>
    </Box>
  );
}

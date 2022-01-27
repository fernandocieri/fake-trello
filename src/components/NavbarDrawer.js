import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { credentialsContext, boarDataContext, getApiData } from "../App";
import BoardPreview from "./BoardPreview";
import axios from "axios";

export default function TemporaryDrawer() {
  const { id } = useParams();
  const credentials = useContext(credentialsContext);
  const [organization, setOrganizations] = useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const boardName = []
  const { boardData, setBoardData } = useContext(boarDataContext)
  const boardId = []
  boardData.map(board => boardName.push(board.name) && boardId.push(board.id))
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {boardData.map((board, index) => (
          <Link to={`board/${boardId[index]}`}>
            <BoardPreview data={board} icons={false} key={board.id} />
            {/* <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem> */}
          </Link>
        ))}
      </List>

    </Box>
  );
  // useEffect(() => {
  //   getApiData(setOrganizations, `https://api.trello.com/1/members/me/organizations?key=${credentials.key}&token=${credentials.token}`)

  // }, [])

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

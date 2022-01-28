import * as React from "react";
import { useContext, useState } from "react";
import { credentialsContext, boarDataContext } from "../App";
import { useParams, Link } from "react-router-dom";

import BoardPreview from "./BoardPreview";

import { Box, Drawer, List, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
          <Link to={`board/${boardId[index]}`} key={board.id}>
            <BoardPreview data={board} icons={false} />
          </Link>
        ))}
      </List>

    </Box>
  );

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

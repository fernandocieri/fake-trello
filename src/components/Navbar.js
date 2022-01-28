import * as React from "react";
import { Link } from "react-router-dom";

import NavbarDrawer from "./NavbarDrawer";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

export default function ButtonAppBar({ title = "Frello" }) {
  return (
    <Box sx={{ flexGrow: 1 }} className="Navbar">
      <AppBar position="static">
        <Toolbar>
          <NavbarDrawer />
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: "white", fontFamily: 'Raleway, Arial', textDecoration: 'none' }}
            component={Link}
            to="/"
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

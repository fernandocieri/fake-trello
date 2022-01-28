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
            sx={{ flexGrow: 1 }}
            component={Link}
            to="/"
          >
            {title}
          </Typography>
          <Button variant="contained" className="editButton">
            Boton provisional
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

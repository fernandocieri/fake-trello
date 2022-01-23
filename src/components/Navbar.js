import * as React from "react";
import { Link } from "react-router-dom";
import NavbarDrawer from "./NavbarDrawer";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar({ title = "Frello" }) {
  return (
    <Box sx={{ flexGrow: 1 }} className="Navbar">
      <AppBar position="static">
        <Toolbar>
          {/* This button shows a menu with a list of created boards */}
  
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
          {/* This button can be used as a login/logout button if We make that option */}
          <Button variant="contained" className="editButton">
            Boton provisional
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

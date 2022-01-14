import { useState, useEffect, useContext } from 'react';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Container from "./components/WorkspaceContainer";
import "./assets/index.css";

const html = <Container container="jose"/>;



ReactDOM.render(  
  html,
  document.getElementById('root')
);

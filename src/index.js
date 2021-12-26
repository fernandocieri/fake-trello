import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Container from "./components/container";
import "./assets/index.css";

const html = <Container container="jose"/>;

ReactDOM.render(
  html,
  document.getElementById('root')
);


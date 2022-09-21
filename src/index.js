import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Laskuri, Arvo } from './teht1_4'
import reportWebVitals from './reportWebVitals';
import { Lista, Otsikko, Rivi, Taulukko, TauluRivi, Teht6 } from './teht5_8';
import { Cars, Info } from './teht9_10';
import { Asiakas } from './teht18_26';

ReactDOM.render(
  <React.StrictMode>
    <Asiakas/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import PrivacyPolicy from './routes/PrivacyPolicy';
import Navbar from "./components/Navbar";

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styled from "styled-components"

const MainContainer = styled.div`
  height: 100%;
  display: flex;

  a {
    text-decoration: none;
    color: black;
  }
`

const ContentContainer = styled.div`
  height: 100%;
  width: 80%;
  text-align: center;
  padding-left: 20%;
`

ReactDOM.render(
  <BrowserRouter>
    <MainContainer>
      <Navbar />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </ContentContainer>
    </MainContainer>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

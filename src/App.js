import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import PrivetRouter from './components/PrivetRouter/PrivetRouter';

export const userContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivetRouter path="/book/:bedType">
              <Book />
            </PrivetRouter>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </userContext.Provider>
      
  );
}

export default App;

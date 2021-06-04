import React from 'react';
import LogIn from './LogIn';
import SignUp from "./SignUp"
import {Route, Link} from 'react-router-dom';
import NavBar from "./NavBar";

function App() {

  return (
    <div className="app">
      <NavBar />
      <Route exact path="/" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  );
}

export default App
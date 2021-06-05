import React from 'react';
import LogIn from './LogIn';
import SignUp from "./SignUp"
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import NavBar from "./NavBar";

function App() {

  return (
    <Router>
      <div className="app" style={{
        backgroundImage: 'url("http://static1.squarespace.com/static/5b31006cb98a78b8bc10b737/5b324356562fa792e74efb6f/5da0437579871d1753c9e7e6/1570784496779/best-places-to-study-in-london.jpeg?format=1500w")'
      }}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
  </div>
)

export default App

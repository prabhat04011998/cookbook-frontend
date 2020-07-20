import React,{Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './components/Home';
import DishListing from './components/DishListing';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ReadRecipe from './components/ReadRecipe';
import MyNotes from './components/MyNotes';
import MyFav from './components/MyFav'
import SearchResult from './components/SearchResult'
import AddRecipe from './components/AddRecipe'

class App extends Component {
  render(){
  return (
    <Router>
    <div className="App" style={{background:'#f3f3f3'}}>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">COOK-BOOK</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/addRecipe">Add Recipe</a>
            </li>
            {localStorage.usertoken ? (null) : (<Fragment>
              <li class="nav-item ">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signup">SignUp</a>
            </li>
            </Fragment>)}            
          </ul>
          
        </div>
      </nav>
      <Route path="/" exact component={Home} />
      <Route path="/dishListing:id" component={DishListing} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/readRecipe:id" component={ReadRecipe} />
      <Route path="/mynotes" component={MyNotes} />
      <Route path="/myfavs" component={MyFav} />
      <Route path="/find:word" component={SearchResult} />
      <Route path="/addRecipe" component={AddRecipe} />
    </div>
    </Router>
  );
}
}


export default App;

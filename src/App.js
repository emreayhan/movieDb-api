import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import SearchBar from "./components/searchBar";
import List from "./components/list";
import ListInformation from "./components/listInformation";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="ui container" style={{ marginTop: "20px" }}>
          <Route path="/" exact component={SearchBar} />
          <Route path="/list" exact component={List} />
          <Route path="/:type/:id" exact component={ListInformation} />
        </div>
      </Router>
    );
  }
}

export default App;

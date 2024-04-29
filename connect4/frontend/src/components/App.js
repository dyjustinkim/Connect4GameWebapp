import React, { Component } from "react";
import { render } from "react-dom";
import { Board } from "./Board";
import "./App.css";



export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Board></Board>
        
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
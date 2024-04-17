import React, { Component } from "react";
import NumberForm from './NumberForm';
import Result from './Result';
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        result: null
    };
}

handleResponse = (result) => {
  this.setState({ result: result });
};

render() {
  return (
      <div>
          <h1>AJAX Example</h1>
          <NumberForm handleResponse={this.handleResponse} />
          {this.state.result !== null && <Result result={this.state.result} />}
      </div>
  );
}
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);


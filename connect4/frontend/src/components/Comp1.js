import React, { Component } from "react";
import "./Comp1.css"

export default class Comp1 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '' 
    };
    }
  
    
    fetchData = () => {
      fetch('move', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: 'value' }) 
       })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          this.setState({ responseData: data, error: null });
      })
      .catch(error => {
          this.setState({ responseData: null, error: error.message });
      });
    };
  
    render() {
        const { responseData, error } = this.state;
  
        return (
            <div className="buttons" onClick={this.fetchData}>
                
                
  
                {error && <p>Error: {error}</p>}
                {responseData && (
                    <div>
                        <h2>Received Data</h2>
                        <p>{JSON.stringify(responseData)}</p>
                    </div>
                )}
            </div>
        );
        
    }
  }
// Create componet fon generate rows in table
import React, { Component } from 'react';
export default class Row extends Component {
  constructor(props){
    super(props)
      debugger;
  }
  render(){
debugger;
    return (
     
      <tr>
       <td>{this.props.data.name}</td>
        <td>{this.props.data.step}</td>
        <td>{this.props.data.complete}</td>
        
      </tr>
    )
  }
}

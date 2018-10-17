import React, { Component } from 'react';

export default class Coverage extends Component {

  removeCoverage(){
    console.log('yep, that remoob');
  }


  render() {
    // console.log(this.state.image);
    // console.log(this.props.size);
    return <div onClick={this.removeCoverage()}>THIS IS THE COVERAGE DIV, VIA A COMPONENT</div>
  }
}

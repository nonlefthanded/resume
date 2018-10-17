import React, { Component } from 'react';

export default class Date extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'date':this.props.date,
      'months':["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    };

    this.state.month = this.state.months[parseInt(this.state.date.substr(4,2),10)-1];
    this.state.day   = parseInt(this.state.date.substr(6,2),10);
    this.state.year  = this.state.date.substr(0,4);
    this.state.ordinal = this.getOrdinalNum(this.state.day);

    if (this.state.date) {
      this.state.text = this.state.month + ' ' + this.state.day + this.state.ordinal + ', ' + this.state.year;
    }

    if (!this.state.date) this.state.text = "Present";
  }

  getOrdinalNum(n) {
    return (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

  render() {
    // console.log(this.state);
    return <time className="date">{this.state.text}</time>
  }
}

import React, { Component } from 'react';

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {'intro' : {'title':{},'content':{}}}
    fetch(this.props.baseUrl + "/pages/" + this.props.id)
      .then(response => { return response.json() })
      .then((intro) => {
        this.setState({ intro });
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.intro.title.rendered}</h1>
        <article
          className="post__content"
          dangerouslySetInnerHTML={{__html: this.state.intro.content.rendered}}>
        </article>
      </div>
    )
  }
}

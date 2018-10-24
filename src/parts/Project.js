import React, { Component } from 'react';
import Image from './Image';

export default class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'project' : {'title':{}},
      'meta' : {'screenshot':0}
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(this.props.baseUrl + "/project/" + this.props.id),
      fetch(this.props.baseUrl + "/project/" + this.props.id + "/meta")
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([Project,Meta]) => {
      //Meta.screenshot = '2';
      Meta.url = 'https://' + Meta.url;
      this.setState({
          project: Project,
          meta: Meta
      });
    });
  }

  render() {
    // console.log(this.state);
    if (this.state.meta.screenshot === 0) return false;
    return <div key={this.props.id} className="row project">
      <div className="col-md-2 col-sm-4 col-xs-6">
        <Image baseUrl={this.props.baseUrl} id={this.state.meta.screenshot} className="project-image img-fluid zoom-in" size="thumbnail" />
      </div>
      <div className="col-md-10 col-sm-8 col-xs-6">
        <b><a href={this.state.meta.url} target="_blank">{this.state.project.title.rendered}</a></b>
        <div
          className="post__content"
          dangerouslySetInnerHTML={{__html: this.state.project.content.rendered}}>
        </div>
      </div>
    </div>
  }
}

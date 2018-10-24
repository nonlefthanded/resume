import React, { Component } from 'react';
import Image   from './Image';
import Project from './Project';
import Date    from './Utils';

export default class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error     : {},
      company   : this.props.data,
      meta      : {},
      baseUrl   : this.props.baseUrl
    };
  }

  componentDidMount() {
    return new Promise((resolve,reject)=>{
      fetch(this.state.baseUrl + "/company/" + this.state.company.id + "/meta")
      .then((res) => res.json())
      .then((Meta)=>{
        this.setState({
            meta: Meta
        });
      })
    });
  }

  render() {
    // console.log(this.state);
    if (!this.state.meta.logo) return "loading..."
    return (
      <div key={this.state.company.id} className="row company">
      <section className="col-lg-2">
        <Image id={this.state.meta.logo} baseUrl={this.state.baseUrl} className="img-fluid companyImage" size="full" />
      </section>
      <article className="col-lg-10">
        <h2 className="company-name">
          {this.state.company.title.rendered}
          <br />
          <small>
            {this.state.meta.address} {this.state.meta.city}
          </small>
        </h2>
        <p>
          <big><b>{this.state.meta.job_title}:</b></big>
          &nbsp;
          <Date date={this.state.meta.start_date} />
          &nbsp;-&nbsp;
          <Date date={this.state.meta.end_date} />
        </p>

        <div
          className="post__content"
          dangerouslySetInnerHTML={{__html: this.state.company.content.rendered}}>
        </div>

        <hr />

        <section className="projects">
          <h4>Projects @ {this.state.company.title.rendered}</h4>
          {this.state.meta.projects.map((projectID,i)=>{
            return <Project key={i} baseUrl={this.state.baseUrl} id={projectID} />
            // return this.getProject(projectID);
          })}
        </section>

        <hr />

        <h4>Supervisor / Contact</h4>
        <p>
          {this.state.meta.supervisor}
          <br />
          <a href={'mailto:' + this.state.meta.supervisor_email}>{this.state.meta.supervisor_email}</a>
          , or <a href={'tel:' + this.state.meta.phone.replace(/[^0-9.]/g, '')}>{this.state.meta.phone}</a>
        </p>

      </article>
      </div>
    );
  }


}

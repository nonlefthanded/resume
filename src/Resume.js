import React, { Component } from 'react';
import './Resume.css';
// import Image from './parts/Image';

import MainContent from './parts/MainContent';
import Sidebar     from './parts/Sidebar';



export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error     : {},
      loaded    : {'companies':0,'projects':0,'meta':0,'media':0},
      baseUrl   : 'http://resume-data.nonlefthanded.com/wp-json/wp/v2'
    };
  }

  render(){
    return  <div id="resume">
              <section id="identity">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      &nbsp;
                    </div>
                  </div>
                </div>
              </section>

              <section id="identityInfo">
              <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    <p id="" className="text-right">
                    <img  src="https://kindling.xyz/wp-content/uploads/2016/07/Peter-Headshot-Square-1-e1478814843321.jpg"
                          alt="CJ Stritzel | Headshot"/>
                      <b>CJ Stritzel</b> &nbsp;
                      Front End Developer &nbsp;
                      <a href="//nonlefthanded.com"><i className="fa fa-sitemap"></i> nonlefthanded.com</a> &nbsp;
                      <a href="mailto:nonlefthanded@gmail.com"><i className="fa fa-envelope"></i> nonlefthanded@gmail.com</a> &nbsp;
                      <a href="tel:5037579890"><i className="fa fa-phone"></i> 503 757 9890</a>
                    </p>
                  </div>
                </div>
              </div>
              </section>
              <main className="container">
              <div className="row">
                <MainContent  />
                <Sidebar baseUrl={this.state.baseUrl} />

              </div>
              </main>
            </div>
  }
}

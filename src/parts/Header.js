import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {'intro' : {'title':{},'content':{}}}

  }

  render() {
    return (
    <div>
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
          <div className="col-12 col-md-6 text-sm-center">
            <img  src="/headshot.jpg"
                  alt="CJ Stritzel | Headshot"
                  className="img-fluid center center md-left lg-left xl-left" />
          </div>
          <div className="col-12 col-md-6 text-xl-right text-lg-right text-md-right text-sm-right text-center">
            <p>
            <big><b>CJ Stritzel</b></big> Front End Developer
            <br />
            <a
              className=""
              href="mailto:nonlefthanded@gmail.com">nonlefthanded@gmail.com
            </a> | <a
                    className=""
                    href="tel:5037579890">503 757 9890
                   </a>
            </p>
          </div>
        </div>

      </div>

      </section>


    </div>
    )
  }
}

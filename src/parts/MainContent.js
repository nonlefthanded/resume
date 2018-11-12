import React, { Component } from 'react';
import Company from './Company';

export default class MainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error     : {},
      order     : [],
      companies : {},
      baseUrl   : 'http://resume-data.nonlefthanded.com/wp-json/wp/v2'
    };
  }

  componentDidMount() {
    return new Promise((resolve,reject)=>{
      fetch(this.state.baseUrl + "/company/")
      .then((res) => res.json())
      .then((companies)=>{
        // console.log(companies);
        let statusCopy = Object.assign({}, this.state);
        companies.map((Company,id)=>{
            statusCopy.companies[Company.id] = Company;
            statusCopy.order.push(Company.id);
            this.setState({ statusCopy });
            return false;
        });
      })
    });
  }


  render() {
    // const Companies = this.state;
    // console.log(Companies);
    const CompanyList = this.state.order.map((companyID,i) => {
      console.log(i);
      return <Company key={i} index={i} data={this.state.companies[companyID]} baseUrl={this.state.baseUrl} />
    });

    return (
      <section>
        {CompanyList}
      </section>
    );
  }


}

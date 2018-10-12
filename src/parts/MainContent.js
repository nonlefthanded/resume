import React, { Component } from 'react';

export default class MainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error     : {},
      loaded    : {'companies':0,'projects':0,'meta':0,'media':0},
      order     : {'companies' : []},
      companies : {},
      projects  : {},
      meta      : {},
      media     : {},
      baseUrl   : 'http://resume-data.nonlefthanded.com/wp-json/wp/v2',
      tmp       : [],
      tmpMeta   : {}
    };
  }

  componentDidMount() {
    return fetch(this.state.baseUrl + "/company")
      .then(res => res.json())
      .then(
        (Companies) => {
          Companies.map(function(Company){
              let statusCopy = Object.assign({}, this.state);
              statusCopy.order.companies.push(Company.id);
              statusCopy.companies[Company.id] = Company;
              statusCopy.meta[Company.id] = {'logo':1};
              return this.setState({ statusCopy  });
          },this);
        }
      )
      .then(() => {
        var self = this;
        this.state.order.companies.map((id) => {
          return fetch(this.state.baseUrl + "/company/" + id + "/meta")
            .then(res => res.json())
            .then((Meta) => {
              let statusCopy = Object.assign({}, this.state);
              statusCopy.meta[id] = Meta;
              Meta.projects.map((pID) => {
                return fetch(this.state.baseUrl + "/project/" + pID)
                        .then(res => res.json())
                        .then((project)=>{
                          let statusCopy = Object.assign({}, this.state);
                          statusCopy.projects[project.id] = project;
                          self.setState({ statusCopy });
                        })

                return false;
              });
              self.setState({ statusCopy });
              //console.log(Meta.projects);
              return fetch(this.state.baseUrl + "/media/" + Meta.logo)
                      .then(res => res.json())
                      .then((val) => {
                        let statusCopy = Object.assign({}, self.state);
                        statusCopy.media[val.id] = val;
                        self.setState({ statusCopy });
                      })

            })
        });
      },this)
  }

  render() {
    const Enchilada = this.state;
    console.log(Enchilada);
    const CompanyList = Enchilada.order.companies.map((companyID,i) => {
      var imgSrc = (Enchilada.media[Enchilada.meta[companyID].logo])
          ?
          Enchilada.media[Enchilada.meta[companyID].logo].source_url :
          'https://via.placeholder.com/40x40';

      return <div key={companyID} className="row company">
        <div className="col-lg-2">
        <img src={imgSrc} className="img-fluid" alt="" />
        </div>
        <div className="col-lg-10">
        <h2 className="title">
          {Enchilada.companies[companyID].title.rendered}
        </h2>
        <article
          className="post__content"
          dangerouslySetInnerHTML={{__html: Enchilada.companies[companyID].content.rendered}}>
        </article>

        </div>
      </div>
    });

    return (
      <section>
        <ul className="list-unstyled">{CompanyList}</ul>
      </section>
    );
  }


}

import React, { Component } from 'react';


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {'skills' : [],'objectives':{'content':{}},'education':{'content':{}}}
  }


  componentDidMount() {
    Promise.all([
      fetch(this.props.baseUrl + "/skill"),
      fetch(this.props.baseUrl + "/widget/76"),
      fetch(this.props.baseUrl + "/widget/77"),
      fetch(this.props.baseUrl + "/widget/78")
    ])
    .then(([skills,objectives,education,contact]) => Promise.all([
      skills.json(),
      objectives.json(),
      education.json(),
      contact.json()]))
    .then(([Skills,Objectives,Education,Contact]) => {
      this.setState({
        objectives:Objectives,
        education:Education,
        contact:Contact
      });
      return Skills.map((skill,i) => {
        return fetch(this.props.baseUrl + "/skill/" + skill.id + "/meta")
          .then(res => res.json())
          .then((skillMeta) => {
            let statusCopy = Object.assign({}, this.state);
            skill.meta = skillMeta;
            statusCopy.skills.push(skill);
            // console.log(statusCopy);
            this.setState({ statusCopy  });
            // return false;
          })
      });
    });
  }


  render() {
    console.log(this.state);
    const Objectives = <p
      className="post__content"
      dangerouslySetInnerHTML={{__html: this.state.objectives.content.rendered}}>
    </p>;

    const Education = <p
      className="post__content"
      dangerouslySetInnerHTML={{__html: this.state.education.content.rendered}}>
    </p>;

    const SkillList = this.state.skills.map((skill,i) => {
        var _class = "progress-bar w-" + skill.meta.level_of_expertise;
        var _percentStyle = {width:skill.meta.level_of_expertise+'%'}
        return  <li key={i}>
                  <big><b>{skill.title.rendered}</b></big>
                  <br />
                  <small
                    className="post__content"
                    dangerouslySetInnerHTML={{__html: skill.content.rendered.replace(/<p>/g,'')}}>
                  </small>
                  <div className="progress">
                    <div  className={_class}
                          role="progressbar"
                          style={_percentStyle}
                          aria-valuenow={skill.meta.level_of_expertise}
                          aria-valuemin="0"
                          aria-valuemax="100">
                          {skill.meta.level_of_expertise}%</div>
                    </div>
                </li>
    });

    return (
      <div>
        <h3>Objectives</h3>
        {Objectives}
        <hr />

        <h3>Education</h3>
        {Education}
        <hr />

        <h3>Skills</h3>
        <ul className="list-unstyled" id="skills">{SkillList}</ul>
      </div>
    )
  }
}

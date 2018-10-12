import React, { Component } from 'react';


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {'skills' : []}
  }

  componentDidMount() {
    return fetch(this.props.baseUrl + "/skill")
      .then(res => res.json())
      .then((skills) => {
        return skills.map((skill,i) => {
          // console.log(skill.id);
          return fetch(this.props.baseUrl + "/skill/" + skill.id + "/meta")
            .then(res => res.json())
            .then((skillMeta) => {
              let statusCopy = Object.assign({}, this.state);
              skill.meta = skillMeta;
              statusCopy.skills.push(skill);
              return this.setState({ statusCopy  });
            })

        });
        //console.log(skills);
      });
}
  render() {
    // console.log(this.state.skills);
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
        <h1>Skills</h1>
        <ul className="list-unstyled" id="skills">{SkillList}</ul>
      </div>
    )
  }
}

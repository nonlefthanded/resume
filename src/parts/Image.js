import React, { Component } from 'react';

export default class Image extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'image' : {'title':{},'media_details':{'sizes':{}}},
      'baseUrl' : this.props.baseUrl,
      'id'      : this.props.id
    };
    this.state.image.media_details.sizes[this.props.size] = {};

  }

  componentDidMount() {
    return new Promise((resolve,reject)=>{
      fetch(this.state.baseUrl + "/media/" + this.props.id)
      .then((res) => res.json())
      .then((Image)=>{
        this.setState({
            image: Image
        });
      })
    });
  }

  showFullSize(image, data){
    console.log(image);
    console.log(data);
    // var coverScreen = document.getElementById('coverage').style.display = "block";
    // console.log(coverScreen);
    // create a new div element
    var newDiv = document.createElement("div");
    newDiv.classList.add("transition");
    newDiv.style.textAlign="center";
    // and give it some content
    var newContent = document.createElement("img");
    newContent.src = image;
    newContent.style.maxWidth = "100%";
    newContent.style.height = "80%";
    newContent.style.marginTop = "5%";

    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.setAttribute("id", "coverage");
    newDiv.setAttribute("class", "showing");

    newDiv.onclick = function() {
      // this.setAttribute("class","hiding");
      this.parentElement.removeChild(this);
    };

    // add the newly created element and its content into the DOM
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
    // element.classList.add('click-state');
  }

  render() {
    // console.log(this.state.image);
    // console.log(this.props.size);
    if (!this.state.image.title.rendered || !this.state.image.media_details.sizes[this.props.size])
    // return <span className="fa fa-circle-notch fa-spin"></span>;
    return <img
            alt="loading..."
            className={this.props.className}
            src="//via.placeholder.com/400x400?text=%20" />;
            // fa fa-circle-notch fa-spin
    // else...
    return <img
            alt={this.state.image.title.rendered}
            className={this.props.className}
            src={this.state.image.media_details.sizes[this.props.size].source_url}
            onClick={() => { this.showFullSize(this.state.image.source_url, this.state.image) }} />
  }
}

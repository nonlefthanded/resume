import React, { Component } from 'react';

export default class Utils extends Component {
  getImage(imageID) {
    return fetch(this.state.baseUrl + "/media/" + imageID)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something went wrong...");
        }
      })
      .then((result) => {
        return result;
      })

  }
}

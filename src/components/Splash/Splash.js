import React, { Component } from 'react';
import Scene from './Scene';
import './Splash.css';

export default class Splash extends Component {
  constructor() {
    super();

    this.scene = null;
    this.el = null;
  }

  componentDidMount() {
    if (this.el) {
      this.scene = new Scene(this.el);
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="Splash" ref={el => (this.el = el)}>
        <div className="Splash__text">
          <h2>Explore daily trends within the Discogs marketplace</h2>
          <h2>Brought to you by RBMA & Discogs</h2>
        </div>
      </div>
    );
  }
}

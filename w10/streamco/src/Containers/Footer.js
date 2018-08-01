import React, { Component } from 'react';
import facebook from '../assets/social/facebook-white.svg';
import twitter from '../assets/social/twitter-white.svg';
import instagram from '../assets/social/instagram-white.svg';
import appStore from '../assets/store/app-store.svg';
import playStore from '../assets/store/play-store.svg';
import windowsStore from '../assets/store/windows-store.svg';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <p>
          Home | Terms and Conditions | Privacy Policy | Collection Statement |
          Help | Manage Account
        </p>
        <p>Copyright © 2016 DEMO Streaming. All Rights Reserved.</p>
        <div id="iconRow">
          <div>
            <img src={facebook} />
            <img src={twitter} />
            <img src={instagram} />
          </div>
          <div>
            <img src={appStore} />
            <img src={playStore} />
            <img src={windowsStore} />
          </div>
        </div>
      </div>
    );
  }
}

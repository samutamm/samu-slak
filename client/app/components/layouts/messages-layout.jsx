import React from 'react';

import {Channels} from '../channels.jsx';

export default class extends React.Component {
  render() {
    return (
      <div id="messages">
        <p></p>
        <div id="left">
          <Channels />
        </div>
        <div id="center">text</div>
        <div id="right">text</div>
      </div>
    );
  }
}

/*

*/

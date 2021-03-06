import React from 'react'
import { render } from 'react-dom'
import './index.sass'
import Root from './components/Root'
import webSocket from './webSocket'


render(
  <Root />,
  document.querySelector('main')
);


// for debugging

import state from './state'
import moment from 'moment'
window.DEBUG = window.DEBUG || {}
window.DEBUG.state = state;
window.DEBUG.React = React;
window.DEBUG.moment = moment;

import React from 'react'
import SimpleReactRouter from 'simple-react-router'

// Pages
import PageNotFound from './components/PageNotFound'
import HomePage from './components/HomePage'

export default class Router extends SimpleReactRouter {
  getRoutes(map, props){
    map('/',     HomePage)
    map('*path', PageNotFound)
  }
}

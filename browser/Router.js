import React from 'react'
import SimpleReactRouter from 'simple-react-router'

// Pages
import NotFoundPage      from './components/pages/NotFoundPage'
import LoggedOutHomePage from './components/pages/LoggedOutHomePage'
import LoggedInHomePage  from './components/pages/LoggedInHomePage'
import SkillsPage        from './components/pages/SkillsPage'
// import AdminSkillsPage   from './components/pages/AdminSkillsPage'


export default class Router extends SimpleReactRouter {
  getRoutes(map, props){
    const { session } = props
    if (session.user){
      map('/', LoggedInHomePage)
      map('/skills', SkillsPage)
      // map('/admin/skills', AdminSkillsPage)
    }else{
      map('/', LoggedOutHomePage)
    }
    map('/:path*', NotFoundPage)
  }
}

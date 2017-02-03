import React from 'react'
import SimpleReactRouter from 'simple-react-router'

// Pages
import LoadingPage       from './components/pages/LoadingPage'
import NotFoundPage      from './components/pages/NotFoundPage'
import LoggedOutHomePage from './components/pages/LoggedOutHomePage'
import LoggedInHomePage  from './components/pages/LoggedInHomePage'
import SkillsPage        from './components/pages/SkillsPage'
import EditSkillsPage    from './components/pages/EditSkillsPage'


export default class Router extends SimpleReactRouter {
  getRoutes(map, props){
    const { session } = props
    if (!session){
      map('/:path*', LoadingPage)
      return
    }
    if (session.user){
      map('/', LoggedInHomePage)
      map('/skills', SkillsPage)
      map('/skills/edit', EditSkillsPage)
    }else{
      map('/', LoggedOutHomePage)
    }
    map('/:path*', NotFoundPage)
  }
}

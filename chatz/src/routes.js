import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Pages
import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'

export default () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/room/:id' component={Room}/>
    <Route component={NotFound}/>
  </Switch>
)
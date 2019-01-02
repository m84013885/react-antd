'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './login.js'
import Home from './home.js'
import Error from './error'
import './cropper.css'
import './css.css'

class Component extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin" component={Login}></Route>
          <Route exact path="/admin/login" component={Login}></Route>
          <Route path='/admin/home/:id' component={Home} />
          <Route component={Error} ></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Component

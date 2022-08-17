import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ToDo from 'pages/ToDo'
import Task from 'pages/Task'
import Layout from 'containers/Layout'
import ScrollToTop from 'react-router-scroll-top'

const routes = () => (
  <Router>
    <ScrollToTop>
      <Layout>
        <Switch>
          <Route exact path='/' component={ToDo} />
          <Route path='/todo/:id' component={Task} />
        </Switch>
      </Layout>
    </ScrollToTop>
  </Router>
)

export default (routes)

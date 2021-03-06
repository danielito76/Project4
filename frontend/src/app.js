import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SecureRoute from './components/common/SecureRoute'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Home from './components/pages/Home'

import Register from './components/auth/Register'
import Login from './components/auth/Login'


import ShowUser from './components/users/Show'
import EditUser from './components/users/EditUser'

import About from './components/pages/About'
import Contacts from './components/pages/Contacts'

import NewAgreement from './components/rental_agreements/NewAgreement'

import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar />
        <ToastContainer position="bottom-right" hideProgressBar={true} />

        <Switch>

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <SecureRoute path="/profile/edit" component={EditUser} />
          <SecureRoute path="/profile" component={ShowUser} />
          <SecureRoute path="/new_agreement" component={NewAgreement} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route exact path="/" component={Home} />
        </Switch>

        <Footer />
      </HashRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

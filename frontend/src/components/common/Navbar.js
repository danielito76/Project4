import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'
import logo from '../../img/mail-boxes-etc-logo.png'


class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      formData: {},
      dropdownOpen: false
    }

    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)

  }

  componentDidMount() {
    window.addEventListener('scroll', function () {
      var scroll = this.scrollY
      if(scroll > 100){
        document.querySelector('.navbar').classList.add('solid')
      } else {
        document.querySelector('.navbar').classList.remove('solid')
      }
    })
  }


  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen})
  }


  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        navbarOpen: false,
        dropdownOpen: false
      })
    }
  }

  render(){
    return (
      <nav className="navbar navbar-main is-fixed-top is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logo} alt="logo"/>
            </Link>
          </div>

          <div className="navbar-end">
            <a
              role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>

          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-start">

            </div>

            <div className="navbar-end">
              <Link to="/users" className="navbar-item">Rental Agreements</Link>
              {Auth.isAuthenticated() && <Link to="/agreements/new" className="navbar-item">Rent a mailbox</Link>}
              {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
              {Auth.isAuthenticated() && <Link to="/profile" className="navbar-item">My Profile</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item"  onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)

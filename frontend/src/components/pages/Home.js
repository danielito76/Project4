import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'





class Home extends React.Component{

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    return(
      <container>
        <section className="hero is-fullheight is-black">
        </section>
        <section>

          <hr/>
          <h1 className="title has-text-centered has-text-danger"><img width="200" src="https://www.seekpng.com/png/detail/171-1714311_mail-boxes-etc-logo-png-transparent-mbe-logo.png" alt="logo"/><br/>Register to rent a Mailbox!</h1>

          <h3 className="subtitle has-text-centered">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </h3>


          <hr/>
          <h2 className="subtitle has-text-centered">
            {!Auth.isAuthenticated() && <Link
              className="button is-large is-rounded"
              to={'/register'}>Register!</Link>}
          </h2>


          <h4 className="subtitle has-text-centered">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          </h4>
        </section>
        <hr/>
      </container>
    )
  }
}

export default Home

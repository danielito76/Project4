import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/profile')
      })
      .catch(() => Auth.removeToken())

  }




  render() {
    return (

      <div>
        <section className="hero is-fullheight is-black">
        </section>
        <section>
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">


              <h3 className="title is-1 is-italic" > Login </h3>
              <p className="subtitle has-text-black">Please login to access your profile</p>

              <div className="box">
                <form onSubmit={this.handleSubmit}>

                  <div className="field">
                    <label className="label">Email </label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="email"
                        name="email"
                        placeholder="eg: example@example.co.uk"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="password"
                        name="password"
                        placeholder="eg: ••••••••"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>



                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}


                  <div className="has-text-centered">
                    <Link to="/register" className="">Not a user? Sign Up </Link>
                  </div>

                  <br />

                  <div className="column has-text-centered">
                    <button className="submit">Submit</button>
                  </div>



                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Login

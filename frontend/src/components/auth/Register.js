import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register/', this.state.formData)
      .then(() => this.props.history.push('/profile'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }



  render() {
    return (
      <div>
        <section className="hero_light">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third is-centered">
              </div>
              <div className="column is-one-third">
                <img width="400" src="http://mberezzatomanerba.it/wp-content/uploads/2016/04/MBE-Logo-Vertical_Negativo-Convertito.png"/>
              </div>
              <div className="column is-one-third">
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">


              <h3 className="title is-1 is-italic" > Register </h3>
              <p className="subtitle has-text-black">Register here to get your Mailbox!</p>

              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>
                  <div className="column">
                    <div className="field">
                      <label className="label">Username</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          name="username"
                          placeholder="eg: Henry1491"
                          onChange={this.handleChange}
                        />
                      </div>
                      {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          type="email"
                          name="email"
                          placeholder="eg: henry1491@email.co.uk"
                          onChange={this.handleChange}
                        />
                      </div>
                      {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
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
                      {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Password Confirmation</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          type="password"
                          name="password_confirmation"
                          placeholder="eg: ••••••••"
                          onChange={this.handleChange}
                        />
                      </div>
                      {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
                    </div>
                  </div>

                  <div className="column">
                    <div className="has-text-centered">
                      <Link to="/login" className="">Already a member? Sign in! </Link>
                    </div>

                    <br />

                    <div className="has-text-centered">
                      <button className="submit">Submit</button>
                    </div>
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

export default Register

import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'




class EditUser extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }


    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/profile/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ formData: res.data }))
  }



  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }


  handleSubmit(e) {
    e.preventDefault()

    axios.put('/api/profile/', {...this.state.formData}, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {

    return (
      <div>
        <section className="hero is-fullheight is-black">
        </section>
        <section>
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h3 className="title is-1 is-italic" > Edit </h3>

              <div className="box">

                <form onSubmit={this.handleSubmit}>


                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        name="username"
                        value={this.state.formData.username || ''}
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
                        value={this.state.formData.email || ''}
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Please confirm your password</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="password"
                        name="password"
                        placeholder="eg: ******"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
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
                    </div>
                  </div>


                  <br />

                  <div className="has-text-centered">
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

export default EditUser

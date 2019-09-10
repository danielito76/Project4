import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import Auth from '../../lib/Auth'

const rentalPeriodOptions = [
  { value: 1, label: '3 months' },
  { value: 2, label: '6 months' },
  { value: 3, label: 'one year' },
  { value: 4, label: 'two years' },
  { value: 5, label: 'for ever and ever' }
]


class EditUser extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/profile/', {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ formData: res.data }))
  }









  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }


  handleSubmit(e) {
    e.preventDefault()

    axios.put('/api/profile/', {...this.state.formData}, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        Auth.setUser(res.data)
        this.props.history.push('/profile/')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log(this.state.formData.image)
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
                        placeholder="eg: Philip1992"
                        value={this.state.formData.username || ''}
                        onChange={this.handleChangeNormal}
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
                        placeholder="eg: philip1992@email.co.uk"
                        value={this.state.formData.email || ''}
                        onChange={this.handleChangeNormal}
                      />
                    </div>
                    {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Rental period</label>
                    <Select
                      name="age"
                      options={rentalPeriodOptions}
                      value={rentalPeriodOptions.find(option => option.value === this.state.formData.age)}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Please confirm your password</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        name="password"
                        placeholder="eg: ******"
                        onChange={this.handleChangeNormal}
                      />
                    </div>
                    {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                    <div className="field">
                      <label className="label">Password Confirmation</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          type="password"
                          name="passwordConfirmation"
                          placeholder="eg: ••••••••"
                          onChange={this.handleChangeNormal}
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

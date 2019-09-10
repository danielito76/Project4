import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Select from 'react-select'

const mailboxOptions = [
  { value: 1, label: 'Mailbox n.1' },
  { value: 2, label: 'Mailbox n.2' },
  { value: 3, label: 'Mailbox n.3' },
  { value: 4, label: 'Mailbox n.4' },
  { value: 5, label: 'FMailbox n.5' },
  { value: 6, label: 'Mailbox n.6' },
  { value: 7, label: 'Mailbox n.7' },
  { value: 8, label: 'Mailbox n.8' },
  { value: 9, label: 'Mailbox n.9' },
  { value: 10, label: 'Mailbox n.10' }
]

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
      },
      errors: {}
    }

    this.handleChangeNormal = this.handleChangeNormal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeNormal(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    const errors = { ...this.state.errors, [data.name]: '' }
    this.setState({ formData, errors })
  }


  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/rental_agreements/', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/profile'))
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


              <h3 className="title is-1 is-italic" > New agreement </h3>
              <p className="subtitle has-text-black">Make an agreement to start using your Mailbox!</p>

              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>

                  <div className="column">

                    <div className="field">
                      <label className="label">Start date</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          name="startdate"
                          placeholder="eg: 2019-09-05T15:23:20+01:00"
                          onChange={this.handleChangeNormal}
                        />
                      </div>
                      {this.state.errors.startdate && <small className="help is-danger">{this.state.errors.startdate}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Rental period</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          name="rentalperiod"
                          placeholder="eg: 00:00:24"
                          onChange={this.handleChangeNormal}
                        />
                      </div>
                      {this.state.errors.rentalperiod && <small className="help is-danger">{this.state.errors.rentalperiod}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Mailbox number</label>
                      <Select
                        name="mailbox"
                        options={mailboxOptions}
                        onChange={this.handleChange}
                      />
                      {this.state.errors.mailbox && <small className="help is-danger">{this.state.errors.mailbox}</small>}
                    </div>








                  </div>
                  <div className="column">

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

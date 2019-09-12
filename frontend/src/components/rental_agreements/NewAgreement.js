import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Select from 'react-select'

const rentalPeriodOptions = [
  { value: '3 months', label: '3 months' },
  { value: '6 months', label: '6 months' },
  { value: 'one year', label: 'one year' },
  { value: 'for ever', label: 'for ever' }
]

class NewAgreement extends React.Component {

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

  handleChange(selectedOption, name) {
    console.log(selectedOption)
    console.log(this.state.formData)
    const formData = { ...this.state.formData, [name]: selectedOption.value }
    const errors = { ...this.state.errors, [name]: '' }
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

  componentDidMount() {
    axios.get('/api/mailboxes/')
      .then(res => this.setState({ mailboxes: res.data.map(mb => ({ label: `Mailbox n.${mb.number}`, value: mb.id })) }))
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


              <h3 className="title is-1 is-italic" > New agreement </h3>
              <p className="subtitle has-text-black">Make an agreement to start using your Mailbox!</p>

              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>

                  <div className="column">

                    <div className="field">
                      <label className="label">Mailbox number</label>
                      <Select
                        name="mailbox"
                        options={this.state.mailboxes}
                        onChange={(e) => this.handleChange(e, 'mailbox')}
                      />
                      {this.state.errors.mailbox && <small className="help is-danger">{this.state.errors.mailbox}</small>}
                    </div>

                    <div className="field">
                      <label className="label">Start date</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          name="startdate"
                          placeholder="eg: 2019-09-05"
                          onChange={this.handleChangeNormal}
                        />
                      </div>
                      {this.state.errors.startdate && <small className="help is-danger">{this.state.errors.startdate}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Rental period</label>
                      <Select
                        name="rentalperiod"
                        options={rentalPeriodOptions}
                        onChange={(e) => this.handleChange(e, 'rentalperiod')}
                      />
                      {this.state.errors.rentalperiod && <small className="help is-danger">{this.state.errors.rentalperiod}</small>}
                    </div>








                  </div>
                  <div className="column">

                    <br />

                    <div className="has-text-centered">
                      <button className="submit">Submit</button>
                    </div>
                  </div>

                </form>
                <section>
                  <h3 className="subtitle has-text-centered">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </h3>
                </section>
              </div>


            </div>
          </div>
        </section>

      </div>
    )
  }
}

export default NewAgreement

import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

class Contacts extends React.Component{

  constructor() {
    super()
    this.state = {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.formData)
    // TODO: make a POST request to /api/send with the formData
    axios.post('/api/send', this.state.formData)
      .then(() => {
        toast.success('Thanks for contacting us, your message has been sent')
        this.setState({ formData: { name: '', email: '', message: '' } })
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    // TODO: hook up the handleChange to the input fields as usual
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  render() {

    return(

      <div>
        <section className="hero is-fullheight is-black">
        </section>
        <section>
          <div className="container">
            <h1 className="title has-text-centered has-text-danger">Contact Us</h1>
            <h2 className="subtitle has-text-centered has-text-danger">or give Us a feedback</h2>

            <hr/>



            <div className="columns is-centered">



              <div className="column is-one-quarter">
              </div>

              <div className="column">
                <form id="contact-form" onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input" name="name" placeholder="eg: Donald" onChange={this.handleChange}
                        value={this.state.formData.name}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email address</label>
                    <div className="control">
                      <input className="input" type="email" name="email" placeholder="eg: donaldduck@ducksworld.com" onChange={this.handleChange}
                        value={this.state.formData.email}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                      <textarea className="textarea" name="message" placeholder="e.g. Hello ducks" onChange={this.handleChange}
                        value={this.state.formData.message}
                      ></textarea>
                    </div>
                  </div>
                  <button className="submiticon"><FontAwesomeIcon icon={faEnvelope} /></button>
                </form>
              </div>


              <div className="column is-one-quarter">
              </div>


            </div>
          </div>
        </section>
      </div>








    )
  }

}

export default Contacts

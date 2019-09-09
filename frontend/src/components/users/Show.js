import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class ShowUser extends React.Component {

  constructor() {
    super()

    this.state = {
      user: {}
    }

  }

  componentDidMount() {
    axios.get('/api/profile/', {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ user: res.data }))
  }


  render() {
    console.log(this.state)
    return(
      <div>
        <section className="hero is-fullheight is-black">
        </section>
        <section>
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <div className="box is-warning">

                <div className="box">

                  <div className="content">
                    <h2>{this.state.user.username}</h2>

                    <p>Email: {this.state.user.email}</p>
                    <p>RentalAgreement: {this.state.user.rental_agreements}</p>
                    <p>MailBox: {this.state.user.mailbox}</p>
                    <p>RentalPeriod: {this.state.user.rental_period}</p>
                    <p>Confirmed: {this.state.user.confirmed}</p>

                    <br />

                    {<div className="buttons">
                      <Link
                        className="button"
                        to={`/profiles/${this.state.user._id}/edit`}
                      >Edit</Link>
                    </div> }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

}

export default ShowUser

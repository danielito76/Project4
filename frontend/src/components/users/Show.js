import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class ShowUser extends React.Component {

  constructor() {
    super()

    this.state = {
      user: null
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
    if (!this.state.user) return <h1>Loading...</h1>
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
                    <p>RentalAgreements: {this.state.user.rental_agreements.map(agreement =>
                      <ul key={agreement.id}>
                        <li>Mailbox number: {agreement.mailbox}</li>
                        <li>Rental period: {agreement.rentalperiod}</li>
                        <li>Confirmed: {agreement.confirmed ? 'YES' : 'NO'} </li>
                      </ul>
                    )}</p>

                    <p>Mail: {this.state.user.mail.map(mail =>
                      <ul key={mail.id}>
                        <li>Mail description: {mail.description}</li>
                        <li>Tracking number: {mail.trackingnumber}</li>
                        <li>Description: {mail.description}</li>
                        <li>Collected: {mail.collected ? 'YES' : 'NO'} </li>
                      </ul>
                    )}</p>

                    <br />

                    {<div className="buttons">
                      <Link
                        className="button"
                        to={'/profile/edit/'}
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

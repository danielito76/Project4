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

  componentDidUpdate(prevProps) {
    if(prevProps.profile !== this.props.profile) {
      this.getProfileData()
    }
  }


  render() {
    console.log(this.state)
    if (!this.state.user) return <h1>Loading...</h1>
    console.log(this)
    return(
      <div>
        <section className="hero_light">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third is-centered">
                <img width="400" src="http://mberezzatomanerba.it/wp-content/uploads/2016/04/MBE-Logo-Vertical_Negativo-Convertito.png"/>
              </div>
              <div className="column is-one-third">
                <h1 className="title has-text-centered has-text-danger"> Personal <br /> profile</h1>
              </div>
              <div className="column is-one-third">
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="columns is-centered">



            <div className="column is-one-third">
              <div className="box">
                <div className="content">
                  <h3 className="subtitle">Personal details</h3>
                  <h3>Username: {this.state.user.username}</h3>
                  <p>Email: {this.state.user.email}</p>
                </div>
                <hr/>
                {<div className="buttons">
                  <Link
                    className="button"
                    to={'/profile/edit/'}
                  >Edit</Link>
                </div> }
              </div>
            </div>



            <div className="column is-one-third">
              <div className="box">
                <div className="content">
                  <h3 className="subtitle">Rental agreements</h3>
                  <div>{this.state.user.rental_agreements.map(agreement =>
                    <ul key={agreement.id}>
                      <h4>Mailbox number: {agreement.mailbox.number}</h4>
                      <li>Start date: {agreement.startdate}</li>
                      <li>Rental period: {agreement.rentalperiod}</li>
                      <li>Confirmed: {agreement.confirmed ? 'YES' : 'NO'} </li>
                    </ul>
                  )}</div>
                  <hr/>
                  {<div className="buttons">
                    <Link
                      className="button"
                      to={'/new_agreement/'}
                    >Make a new agreement</Link>
                  </div> }
                </div>
              </div>
            </div>


            <div className="column is-one-third">
              <div className="box">
                <div className="content">
                  <h3 className="subtitle">Mail received</h3>
                  <hr/>
                  <div>{this.state.user.mail.map(mail =>
                    <ul key={mail.id}>
                      <h4>Mailbox number: {mail.mailbox}</h4>
                      <li>Mail description: {mail.description}</li>
                      <li>Tracking number: {mail.trackingnumber}</li>
                      <li>Color: {mail.color}</li>
                      <li>Collected: {mail.collected ? 'YES' : 'NO'} </li>
                    </ul>
                  )}</div>
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

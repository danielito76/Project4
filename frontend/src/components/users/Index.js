import React from 'react'
import RentalAgreementCard from './RentalAgreementCard'
import axios from 'axios'

class Index extends React.Component{

  constructor() {
    super()

    this.state = {
      rental_agreements: []
    }
  }

  componentDidMount() {
    axios.get('/api/rental_agreements/')
      .then(res => {
        this.setState({ rental_agreements: res.data })
      })
  }



  render() {
    console.log(this.state.rental_agreements)
    if(this.state.rental_agreements.length === 0) return <h2>Loading...</h2>
    console.log(this.state.rental_agreements)
    return (
      <div>
        <section className="hero is-fullheight is-black">
        </section>
        <div className="container has-text-centered">
          <h1 className="title has-text-centered has-text-danger">List of rental agreements</h1>
        </div>
        <div>
          {this.state.rental_agreements.map(rentalagreement =>
            <RentalAgreementCard
              key={rentalagreement.mailbox}
              startdate={rentalagreement.startdate}
              rentalperiod={rentalagreement.rentalperiod}
              confirmed={rentalagreement.confirmed}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Index

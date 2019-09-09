import React from 'react'

const RentalAgreementCard = ({ mailbox, startdate, rentalperiod, confirmed }) => {
  return(
    <div className="card">

      <div className="card-content">

        <div className="columns is-multiline">

          <div className="column">
            <p className="title is-5">{mailbox}</p>
          </div>

        </div>

        <p className="text is-8">Startdate:  {startdate}</p>
        <hr/>
        <p className="text is-8">Rentalperiod:  {rentalperiod}</p>
        <hr/>
        <p className="text is-8">Confirmed:  {confirmed ? 'YES' : 'NO'}</p>

      </div>

    </div>
  )
}

export default RentalAgreementCard

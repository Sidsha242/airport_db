
import React from 'react'
import './TicketCard.scss'
const TicketCard = () => {
  return (
    <>
	<div class="container">

<div class="ticket basic">
    <p>Admit One</p>
</div>

<div className="ticket airline">
    <div className="top font-bold">
        <h1>Boarding Pass</h1>
        <div className="big">
            <p className="from">BWI</p>
            <p className="to"><i class="fas fa-arrow-right"></i> SAN</p>
        </div>
        <div className="top--side">
            <i className="fas fa-plane"></i>
            <p>Baltimore</p>
            <p>San Diego</p>
        </div>
    </div>
    <div className="bottom">
        <div className="column">
            <div className="row row-1">
                <p><span>Flight ID</span>AA2005</p>
                <p className="row--center"><span>Departure Date</span>23-04-2023</p>
                <p className="row--right"><span>Arrival Date</span>24-04-2023</p>
            </div>
            <div className="row row-2">
                <p><span>Airlines</span>Emirates</p>
                <p className="row--center"><span>Departs</span>11:00 AM</p>
                <p className="row--right"><span>Arrives</span>1:05 PM</p>
            </div>
            <div className="row row-3">
                <p><span>Passenger</span>Ram Anand</p>
                <p><span>Age</span>25</p>
            </div>
            <div className="row row-4">
                <p><span>Class</span>Economy</p>
                <p><span>Category</span>General</p>
            </div>
        </div>
    </div>
    <button type="submit" className="h-12 px-6 mt-3 text-lg bg-black text-white rounded-lg hover:bg-sky-700 font-bold">Cancel Ticket</button>

</div>

</div>
    </>
  )
}

export default TicketCard
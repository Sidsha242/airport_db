
    import React from 'react'
    import './TicketCard.scss'
    import Axios from 'axios';
    import { useState } from 'react';

    const TicketCard = (props) => {

        const [ticketstatus, setTicketstatus] = useState('');

    const CancelTicket = () => {
        console.log("Canceling Ticket");
        Axios.delete(`http://localhost:3001/api/cancelticket/${props.ticket_id}`, {

        }).then((response) => {
            console.log(response);
                window.location.href = '/dashboard';
        })

    }

    return (
        
    <>
    <div class="container mt-10">

    <div class="ticket basic">
    <p>Admit One</p>
    </div>

    <div className="ticket airline">
    <div className="top font-bold">
    <h1>Boarding Pass</h1>

    <div className="big">
        <p className="from">{props.dep_cd}</p>
        <p className="to"><i class="fas fa-arrow-right"></i> {props.arr_cd}</p>
    </div>
    <div className="top--side">
        <p>{props.dep_city}</p>
        <p>{props.arr_city}</p>
    </div>
    </div>
    <div className="bottom">
    <div className="column ">
        <div className='row row-1'>
                <h2>Ticket Id: {props.ticket_id}</h2>
        </div>
        <div className="row row-1">
            <p><span>Flight ID</span>{props.flight_id}</p>
            <p className="row--center"><span>Departure Date</span>{props.dep_date}</p>
            <p className="row--right"><span>Arrival Date</span>{props.arr_date}</p>
        </div>
        <div className="row row-2">
            <p><span>Airlines</span>{props.airline}</p>
            <p className="row--center"><span>Departs</span>{props.dep_time}</p>
            <p className="row--right"><span>Arrives</span>{props.arr_time}</p>
        </div>
        <div className="row row-3">
            <p><span>User Id</span>{props.user_id}</p>
        </div>
        <div className="row row-4">
            <p><span>Class</span>Economy</p>
            <p><span>Category</span>General</p>
        </div>
    </div>
    </div>
    <button type="submit" className="h-12 px-6 mt-3 text-lg bg-black text-white rounded-lg hover:bg-sky-700 font-bold mb-4" onClick={() => CancelTicket()}>Cancel Ticket</button>
    <div>{ticketstatus}</div>
    </div>

    </div>
    </>
    )
    }

    export default TicketCard
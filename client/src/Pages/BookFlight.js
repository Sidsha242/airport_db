
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useState ,useEffect } from 'react';
import Axios from 'axios';


const BookFlight = () => {

    const [username, setUsername] = useState('');
    const [confirmmessage, setconfirmmessage] = useState('');

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        console.log(items.result.rows[0][1]);
        if (items === null) {
          setUsername(null);
         }
         else {
           setUsername(items.result.rows[0][1]);
          }
    }, []);


    const Book = () => {
        Axios.post('http://localhost:3001/api/bookticket', {
              
            flight_id:propsData.flight_id,
            user_id: items.result.rows[0][0],
            ticket_fare_amount : total,

         }).then((response) => {
            console.log("Booked");
            console.log(response);
            setconfirmmessage(response.data);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000)
         })

    };

    
    const items = JSON.parse(localStorage.getItem('user'));
    console.log(items.result.rows[0][0]);
    const location = useLocation();
    const propsData = location.state;
    const total = propsData.base_price;
    console.log(propsData);
    return (
        <>
        <div className='bg-[#97DEFF] h-screen pt-10'>
            <div className='grid grid-cols-2 p-5'>
            <div className='container-flight bg-white pb-20 pl-5 pt-5 rounded-md mt-6 mb-6 ml-5 mr-5 font-bold'>
                Flight Details: <br />
                Airlines: {propsData.airline}<br/>
                <div className='grid grid-cols-2'>
                    <div>
                    Departure Time: {propsData.dep_hour}:{propsData.dep_min}
                    </div>
                    <div>
                    Arrival Time: {propsData.arr_hour}:{propsData.arr_min}
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <div>
                    Departure Date: {propsData.dep_date}
                    </div>
                    <div>
                    Arrival Date: {propsData.arr_date}<br/>
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <div>
                    Departure: {propsData.dep_code}
                    </div>
                    <div>
                    Arrival: {propsData.arr_code}<br/>
                    </div>
                </div>
                <div>
                    Available Seat Class:
                </div>
                <hr style={{marginTop: "8px",background: "#000000", height: "3px",border: "none",}}/>
                <div className='mt-6'>
                    User Info
                </div>
                <div>
                        User Id : {items.result.rows[0][0]}
                </div>
                <div>
                        User Name : {items.result.rows[0][1]}
                </div>
            </div>
            <div className='container-book pb-20 rounded-md bg-white mt-6 ml-5 mr-5'>
                <div className='grid grid-cols-2 p-5'>
                <div className='text-2xl text-black-800 font-bold pt-5 pl-10 pr-10'>
                    <div className='mt-6'>
                        Base Price : 
                    </div>
                    <div className='mt-4'>
                        Class Charge :
                    </div>
                    <div className='mt-4'>
                        Category Discount :
                    </div>
                </div>
                <div className='text-2xl text-black-800 font-bold pt-5 pl-10 pr-10'>
                <div className='mt-6'>
                             ₹{propsData.base_price}
                    </div>
                    <div className='mt-4'>
                    ₹50
                    </div>
                    <div className='mt-4'>
                        -₹20
                    </div>
                </div>
            </div>
            <hr
                 style={{
                    marginTop: "8px",
                    background: "#000000",
                    height: "3px",
                    border: "none",
                    }}
                    />
                    <div className='text-2xl text-black-800 font-bold pt-5 pl-10 pr-10'>
                    Total : ₹{total}
                    </div>
            <button type="submit" className="text-center ml-48 h-12 px-6 mt-3 text-lg bg-green-400 text-white rounded-lg hover:bg-sky-700 font-bold" onClick={() =>Book()} >Book Flight</button>
            <div className='font-bold text-2xl text-center mt-3'>
                {confirmmessage}
            </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default BookFlight
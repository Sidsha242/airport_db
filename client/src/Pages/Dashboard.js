import { useState, useEffect } from 'react';
import React from 'react'
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import img3 from "../Images/avatar-icon1.png";
import BusinessCard from '../Components/BusinessCard';
import TicketCard from '../Components/TicketCard';

const DashBoard = () => {

    const [username, setUsername] = useState('');

    const disp = false;

    function Logout() {
        window.localStorage.clear();
        setTimeout(() => {
            window.location.href = '/';
        }, 1000)

    }

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


    if (username == null) {
        return <UserLog />;
    }
    else {
        return <Dash />;
    }

    function UserLog() {
        return (
            <div className='bg-[#97DEFF] h-screen text-center'>
                <p className='text-3xl text-black-800 font-bold pt-20'>Please Login</p>
                < Link to="/login" >
                    <button class=" bg-[#0284c7] mt-10 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">
                        Log In
                    </button>
                </Link >
            </div>
        );
    }



    function Dash() {

        const [ticket_arr, set_ticket_arr] = useState([]);

        // useEffect(() => {

        //     console.log("inside useffect");

        //     Axios.get(`http://localhost:3001/api/dashinfo/${username}`, {
        //     }).then((response) => {
        //         console.log("response received");
        //         set_bus_arr(response.data);
        //         console.log(response.data);

        //     });

        // }, []);

        return (<>
            <div className='bg-[#97DEFF] h-full  pt-10 pb-20 pr-20'>
                <div className='log-out pl-10'>
                    <button class=" bg-black hover:bg-red-200 text-white font-bold py-2 px-4 rounded" onClick={() => Logout()}>
                        Log Out
                    </button>
                </div>
                <div className='flex justify-center'>
                    <img
                        src={img3}
                        className="rounded-full w-32 mr-5"
                        alt="Avatar"
                    />
                    <p className="text-6xl text-black-800 font-bold mt-6">Hi {username}!</p>
                </div>
                <div className='text-4xl text-black-800 font-bold mt-6 pl-10'>
                    My Tickets
                </div>
                <div className='add-busin pl-10 mt-6'>
                    < Link to="/newpas" >
                        <button class=" bg-sky-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">
                            + Add Passenger
                        </button>
                    </Link >
                </div>
                
                <div className='mt-8'>
                <TicketCard />
                </div>
                
                {ticket_arr.map((id) => (
                    <BusinessCard key={id.id_business} bus_nam={id.bus_nam} desc={id.descrip} price={id.price} />
                ))}
            </div>
        </>
        );
    }

}

export default DashBoard
import { useState, useEffect } from 'react';
import React from 'react'
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import img3 from "../Images/avatar-icon1.png";
import TicketCard from '../Components/TicketCard';

const DashBoard = () => {

    const [username, setUsername] = useState('');

    const [userid,setuserId] = useState('');  //needed to display tickets

    const disp = false;

    function Logout() {
        window.localStorage.clear();
        setTimeout(() => {
            window.location.href = '/';
        }, 1000)

    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        //console.log(items.result.rows[0][1]);  ..will show error if uncomment
        if (items === null) {
          setUsername(null);
         }
         else {
           setUsername(items.result.rows[0][1]);
           setuserId(items.result.rows[0][0]);
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
       

        useEffect(() => {

            // console.log("inside useffect");

            Axios.get(`http://localhost:3001/api/dashinfo/${userid}`, {
             }).then((response) => {
               console.log("response received");
               console.log(response.data);
               set_ticket_arr(response.data.rows);
                
            });

         }, []);
        

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

                <div className='mt-5 pb-5 flex'>

                {(() => {
                  if(ticket_arr.length == 0) {
                    return <NoTicket/>
                     }
                 })()}

                  {ticket_arr.map((id) => (
                            <TicketCard ticket_id={id[0]} seat_class={id[1]} flight_id={id[2]} arr_date={id[3]} dep_date={id[4]} dep_time={id[5]} arr_time={id[6]} airline={id[7]} dep_cd={id[8]} arr_cd={id[9]} dep_city={id[10]} arr_city={id[11]} passenger_id={id[14]} passenger_firstname={id[15]} passenger_lastname={id[16]}/>
                        ))}
               
                </div>
            </div>
        </>
        );}
    }
function NoTicket() {
return(
    <div className='font-bold mx-auto text-2xl text-center  bg-[#97DEFF]'>
            No Tickets booked
    </div>
)

}

export default DashBoard
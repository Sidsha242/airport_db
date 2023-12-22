
import React from 'react'
import Axios from 'axios';
import { useState,useEffect } from 'react';

const Admin = () => {

    const [cancelticket_arr, set_cancelticket_arr] = useState([]);

    useEffect(() => {

        //console.log("inside useffect");

       Axios.get(`http://localhost:3001/api/admin/getcancel`, {
        }).then((response) => {
          console.log("response received");
          console.log(response.data.rows);
          set_cancelticket_arr(response.data.rows);
           
       });

    }, []);

  return (
    <div className='bg-[#97DEFF] h-screen pt-10'>
        <div className='ml-5 mt-5'>
        <div className='font-bold text-5xl'>
            Admin Info
        </div>
        <div className='font-bold text-xl mt-6'>
            Cancelled tickets
        </div>
        <div>
        <div class="relative overflow-x-auto mr-10 mt-5">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Ticket Id
                </th>
                <th scope="col" class="px-6 py-3">
                Flight Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Passenger Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Ticket Amount
                </th>
                <th scope="col" class="px-6 py-3">
                   Time of Deletion
                </th>
            </tr>
        </thead>
        
        {cancelticket_arr.map((id) => (
                    <Table key={id[0]} ticket_id={id[0]} flight_id={id[1]} passenger_id={id[2]} ticket_amount={id[3]} time_stamp={id[4]} />
                ))}

      
     </table>
    </div>
        </div>
        </div>
    </div>
  )

  function Table(props){
    return(
     <>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {props.ticket_id}
                </th>
                <td class="px-6 py-4">
                    {props.flight_id}
                </td>
                <td class="px-6 py-4">
                  {props.passenger_id}
                </td>
                <td class="px-6 py-4">
                    {props.ticket_amount}
                </td>
                <td class="px-6 py-4">
                    {props.time_stamp}
                </td>
            </tr>
         </tbody>
     </>
    )
  }
}

export default Admin

        import React from 'react';
        import { Link, useLocation } from "react-router-dom";
        import { useState ,useEffect } from 'react';
        import Axios from 'axios';

        const BookFlight = () => {

        const items = JSON.parse(localStorage.getItem('user'));
        if(items === null)
        {
          window.location.href = '/login';
        }

        const [confirmmessage, setconfirmmessage] = useState('');
        const [seatClass, setseatClass] = useState('');
        const [seatPrice, setseatPrice] = useState('');
        const [firstname,setfirstname] = useState('');
        const [lastname,setlastname] = useState('');
        const [discount,setdiscount] = useState('');
        const [pasid,setpasid] = useState('');

        

        const userid = items.result.rows[0][0];

        const [pas_arr,set_pas_arr] = useState([]);

        useEffect(() => {

            console.log("inside useffect");
            const userid = items.result.rows[0][0];
            Axios.get(`http://localhost:3001/api/bookticket/${userid}`, {
           }).then((response) => {
                console.log("response received");
                console.log(response.data.rows);
                set_pas_arr(response.data.rows);
           });
   
        },[]);






        const Book = () => {

            Axios.post('http://localhost:3001/api/bookticket', {
                    
                flight_id:propsData.flight_id,
                passenger_id: pasid,
                ticket_fare_amount : total,
                seat_class : seatClass

                }).then((response) => {
                console.log("Booked");
                console.log(response);
                setconfirmmessage(response.data);
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000)
                })

        };
       
        console.log(items.result.rows[0][0]);
        const location = useLocation();
        const propsData = location.state;
        const base= parseInt(propsData.base_price);
        const intdiscount = parseInt(discount);
        console.log(intdiscount);
        const disc_amount= (base + seatPrice)*intdiscount/100;
       
        const total = (base+seatPrice) - disc_amount;
        console.log(propsData);


        return (
            <>
            <div className='bg-[#97DEFF] h-full pt-10'>

                <div className='container-flight bg-white pb-20 pl-5 pt-5 rounded-md mt-6 mb-6 ml-5 mr-5 font-bold shadow border'>
                    <div className='m-5 text-rose-400 text-xl font-bold'>
                        Step 1 : Select Passenger
                    </div>
                <div className='text-xl'>Passengers Added: < Link to="/newpas" >
                        <button class=" bg-sky-500 ml-5 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">
                            + Add Passenger
                        </button>
                    </Link ></div>
                    {pas_arr.map((id) => (
                    <PassengerCard firstname={id[0]} lastname={id[1]} discount={id[2]} pasid={id[3]} />
                ))}
                 <div className='mt-5 text-xl'>
                    Selected Passenger: {firstname} {lastname}
                </div>
                </div>
               
                <div className='grid grid-cols-2 p-5'>
                <div className='container-flight bg-white pb-20 pl-5 pt-5 rounded-md mt-6 mb-6 ml-5 mr-5 font-bold shadow border'>
                    Flight Details: <br />
                    Airlines: {propsData.airline}<br/>
                    <div className='grid grid-cols-2'>
                        <div>
                        Departure Time: {propsData.dep_time}
                        </div>
                        <div>
                        Arrival Time: {propsData.arr_time}
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
                    <div className='mt-6'>
                        Available Seat Class:
                    </div>
                    <div className='m-5 text-rose-400 text-xl font-bold'>
                        Step 2 : Select Seat Class
                    </div>
                    <div className='mt-5'>
                        <SeatClassTable />
                    </div>
                    <div className=''>
                        Selected Seat Class : {seatClass}
                    </div>
                    <hr style={{marginTop: "8px",background: "#000000", height: "3px",border: "none",}}/>
                    <div className='mt-6'>
                        User Info:
                    </div>
                    <div>
                            User Id : {items.result.rows[0][0]}
                    </div>
                    <div>
                            User Name : {items.result.rows[0][1]}
                    </div>
                    <div className='mt-5'>
                        Passengers Details:
                    </div>
                    <div className='mt-2'>
                         First Name : {firstname}
                    </div>
                    <div className='mt-2'>
                          Last Name : {lastname}
                    </div>
                    <div className='mt-2'>
                        Discount Percentage : {discount}% 
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
                                     ₹{seatPrice}
                        </div>
                        <div className='mt-4'>
                            -{discount}%
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

        function SeatClassTable() {

            const data = [
                {
                    "id": "1",
                    "seat_class" : "First Class",
                    "price" : 9000
                },
                {
                    "id": "2",
                    "seat_class" : "Business",
                    "price" : 2500
                },
                {
                    "id": "3",
                    "seat_class" : "Economy",
                    "price" : 0
                }
            ]

            function SelectClass(props) {
                console.log(props)
                setseatClass(props.seat_class);
                setseatPrice(props.price);
                

            }
            return(
            <>
                 <div className='font-bold mb-10 '>
                   <div className='row-head mt-4'>Seat Class<span className='ml-20'>Price</span></div>
                   <div>
                   {data.map(( id ) => (
                    <>
                     <div className='row-head mt-4'>{id.seat_class}<span className='ml-20'>₹{id.price}</span> <button type="button" class="text-white ml-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>SelectClass(id)}>Select</button></div>
                    
                     </>))}
                   </div>

                 </div>

            </>
        )}

        function PassengerCard(props){


            const SelectPas = () => {

                setfirstname(props.firstname);
                setlastname(props.lastname);
                setdiscount(props.discount);
                setpasid(props.pasid);
            }


            return(
                <div className='bg-cyan-500 rounded mr-10 mt-5'>
                    <div className='grid grid-cols-2'>
                     <div className='ml-10 text-2xl pt-5'>
                        {props.firstname} {props.lastname}
                     </div>
                     <div>
                     <button type="submit" className="text-center ml-48 mb-5 h-10 px-6 mt-3 text-lg bg-cyan-400 text-white rounded-lg hover:bg-sky-700 font-bold" onClick={() => SelectPas()} >Book For</button>
                     </div>
                     </div>
                   
                </div>
            )
        }


        }



        export default BookFlight
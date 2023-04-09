
import React from 'react'
import { Link } from 'react-router-dom';

const FlightCard = (props) => {
  console.log(props);
  const arr = props;
  return (
    <div>
        <div class="pb-5 pl-10 pr-10 ml-10 mr-10">
  <div className="w-128 bg-white flex flex-col rounded overflow-hidden shadow-lg">
    <div className="flex flex-row items-baseline flex-nowrap bg-gray-300 p-2">
      <div>
      <h1 className="ml-2 font-bold text-gray-500">DEPARTURE</h1>
      <p className="ml-2 font-normal text-gray-500">{props.dep_date}</p>
      </div>
      <div className='ml-auto mr-5'>
      <h1 className="ml-2 font-bold text-gray-500">ARRIVAL</h1>
      <p className="ml-2 font-normal text-gray-500">{props.arr_date}</p>
      </div>
    </div>
    <div className="mt-2 flex justify-start bg-white p-2">
    </div>
    <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
      <div className="flex flex-row place-items-center p-2">
        <div className="flex flex-col ml-2">
          <p className="text-lg text-gray-500 font-bold">{props.airline}</p>
          <p className="text-base text-gray-500">{props.flight_id}</p>
        </div>
      </div>

      <div className="flex flex-col p-2">
        <p className="font-bold text-4xl">{props.dep_hour}:{props.dep_min}</p>
        <p className="text-gray-500 text-1xl"><span class="font-bold">{props.dep_code}</span> {props.dep_city}</p>
        <p className="text-gray-500">{props.dep_country}</p>
      </div>
      <div className="flex flex-col flex-wrap p-2">
        <p className="font-bold text-4xl">{props.arr_hour}:{props.arr_min}</p>
        <p className="text-gray-500 text-1xl"><span className="font-bold">{props.arr_code}</span> {props.arr_city}</p>
        <p className="text-gray-500">{props.arr_country}</p>
      </div>
    </div>
    <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
      <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
        <Link to='/bookflight' state={arr}>
        <button className="w-32 h-11 rounded flex border-solid border text-white bg-green-800 mx-2 justify-center place-items-center">Book</button>
        </Link>
      </div>
      <div className='text-2xl ml-auto mr-10'>
            Seats available: {props.seat_avail}
        </div>
      
      <div className='font-bold text-4xl ml-auto mr-10'>
              ₹{props.base_price}
        </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default FlightCard
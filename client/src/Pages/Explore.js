import React from 'react'
import SearchBar from '../Components/SearchBar'
import data from '../data'
import { useState } from 'react'
import Axios from 'axios';
import { useEffect } from 'react'
import FlightCard from '../Components/FlightCard'

const Explore = () => {


    const [exp_arr, set_exp_arr] = useState([]);

    //set_exp_arr(data);

     useEffect(() => {

         console.log("inside useffect");

         Axios.get(`http://localhost:3001/api/exploreinfo`, {
        }).then((response) => {
            console.log(response.data.rows);
             console.log("response received");
             set_exp_arr(response.data.rows);
        });

     }, []);


    let [Filter, setFilter] = useState('');

    const displayedData = Filter ? exp_arr.filter(element => element[11].toLowerCase().includes(Filter.toLowerCase())) : exp_arr

    return (
        <div className='bg-[#97DEFF] h-full'>
            <div className='pt-12 pl-20 pr-20 ml-10'>
                <SearchBar setFilter={setFilter} />
            </div>
            <div className='ml-20 pt-10 pb-20 flex flex-wrap' >

                {displayedData.map((id) => (
                    <FlightCard state={id} key={id[0]} arr_date={id[2]} dep_date={id[1]} flight_id={id[0]} airline={id[8]} dep_code={id[9]} dep_city={id[11]} dep_country={id[13]} dep_hour={id[3]} dep_min={id[4]} arr_code={id[10]} arr_city={id[12]} arr_country={id[14]} arr_hour={id[5]} arr_min={id[6]} seat_avail={id[7]} base_price={id[15]}/>
                ))}

            </div>

        </div>
    )
}

export default Explore
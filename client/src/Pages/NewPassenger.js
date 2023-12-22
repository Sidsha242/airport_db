import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import "react-datepicker/dist/react-datepicker.css";

const NewPassenger = () =>  {

    const [userid,setuserId] = useState('');  //needed to display tickets


     useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
       
         if (items === null) {
           setuserId(null);
          }
         else {
            //setUsername(items.result.rows[0][1]);
            setuserId(items.result.rows[0][0]);
           }
     }, []);

    const [pasfirstname, setpasfirstname] = useState("");
    const [paslastname, setpaslastname] = useState("");
    const [dob, setdob] = useState(new Date());
    const [gender, setgender] = useState("");
    const [category, setcategory] = useState("");
  
    const handleSubmit = (e) => {
        e.preventDefault();                 //prevents refresh on submiting
        console.log('Form Submitted');
    }

    const NewPas = () => {
        //console.log("Inside function");
        console.log(category);
              Axios.post('http://localhost:3001/api/newpas', {
                  userid : userid,
                  pasfirstname: pasfirstname,                              //sending to backend
                  paslastname: paslastname,
                  dob: dob,
                  gender: gender,
                  pas_category: category,
    
              }).then((response) => {
                  setpasmessage(response.data);
                   setTimeout(() => {
                      window.location.href = '/dashboard';
                  }, 2000)
              })
    
          };
    

    const [pasMessage, setpasmessage] = useState("");


    return (<>
             <div className="newpas container-newpas bg-[#97DEFF] h-full p-6">
            <h1 className="text-3xl text-gray-700 font-bold mb-5">New Passenger</h1>
            <div className="border-4 border-blue-800 rounded-lg p-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='firstname' className='mr-1'>First Name:</label>
                    <input type="text" className="rounded-xl box-border h-11 w-80 pl-2 mt-2 ml-2" id="firstname" name="firstname" value={pasfirstname} onChange={(e) => setpasfirstname(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='lastname' className='mr-2'>Last Name</label>
                    <input type="text" className="rounded-xl box-border h-11 w-80 pl-2 mt-2 ml-2" id="lastname" name="lastname" value={paslastname} onChange={(e) => setpaslastname(e.target.value)} />
                </div>
                 <div className='mt-4'>
                <label htmlFor='category' className='mt-2'>Date of Birth:</label>
                <DatePicker selected={dob} onChange={(date) => setdob(date)} />
                </div>
                 <div className='mt-5'>
                <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                >
                <FormControlLabel value="F" control={<Radio />} label="Female" />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel value="O" control={<Radio />} label="Other" />
                </RadioGroup>
                </FormControl>
                </div>
                 <div className='mt-3'>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Category: </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setcategory(e.target.value)}
                        >
                         <MenuItem value={"GENERAL"}>General</MenuItem>
                         <MenuItem value={"ARMED_FORCES"}>Armed Forces</MenuItem>
                         <MenuItem value={"SR_CITIZEN"}>Senior Citizen</MenuItem>
                         <MenuItem value={"STUDENT"}>Student</MenuItem>
                    </Select>
                    </FormControl>
                </div>

                <button type="submit" className="h-12 px-6 mt-3 text-lg bg-green-400 text-white rounded-lg hover:bg-sky-700 font-bold" onClick={() => NewPas()}>+ Add</button>  
            </form>
            <p className="text-2xl text-black-600 font-bold mt-6">Status-{pasMessage}</p>

        </div>
        </div>

            </>
    )
}

export default NewPassenger
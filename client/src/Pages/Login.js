import React from 'react'
import Axios from 'axios';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');   //for login
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();

    const [loginStatus, setLoginstatus] = useState(false);
    const [role, setRole] = useState("")

    const [loginMessage, setLoginmessage] = useState('');

    Axios.defaults.withCredentials = true

    const login = () => {
        Axios.post('http://localhost:3001/api/login', {
            username: username,                              //sending to backend
            password: password,
        }).then((response) => {
            if (!response.data.auth) {
                setLoginstatus(false);
                setLoginmessage(response.data.message);
            }
            else {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log(response.data);
                setLoginstatus(true);
                setLoginmessage(response.data.message);
                Axios.get("http://localhost:3001/api/isUserAuth", {

                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                }).then((response) => {
                    console.log("Auth suc");
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 1000)
                });


            }
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();    //prevents refresh on submiting
    }

    return (
        <>
            <div className='bg-[#97DEFF] h-screen'>
                <div className="login text-center container mx-auto bg-[#97DEFF] rounded-xl shadow border p-6">
                    <h1 className="text-3xl text-gray-700 font-bold mb-5">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='username' className='mr-2 font-bold'>Username :</label>
                            <input type="text" className="rounded-xl box-border h-11 w-150 pl-2 mt-2" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='password' className='mr-2 font-bold'>Password :</label>
                            <input type="text" className="rounded-xl box-border h-11 w-150 pl-2 mt-2" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="h-12 px-6 mt-3 text-lg bg-black text-white rounded-lg hover:bg-sky-700 font-bold" onClick={login}>Login</button>
                    </form>

                    <p className="text-2xl text-black-600 font-bold mt-6">{loginMessage}</p>

                    <Link to="/register" className='font-bold'>Not Registered?</Link>
                </div>



                {/* {console.log(loginStatus)}
            {loginStatus && (
                <button onClick={userAuthenticated}
                    className="h-12 px-6 mt-3 text-lg bg-sky-500 rounded-lg hover:bg-sky-700">
                    Check If Auth
                </button>)} */}
            </div>
        </>
    )
}

export default Login
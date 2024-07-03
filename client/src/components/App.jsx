import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar.jsx";
import './app.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./authorization/Registration.jsx";
import Login from "./authorization/login.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user.js";
import Disk from "./disk/Disk.jsx";
import Profile from "./profile/Profile.jsx";
import Clientinfo from "./clientinfo/Clientinfo.jsx"



function App() {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }
    },[])

    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar />
                {!isAuth ?
                    <Routes>
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/login" element={< Login/>} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                    :
                    <Routes>
                        <Route exact path="/" element={<Disk/>} />
                        <Route exact path="/profile" element={<Profile/>} />
                        <Route exact path="/clientinfo" element={<Clientinfo/>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                }

            </div>
        </BrowserRouter>
    );
}

export default App;

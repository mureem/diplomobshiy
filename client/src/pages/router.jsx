import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "../components/authorization/Registration.jsx";
import Login from "../components/authorization/login.jsx";
import Disk from "../components/disk/Disk.jsx";
import Profile from "../components/profile/Profile.jsx";
import Clientinfo from "./ClientInfo/Clientinfo.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user.js";

const Router = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }
    },[])

    return (
        <>
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
        </>
    );
};

export default Router;
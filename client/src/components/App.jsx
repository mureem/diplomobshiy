import React from 'react';
import Navbar from "./navbar/Navbar.jsx";
import './app.css';
import { BrowserRouter,  } from "react-router-dom";
import Router from "../pages/router.jsx";

function App() {

    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar />
               <Router />
            </div>
        </BrowserRouter>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import './authorization.css';
import Input from '../../utils/input/Input.jsx';
import { registration } from '../../actions/user.js';
import ClientInfo from '../../components/clientinfo/Clientinfo.jsx';

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button type="button" className="authorization__btn" onClick={() => registration(email,password)}>Зарегестрироваться</button>
        </div>
    );
};

export default Registration;
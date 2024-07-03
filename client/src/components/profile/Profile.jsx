import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import './profile.css'; // Подключаем файл стилей для профиля
import avatarLogo from "../../assets/img/avatar-logo.svg";
import { API_URL } from "../../config.js";

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo;

    // Используем localStorage для сохранения информации
    const [about, setAbout] = useState(localStorage.getItem('about') || '');
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');

    useEffect(() => {
        // При изменении состояний about, phoneNumber сохраняем в localStorage
        localStorage.setItem('about', about);
        localStorage.setItem('phoneNumber', phoneNumber);
    }, [about, phoneNumber]);

    function changeHandler(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

    function saveProfileInfo() {
        // Здесь можно добавить логику для сохранения на сервере через Redux actions
        // Например, dispatch(saveProfile({ about, phoneNumber }));
    }

    return (
        <div className="profile">
            <h2 className="profile-heading">Профиль</h2>
            <div className="avatar-section">
                <div className="avatar-container">
                    <img className="profile__avatar" src={avatar} alt=""/>
                </div>
                <div className="avatar-actions">
                    <label htmlFor="upload-avatar" className="upload-btn">
                        Загрузить новый аватар
                        <input id="upload-avatar" accept="image/*" onChange={e => changeHandler(e)} type="file" style={{ display: 'none' }} />
                    </label>
                    <button className="delete-btn" onClick={() => dispatch(deleteAvatar())}>
                        Удалить текущий аватар
                    </button>
                </div>
            </div>

            <div className="profile-info">
                <textarea
                    className="about-input"
                    placeholder="О себе"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
                <input
                    className="phone-input"
                    type="tel"
                    placeholder="Номер телефона"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    className="email-input"
                    type="email"
                    placeholder="Почта"
                    value={currentUser.email} // Значение берется напрямую из currentUser
                    readOnly // Чтобы сделать поле только для чтения
                />
                <button className="save-btn" onClick={saveProfileInfo}>
                    Сохранить информацию
                </button>
            </div>
        </div>
    );
};

export default Profile;

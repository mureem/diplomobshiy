import axios from "axios";
import { setUser } from "../reducers/userReducer.js";
import { API_URL } from "../config.js";



// Действие для выполнения входа пользователя
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error("Ошибка входа:", error.message);
            alert("Ошибка входа: " + error.message); // Вывод ошибки, если запрос не удался
        }
    };
};

// Действие для регистрации пользователя
export const registration = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {
            email,
            password
        });
        alert(response.data.message); // Вывод сообщения об успешной регистрации
    } catch (error) {
        console.error("Ошибка регистрации:", error.message);
        alert("Ошибка регистрации: " + error.message); // Вывод ошибки, если запрос не удался
    }
};

// Проверка аутентификации пользователя
export const auth = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/auth', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error("Ошибка входа:", error.message);
            alert("Ошибка входа: " + error.message);
            localStorage.removeItem('token');
        }
    };
};

// Загрузка аватара
export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setUser(response.data));
        } catch (e) {
            console.error("Ошибка загрузки аватара:", e.message);
        }
    };
};

// Удаление аватара
export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setUser(response.data));
        } catch (e) {
            console.error("Ошибка удаления аватара:", e.message);
        }
    };
};

import axios from "axios";
import {API_URL} from "../config.js";

export const api = axios.create({
    baseURL: `${API_URL}api`,
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
});

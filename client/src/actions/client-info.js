import {hideLoader, showLoader} from "../reducers/appReducer.js";
import {API_URL} from "../config.js";
import axios from "axios";
import {setFiles} from "../reducers/fileReducer.js";
import {api} from "../utils/api.js";
import {setClientInfos} from "../reducers/clientInfoReducer.js";

export function getClientInfos( ) {
    return async dispatch => {
        try {
            dispatch(showLoader())

            const response = await api.get("/client-info");
            dispatch(setClientInfos(response.data))
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}
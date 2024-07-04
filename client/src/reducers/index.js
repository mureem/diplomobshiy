import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer.js";
import fileReducer from "./fileReducer.js";
import uploadReducer from "./uploadReducer.js";
import appReducer from "./appReducer.js"
import clientInfoReducer from "./clientInfoReducer.js";

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer,
    clientInfo: clientInfoReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const SET_CLIENT_INFOS = "SET_CLIENT_INFOS"


const defaultState = {
    clientInfos: [],
}

export default function clientInfoReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CLIENT_INFOS: return {...state, clientInfos: action.payload}
        default:
            return state
    }
}

export const setClientInfos = (clientInfos) => ({type: SET_CLIENT_INFOS, payload: clientInfos})

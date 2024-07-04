import React, {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getClientInfos} from "../../actions/client-info.js";
import BrowserChart from "../../components/BrowserChart/BrowserChart.jsx";


const ClientInfo = () => {
    const clientInfos = useSelector(state => state.clientInfo.clientInfos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClientInfos())
    }, [])
    console.log(clientInfos)
    // const data = useMemo(() =>  {
    //     console.log()
    //     return [
    //
    //     ]
    // },[clientInfos] )

    return (
        <div>
            <BrowserChart />

        </div>
    );
};

export default ClientInfo;
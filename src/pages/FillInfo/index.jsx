import style from './FillInfo.module.scss'
import { useLocation } from 'react-router-dom'

function FillInfo(){

    const location = useLocation();
    const infoReserve = location.state;
    console.log(infoReserve)


    return (
        <h1 className={style.h1}>{infoReserve.adults}</h1>

    )
}

export default FillInfo
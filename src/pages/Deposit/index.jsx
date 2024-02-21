import style from './Deposit.module.scss'
import { useLocation } from 'react-router-dom'

function Deposit(){

    const location = useLocation();
    const infoReserve = location.state;
    console.log(infoReserve)


    return (
        <h1>Deposit</h1>

    )
}

export default Deposit
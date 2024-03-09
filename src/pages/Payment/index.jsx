/* eslint-disable */
import style from './Payment.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';

function Payment() {
    const [reservation, setReservation] = useState({
        come: '',
        go: '',
        totalDays: '',
        paid: '',
        id: '',
        price: '',
        rooms: '',
        tax: '',
        total: ''
    })
    const location = useLocation();
    const infoReserve = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        if (!infoReserve) {
            navigate("/")
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/${infoReserve.reservation}`);
                if (response.data !== null)
                    setReservation(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const createOrder = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/reservation/create-paypal-order", {
                id: infoReserve.reservation,
                total: infoReserve.total,
            })
            if (response.data !== null) return response.data.id;

        } catch (error) {
            console.log(error)
        }
    }
    const onApprove = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/reservation/capture-paypal-order", {
                paymentId: data.orderID,
                total: infoReserve.total,
                id: infoReserve.reservation
            })
            if (response.data !== null) {
                toast.success("Thanks for using our service!")
                navigate('/')
            }
        }
        catch (error) {

        }
    }


    return (
        <div className={style.container}>
            <div className={style.totalValue}>
                <div className={style.header}>
                    <div>Rooms you have chosen:</div>
                    <div className={style.listRooms}>
                        {reservation.rooms}
                    </div>
                    <div className={style.times}>
                        You will come in 7am: {reservation.come} <br />
                        and leave in 7pm: {reservation.go}
                    </div>
                    <div className={style.totalDays}>
                        Total days: {reservation.totalDays}
                    </div>
                </div>
                <div className={style.body}>
                    <div className={style.prices}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Prices"
                            value={reservation.price}
                        />
                    </div>
                    <div className={style.tax}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Tax"
                            value={reservation.tax}
                        />
                    </div>
                    <div className={style.total}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Total"
                            value={reservation.total}
                        />
                    </div>
                </div>

            </div>
            <div className={style.info}>
                <PayPalScriptProvider options={{ clientId: "AWJN8uzl55bfKeR4Q2fjVDrpTnArGbmRoIqa-6fHRY-0QHzAfviY0c9lgbuDtogtUI__jdvvZ14Ptf-t" }}>
                    <PayPalButtons
                        style={{ layout: "horizontal" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    )
}

export default Payment;
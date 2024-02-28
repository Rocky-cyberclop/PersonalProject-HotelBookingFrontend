/* eslint-disable */
import style from './FillInfo.module.scss'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

function FillInfo() {

    const location = useLocation();
    const infoReserve = location.state; //let is just for testing must be reset to const after tested
    const navigate = useNavigate();
    useEffect(() => {
        if (!infoReserve) {
            navigate("/")
        }
    }, [])

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
    const [adult, setAdult] = useState({ name: '', email: '', phone: '' })
    const [helperText, setHelperText] = useState({ email: '', phone: '', name: '' })
    const [validInput, setValidInput] = useState({ email: false, phone: false, name: false })
    const [adults, setAdults] = useState([]);

    useEffect(() => {
        if (infoReserve && infoReserve.adults) {
            const initialAdultsState = Array.from({ length: infoReserve.adults - 1 }, () => ({
                name: '',
                phone: ''
            }));
            setAdults(initialAdultsState);
        }
    }, [infoReserve]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/${infoReserve.reservation}`);
                if (response.data !== null)
                    setReservation(response.data);
                fetchGuest()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchGuest = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/guests/${infoReserve.reservation}`);
                if (response.data !== null) {
                    const [customer, ...adults] = response.data
                    setAdult(customer)
                    setAdults(adults)
                    setAdult(pre => {
                        const { _id, ...remain } = pre
                        return remain
                    })
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleAdultInputChange = (property, value) => {
        setAdult({ ...adult, [property]: value });
    };

    const handleInputChange = (index, property, value) => {
        const newAdults = [...adults];
        newAdults[index] = { ...newAdults[index], [property]: value };
        setAdults(newAdults);
    };

    const handleSubmit = () => {
        const isAnyAdultPropertyBlank = Object.values(adult).some(value => {
            return value.trim() === ''
        });

        if (isAnyAdultPropertyBlank) {
            toast.error('Please fill out all the your informations section.')
            if (adult.name.trim() === '') setHelperText((pre) => ({ ...pre, name: 'Name can not be blank' }))
            if (adult.phone.trim() === '') { setHelperText((pre) => ({ ...pre, phone: 'Phone can not be blank' })) }
            if (adult.email.trim() === '') { setHelperText((pre) => ({ ...pre, email: 'Email can not be blank' })) }
            setValidInput({ name: false, email: false, phone: false })

        }
        else {
            setHelperText((pre) => ({ ...pre, name: '' }))
            setValidInput((pre) => ({ ...pre, name: true }))
            if (!isValidPhoneNumber(adult.phone)) {
                setValidInput((pre) => ({ ...pre, phone: false }))
            }
            else {
                setHelperText((pre) => ({ ...pre, phone: '' }))
                setValidInput((pre) => ({ ...pre, phone: true }))
            }
            if (!isValidEmail(adult.email)) {
                setValidInput((pre) => ({ ...pre, email: false }))
            }
            else {
                setHelperText((pre) => ({ ...pre, email: '' }))
                setValidInput((pre) => ({ ...pre, email: true }))
            }
        }
        setValidInput(pre => {
            if (pre.name && pre.phone && pre.email) {
                const submit = async () => {
                    try {
                        const response = await axios.post(`http://localhost:8080/api/reservation/${infoReserve.reservation}`,
                            [adult, ...adults]);
                        if (response.data !== null)
                            console.log(response.data);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };
                submit();
            }
            return pre
        })

    };

    const isValidEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        setHelperText((pre) => ({ ...pre, email: 'Email is not in right format' }))
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        setHelperText((pre) => ({ ...pre, phone: 'Phone is not in right format' }))
        return phoneRegex.test(phone);
    };


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
                <div className={style.header}>
                    Your reservation code is: {(infoReserve && infoReserve.reservation) || 'some string'}
                    <div className={style.content}>
                        You can complete the reserve progress now or later with this code in the My reservation function on the navbar<br />
                        We with hold your reservation for one hour from now<br />
                        Or enter your email and complete this step we will send you the reservation code
                    </div>
                </div>
                <div className={style.body}>
                    <div className={style.customer}>
                        <div className={style.customerHeader}>Your informations</div>
                        <TextField
                            className={style.formControl}
                            error={!(helperText.name === '')}
                            helperText={helperText.name}
                            id="outlined-error-helper-text"
                            variant="outlined"
                            label="Full name"
                            name='name'
                            value={adult.name}
                            onChange={(e) => handleAdultInputChange('name', e.target.value)}
                        />
                        <TextField
                            className={style.formControl}
                            error={!(helperText.phone === '')}
                            helperText={helperText.phone}
                            id="outlined-error-helper-text"
                            variant="outlined"
                            label="Phone number"
                            name='phone'
                            value={adult.phone}
                            onChange={(e) => handleAdultInputChange('phone', e.target.value)}
                        />
                        <TextField
                            className={style.formControl}
                            error={!(helperText.email === '')}
                            helperText={helperText.email}
                            id="outlined-error-helper-text"
                            variant="outlined"
                            label="Email"
                            name='email'
                            value={adult.email}
                            onChange={(e) => handleAdultInputChange('email', e.target.value)}
                        />
                    </div>
                    <div className={style.guests}>
                        <div className={style.guestHeader}>Your roomate's informations (Optional)</div>
                        {adults.map((adult, index) => (
                            <div key={index} className={style.guest}>
                                <TextField
                                    className={style.formControl}
                                    id="outlined-error-helper-text"
                                    variant="outlined"
                                    label="Full name"
                                    name='name'
                                    value={adult.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                />
                                <TextField
                                    className={style.formControl}
                                    id="outlined-error-helper-text"
                                    variant="outlined"
                                    label="Phone number"
                                    name='phone'
                                    value={adult.phone}
                                    onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.footer}>
                    <Button
                        style={{ backgroundColor: '#8B4513' }}
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={reservation.paid === "true"}
                    >
                        {((reservation.paid === "false") && "Final step: Deposit") || "Deposited"}
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default FillInfo
import style from './FindReservation.module.scss'
import Banner from '../../assets/images/banner.jpg'
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function FindReservation() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = () => {
        let isValid = true;

        if (formData.id.trim() === '') {
            toast.error('Reservation Id is required');
            isValid = false;
        }

        if (formData.email.trim() === '') {
            toast.error('Email is required');
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            toast.error('Invalid email format');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const submit = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/${formData.id}`);
                if (response.data !== null) {
                    if (response.data === '') {
                        toast.error("Your reservation is expired!")
                        return
                    }
                    navigate('/fillInfo', {
                        state: {
                            reservation: response.data.id,
                            adults: parseInt(response.data.adults)
                        }
                    })

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        submit();
    };

    return (
        <div className={style.container}>
            <div className={style.form}>
                <div className={style.title}>MY RESERVATION</div>
                <div className={style.description}>Want to change your infomations or
                    make payment with the existed reservation,... Please fill out form below:</div>
                <div className={style.formContainer}>
                    <div className={style.formElement}>
                        <TextField
                            className={style.formControl}
                            id="outlined-error-helper-text"
                            variant="outlined"
                            label="Reservation Id"
                            name='id'
                            value={formData.id}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={style.formElement}>
                        <TextField
                            className={style.formControl}
                            id="outlined-error-helper-text"
                            variant="outlined"
                            label="Email"
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={style.formElement}>
                        <Button
                            style={{ backgroundColor: '#195bbe' }}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Find
                        </Button>
                    </div>
                </div>
            </div>
            <div className={style.banner}>
                <img src={Banner} alt="" />
            </div>

        </div>
    )
}

export default FindReservation;
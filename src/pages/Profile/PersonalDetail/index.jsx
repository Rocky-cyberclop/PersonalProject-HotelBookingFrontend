import style from './PersonalDetail.module.scss'
import { TextField } from '@mui/material';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function PersonalDetail() {

    const token = localStorage.getItem('token')
    const [user, setUser] = useState({
        name: '',
        phone: '',
        address: '',
        nationality: '',
        gender: 'female',
        dateOfBirth: new dayjs()
    })
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/info`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (response.data !== null) {
                const parsedDate = dayjs(response.data.dateOfBirth);
                setUser({
                    ...response.data,
                    dateOfBirth: parsedDate
                })
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const edit = () => {
        setIsEdit(!isEdit)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleRadioChange = (event) => {
        setUser({ ...user, gender: event.target.value });
    };

    const handleDateChange = (date) => {
        setUser({ ...user, dateOfBirth:  dayjs(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ') });
    };

    const updateData = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/auth/info`,
                user,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
        } catch (error) {
            console.error('Error update data:', error);
        }
    };

    const handleSave = () => {
        console.log(user.dateOfBirth)
        updateData()
        setIsEdit(!isEdit)
    }

    const handleCancel = () => {
        fetchData()
        setIsEdit(!isEdit)
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.bold}>
                    Personal details
                </div>
                <div className={style.normal}>
                    Update your information and find out how it's used.
                </div>
            </div>
            <div className={style.body}>
                <div className={style.formElement}><TextField fullWidth name="name" label="Full Name" id="fullWidth" disabled={!isEdit} value={user.name} onChange={handleChange} /></div>
                <div className={style.formElement}><TextField fullWidth name="phone" label="Phone number" id="fullWidth" disabled={!isEdit} value={user.phone} onChange={handleChange} /></div>
                <div className={style.formElement}><TextField fullWidth name="address" label="Address" id="fullWidth" disabled={!isEdit} value={user.address} onChange={handleChange} /></div>
                <div className={style.formElement}><TextField fullWidth name="nationality" label="Nationality" id="fullWidth" disabled={!isEdit} value={user.nationality} onChange={handleChange} /></div>
                <div className={`${style.formElement} ${style.dateAndGener}`}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        value={user.gender}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="false" control={<Radio disabled={!isEdit} />} label="Female" />
                        <FormControlLabel value="true" control={<Radio disabled={!isEdit} />} label="Male" />
                    </RadioGroup>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label='Birthday' disabled={!isEdit} value={user.dateOfBirth} onChange={handleDateChange} />
                    </LocalizationProvider >
                </div>
            </div>
            <div className={style.footer}>
                {!isEdit && <button onClick={edit}>Edit</button>}
                {isEdit && <button onClick={handleSave}>Save</button>}
                {isEdit && <button onClick={handleCancel}>Cancel</button>}
            </div>
        </div>
    )
}

export default PersonalDetail;
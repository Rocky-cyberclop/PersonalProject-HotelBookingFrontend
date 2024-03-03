import style from './FillEmailForm.module.scss';
import { TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function FillEmailForm({ handleChangeForm, setEmailFromFillEmail }) {
    const [email, setEmail] = useState('')

    const handleInputChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSend = () => {
        if (email.trim().length === 0) {
            toast.error("Please fill out your email!")
            return;
        }
        const fetchEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/forget/sendCode/${email}`);
                console.log(response)
                if (response.data !== '') {
                    handleChangeForm()
                    setEmailFromFillEmail(email)
                    toast.success("Code sent to your email!")
                }
                else
                    toast.info("Your email is not exist!")
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchEmail();
    }

    return (
        <div className={style.container}>
            <div className={style.formLogin}>
                <div className={style.formHeader}>Fill out your email</div>
                <div className={style.formBody}>
                    <div>
                        <TextField
                            className={style.formControl}
                            id="outlined-error-helper-text-1"
                            label="Enter your email address"
                            variant="outlined"
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Button className={`${style.formControl}`}
                            style={{ backgroundColor: '#8B4513' }}
                            variant="contained"
                            onClick={handleSend}
                        >
                            Send code
                        </Button>
                    </div>
                </div>
                <div className={style.formFooter}>Or login with</div>
                <div className={style.formLoginWith}>
                    <div className={style.formLoginWithItem}><FontAwesomeIcon icon={faFacebook} size='xl' /></div>
                    <div className={style.formLoginWithItem}><FontAwesomeIcon icon={faEnvelope} size='xl' /></div>
                    <div className={style.formLoginWithItem}><FontAwesomeIcon icon={faInstagram} size='xl' /></div>
                </div>
                <div className={style.formPolicy}>
                    By signing in or creating an account,
                    you agree with our <span className={style.colorMain}>Terms &
                        conditions</span> and <span className={style.colorMain}>Privacy statement</span>
                </div>
                <div className={style.formCopyRight}>
                    All rights reserved.
                    Copyright 2024 - Rocky-Operation
                </div>

            </div>
        </div>
    )
}

export default FillEmailForm;
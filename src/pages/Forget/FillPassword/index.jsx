import style from './FillPassword.module.scss'
import { Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function FillPassword({ email }) {
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSend = () => {
        if (email.trim().length === 0) {
            toast.error("Please fill out your email!")
            return;
        }
        const fetchPassword = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/auth/login`,
                    {
                        email: email,
                        password: password
                    }
                );
                console.log(response)
                if (response.data !== '') {
                    localStorage.setItem('token', response.data)
                    toast.success("Login successfully!")
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchPassword();
    }


    return (
        <div className={style.container}>
            <div className={style.formLogin}>
                <div className={style.formHeader}>Fill out your new password in your email</div>
                <div className={style.formBody}>
                    <div>
                        <TextField
                            className={style.formControl}
                            id="outlined-error-helper-text-1"
                            label="Enter new password we provided in your email"
                            variant="outlined"
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Button className={`${style.formControl}`}
                            variant="contained"
                            onClick={handleSend}
                        >
                            Login
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

export default FillPassword;
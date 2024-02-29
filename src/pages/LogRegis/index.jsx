/* eslint-disable */
import style from './LogRegis.module.scss';
import { TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate();
    const emailRegex = /\S+@\S+\.\S+/;
    const [user, setUser] = useState({ email: '', password: '' })
    const [helperTextEmail, setHelperTextEmail] = useState('')
    const [helperTextPassword, setHelperTextPassword] = useState('')
    const [valid, setValid] = useState({ email: false, password: false })

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((pre) => ({ ...pre, [name]: value }))
        setHelperTextEmail('')
        setHelperTextPassword('')
    }

    const HandleValidEmail = () => {
        if (user.email === '') {
            setHelperTextEmail('Email can not be blank')
            setValid(pre => ({ ...pre, email: false }))
            return;
        }
        else if (!emailRegex.test(user.email)) {
            setHelperTextEmail('Email is not in right format')
            setValid(pre => ({ ...pre, email: false }))
        }
        else {
            setHelperTextEmail('')
            setValid(pre => ({ ...pre, email: true }))
        }
    }

    const HandleValidPassword = () => {
        if (user.password === '') {
            setHelperTextPassword('Password can not be blank')
            setValid(pre => ({ ...pre, password: false }))
        }
        else {
            setHelperTextPassword('')
            setValid(pre => ({ ...pre, password: true }))
        }
    }

    const HandleSubmit = () => {
        HandleValidEmail()
        HandleValidPassword()
        const login = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/auth/login`, user);
                if (response.data !== null) {
                    localStorage.setItem('token', response.data);
                    navigate('/')
                }
            } catch (error) {
                toast.info("Email or password are not correct!")
            }
        }
        setValid(pre => {
            if (pre.email === true && pre.password === true) {
                login()
            }
            return pre
        })
    }

    return (
        <div className={style.container}>
            <div className={style.formLogin}>
                <div className={style.formHeader}>Sign in or create an account</div>
                <div className={style.formBody}>
                    <div>
                        <TextField
                            className={style.formControl}
                            error={!(helperTextEmail === '')}
                            id="outlined-error-helper-text-1"
                            label="Enter your email address"
                            variant="outlined"
                            helperText={helperTextEmail}
                            name='email'
                            value={user.email}
                            onChange={HandleInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            className={style.formControl}
                            error={!(helperTextPassword === '')}
                            id="outlined-error-helper-text-2"
                            label="Enter your password"
                            helperText={helperTextPassword}
                            variant="outlined"
                            name='password'
                            type='password'
                            value={user.password}
                            onChange={HandleInputChange}
                        />
                    </div>
                    <div>
                        <Button className={`${style.formControl}`}
                            style={{ backgroundColor: '#8B4513' }}
                            variant="contained"
                            onClick={HandleSubmit}
                            disabled={!valid}
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
    );
}

function Register() {

    const navigate = useNavigate()
    const emailRegex = /\S+@\S+\.\S+/;
    const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' })
    const [helperText, setHelperText] = useState({ email: '', password: '', confirmPassword: '' })
    const [validInput, setValidInput] = useState({ email: false, password: false, confirmPassword: false })

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((pre) => {
            return ({ ...pre, [name]: value });
        })
        setHelperText((pre) => ({ ...pre, email: '' }))
        setHelperText((pre) => ({ ...pre, password: '' }))
        setHelperText((pre) => ({ ...pre, confirmPassword: '' }))
    }

    const HandleValidEmail = () => {
        if (user.email === '') {
            setHelperText((pre) => ({ ...pre, email: 'Email can not be blank' }))
            setValidInput((pre) => ({ ...pre, email: false }))
            return;
        }
        else if (!emailRegex.test(user.email)) {
            setHelperText((pre) => ({ ...pre, email: 'Email is not in right format' }))
            setValidInput((pre) => ({ ...pre, email: false }))
            return;
        }
        setHelperText((pre) => ({ ...pre, email: '' }))
        setValidInput((pre) => ({ ...pre, email: true }))
    }

    const HandleValidPassword = () => {
        if (user.password === '') {
            setHelperText((pre) => ({ ...pre, password: 'Password can not be blank' }))
            setValidInput((pre) => ({ ...pre, password: false }))
            return;
        }
        else if (user.password !== user.confirmPassword) {
            setHelperText((pre) => ({ ...pre, password: 'Password and confirm password does not match' }))
            setValidInput((pre) => ({ ...pre, password: false }))
            return;
        }
        else {
            setHelperText((pre) => ({ ...pre, password: '' }))
            setValidInput((pre) => ({ ...pre, password: true }))
        }
    }

    const HandleValidConfirmPassword = () => {
        if (user.confirmPassword === '') {
            setHelperText((pre) => ({ ...pre, confirmPassword: 'Confirm password can not be blank' }))
            setValidInput((pre) => ({ ...pre, confirmPassword: false }))
            return;
        }
        else if (user.password !== user.password) {
            setHelperText((pre) => ({ ...pre, confirmPassword: 'Password and confirm password does not match' }))
            setValidInput((pre) => ({ ...pre, confirmPassword: false }))
            return;
        }
        else {
            setHelperText((pre) => ({ ...pre, confirmPassword: '' }))
            setValidInput((pre) => ({ ...pre, confirmPassword: true }))
        }
    }

    const HandleSubmit = () => {
        HandleValidEmail()
        HandleValidPassword()
        HandleValidConfirmPassword()
        const registry = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/auth/register`, user);
                if (response.data !== null) {
                    toast.info("Registry successfully!")
                    navigate('/login')
                }
            } catch (error) {
                toast.info("This email is already existed!")
            }
        }
        setValidInput(pre => {
            if (pre.email === true && pre.password === true && pre.confirmPassword === true) registry()
            return pre
        })
    }

    return (
        <div className={style.container}>
            <div className={style.formLogin}>
                <div className={style.formHeader}>Create your account</div>
                <div className={style.formBody}>
                    <div>
                        <TextField
                            className={style.formControl}
                            error={!(helperText.email === '')}
                            id="outlined-error-helper-text-1"
                            label="Enter your email address"
                            variant="outlined"
                            helperText={helperText.email}
                            name='email'
                            value={user.email}
                            onChange={HandleInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            className={style.formControl}
                            error={!(helperText.password === '')}
                            id="outlined-error-helper-text-2"
                            label="Enter your password"
                            helperText={helperText.password}
                            variant="outlined"
                            name='password'
                            type='password'
                            value={user.password}
                            onChange={HandleInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            className={style.formControl}
                            error={!(helperText.confirmPassword === '')}
                            id="outlined-error-helper-text-3"
                            label="Confirm your password"
                            helperText={helperText.confirmPassword}
                            variant="outlined"
                            name='confirmPassword'
                            type='password'
                            value={user.confirmPassword}
                            onChange={HandleInputChange}
                        />
                    </div>
                    <div>
                        <Button className={`${style.formControl}`}
                            style={{ backgroundColor: '#8B4513' }}
                            variant="contained"
                            onClick={HandleSubmit}
                        >
                            Sign up
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
    );
}

export { Login, Register };
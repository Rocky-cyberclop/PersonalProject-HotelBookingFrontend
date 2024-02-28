/* eslint-disable */
import style from './LogRegis.module.scss';
import { TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

function Login() {

    const emailRegex = /\S+@\S+\.\S+/;
    const [user, setUser] = useState({ email: '', password: '' })
    const [helperTextEmail, setHelperTextEmail] = useState('')
    const [helperTextPassword, setHelperTextPassword] = useState('')
    const [valid, setValid] = useState(false)

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((pre) => ({ ...pre, [name]: value }))
    }

    const HandleValidEmail = () => {
        if (user.email === '') {
            setHelperTextEmail('Email can not be blank')
            setValid(false)
        }
        else if (!emailRegex.test(user.email)) {
            setHelperTextEmail('Email is not in right format')
            setValid(false)
        }
        else {
            setHelperTextEmail('')
            if (!user.password == '') setValid(true)
        }
    }

    const HandleValidPassword = () => {
        if (user.password === '') {
            setHelperTextPassword('Password can not be blank')
            setValid(false)
        }
        else {
            setHelperTextPassword('')
            if (!user.email == '' && helperTextEmail == '') setValid(true)
        }
        console.log(valid)
    }

    const HandleSubmit = () => {
        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).catch(err => { console.log(err); });
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
                            id="outlined-error-helper-text"
                            label="Enter your email address"
                            variant="outlined"
                            helperText={helperTextEmail}
                            name='email'
                            value={user.email}
                            onChange={HandleInputChange}
                            onBlur={HandleValidEmail}
                        />
                    </div>
                    <div>
                        <TextField
                            className={style.formControl}
                            error={!(helperTextPassword === '')}
                            id="outlined-error-helper-text"
                            label="Enter your password"
                            helperText={helperTextPassword}
                            variant="outlined"
                            name='password'
                            type='password'
                            value={user.password}
                            onChange={HandleInputChange}
                            onBlur={HandleValidPassword}
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

    const emailRegex = /\S+@\S+\.\S+/;
    const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' })
    const [helperText, setHelperText] = useState({ email: '', password: '', confirmPassword: '' })
    const [validInput, setValidInput] = useState({ email: false, password: false, confirmPassword: false })

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((pre) => {
            if(name==='email'){
                HandleValidEmail(value)
            }
            else if(name==='password'){
                HandleValidPassword(value)
            }
            else{
                HandleValidConfirmPassword(value)
            }
            return ({ ...pre, [name]: value });
        })
    }

    const HandleValidEmail = (value) => {
        if (value === '') {
            setHelperText((pre) => ({ ...pre, email: 'Email can not be blank' }))
            setValidInput((pre) => ({ ...pre, email: false }))
        }
        else if (!emailRegex.test(value)) {
            setHelperText((pre) => ({ ...pre, email: 'Email is not in right format' }))
            setValidInput((pre) => ({ ...pre, email: false }))
        }
        else {
            setHelperText((pre) => ({ ...pre, email: '' }))
            setValidInput((pre) => ({ ...pre, email: true }))
        }
    }

    const HandleValidPassword = (value) => {
        if (value === '') {
            setHelperText((pre) => ({ ...pre, password: 'Password can not be blank' }))
            setValidInput((pre) => ({ ...pre, password: false }))
        }
        else if (value != user.confirmPassword) {
            setHelperText((pre) => ({ ...pre, password: 'Password and confirm password does not match' }))
            setValidInput((pre) => ({ ...pre, password: false }))
        }
        else {
            setHelperText((pre) => ({ ...pre, password: '' }))
            setValidInput((pre) => ({ ...pre, password: true }))
            setHelperText((pre) => ({ ...pre, confirmPassword: '' }))
            setValidInput((pre) => ({ ...pre, confirmPassword: true }))
        }
    }

    const HandleValidConfirmPassword = (value) => {
        if (value === '') {
            setHelperText((pre) => ({ ...pre, confirmPassword: 'Confirm password can not be blank' }))
            setValidInput((pre) => ({ ...pre, confirmPassword: false }))
        }
        else if (user.password != value) {
            setHelperText((pre) => ({ ...pre, confirmPassword: 'Password and confirm password does not match' }))
            setValidInput((pre) => ({ ...pre, confirmPassword: false }))
        }
        else {
            setHelperText((pre) => ({ ...pre, password: '' }))
            setValidInput((pre) => ({ ...pre, password: true }))
            setHelperText((pre) => ({ ...pre, confirmPassword: '' }))
            setValidInput((pre) => ({ ...pre, confirmPassword: true }))
        }
    }

    const HandleSubmit = () => {
        fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).catch(err => { console.log(err); });
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
                            id="outlined-error-helper-text"
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
                            id="outlined-error-helper-text"
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
                            id="outlined-error-helper-text"
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
                            disabled={!(validInput.email&&validInput.password&&validInput)}
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
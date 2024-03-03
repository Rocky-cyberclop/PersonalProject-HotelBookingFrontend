/* eslint-disable */
import style from './ChangePassword.module.scss'
import { TextField } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function ChangePassword({ handleChangeFeature }) {

    const token = localStorage.getItem('token')
    const [user, setUser] = useState({ password: '', newPassword: '', confirmNewPasssword: '' })
    const [helperText, setHelperText] = useState({ password: '', newPassword: '', confirmNewPasssword: '' })
    const [validInput, setValidInput] = useState({ password: false, newPassword: false, confirmNewPasssword: false })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        setHelperText({ password: '', newPassword: '', confirmNewPasssword: '' })
    };

    const changePassword = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/reset`,
                user,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data == "Success")
            if (response.data === "Success") {
                toast.success("Changed your password!")
                handleChangeFeature(0)
            }
            else
                toast.info(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
            return;
        }
    };

    const handleSave = () => {
        if (user.password.trim() === '') {
            setHelperText(pre => ({ ...pre, password: 'You must enter the old password!' }))
            setValidInput(pre => ({ ...pre, password: false }))
        }
        if (user.newPassword.trim() === '') {
            setHelperText(pre => ({ ...pre, newPassword: 'New password can not be blank' }))
            setValidInput(pre => ({ ...pre, newPassword: false }))
        }
        if (user.confirmNewPasssword.trim() === '') {
            setHelperText(pre => ({ ...pre, confirmNewPasssword: 'Confirm new password can not be blank' }))
            setValidInput(pre => ({ ...pre, confirmNewPasssword: false }))
        }
        if (user.newPassword.trim() !== user.confirmNewPasssword.trim()) {
            setHelperText({
                password: '',
                newPassword: 'New password is not match Confirm new password',
                confirmNewPasssword: 'Confirm new password is not match new password'
            })
            setValidInput({ password: true, confirmNewPasssword: false, newPassword: false })
        }
        else {
            setValidInput({ password: true, confirmNewPasssword: true, newPassword: true })
        }

        setValidInput(pre => {
            if (pre.password === true && pre.newPassword === true &&
                pre.confirmNewPasssword === true) {

                changePassword();
            }

            return pre;
        })

    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.bold}>
                    Change your current password
                </div>
                <div className={style.normal}>
                    Beware and to not provide your password to anyone!
                </div>
            </div>
            <div className={style.body}>
                <div className={style.formElement}><TextField fullWidth
                    name="password"
                    type='password'
                    label="Your current password"
                    id="outlined-error-helper-text-1"
                    variant="outlined"
                    error={!(helperText.password === '')}
                    helperText={helperText.password}
                    value={user.password}
                    onChange={handleChange} /></div>
                <div className={style.formElement}><TextField fullWidth
                    name="newPassword"
                    type='password'
                    label="New password"
                    id="outlined-error-helper-text-2"
                    variant="outlined"
                    error={!(helperText.newPassword === '')}
                    helperText={helperText.newPassword}
                    value={user.newPassword}
                    onChange={handleChange} /></div>
                <div className={style.formElement}><TextField fullWidth
                    name="confirmNewPasssword"
                    type='password'
                    label="Confirm new password"
                    id="outlined-error-helper-text-3"
                    variant="outlined"
                    error={!(helperText.confirmNewPasssword === '')}
                    helperText={helperText.confirmNewPasssword}
                    value={user.confirmNewPasssword}
                    onChange={handleChange} /></div>

            </div>
            <div className={style.footer}>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default ChangePassword
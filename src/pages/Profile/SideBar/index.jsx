import { useState, useEffect } from 'react';
import style from './SideBar.module.scss'
import Guest from '../../../assets/images/guest.jpg'
import { faAddressCard, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SideBar({ handleChangeFeature }) {
    const [user, setUser] = useState({ name: '', email: '' });
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {
        const fetch = async () => {
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/auth/email`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.data !== null) {
                        setUser(response.data)
                    }
                } catch (error) {
                    // console.log('You had to login to get email');
                }
            }
        }
        fetch()
    }, [token])

    const handleLogout = function () {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.picture}><img className={style.pictureSrc} src={Guest} width={50} alt="" /></div>
                <div className={style.infor}>
                    <div className={style.name}>{user?.name?.split(' ').slice(-2).join(' ')}</div>
                    <div className={style.mail}>{user?.email}</div>
                </div>
            </div>
            <div className={style.body}>
                <div className={style.element} onClick={() => handleChangeFeature(0)}><FontAwesomeIcon className={style.icon} icon={faAddressCard} />Personal details</div>
                <div className={style.element} onClick={() => handleChangeFeature(1)}><FontAwesomeIcon className={style.icon} icon={faRectangleList} />My booking</div>
            </div>
            <div className={style.footer}>
                <div className={style.element}><FontAwesomeIcon className={style.icon} icon={faLockOpen} />Change password</div>
                <div className={style.element} onClick={handleLogout}>
                    <FontAwesomeIcon className={style.icon} icon={faRightFromBracket} />Logout
                </div>
            </div>
        </div>
    )
}

export default SideBar;
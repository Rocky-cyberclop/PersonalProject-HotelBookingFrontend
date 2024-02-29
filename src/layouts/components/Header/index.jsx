import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faPowerOff, faQuestionCircle, faTicket, faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import Logo from '../../../assets/images/logo.png';
import Guest from '../../../assets/images/guest.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Header() {
    const [user, setUser] = useState({});
    const [menuAccount, setMenuAccount] = useState(false);
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const buttonMenuRef = useRef(null);

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
                        setUser({ email: response.data.name })
                    }
                } catch (error) {
                    // console.log('You had to login to get email');
                }
            }
        }
        fetch()
    }, [token])


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                buttonMenuRef.current && !buttonMenuRef.current.contains(event.target)) {
                setMenuAccount(pre => {
                    return false
                });
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const HandleLogout = function () {
        localStorage.removeItem('token')
        setUser({})
        HandleMenuAccount()
        navigate('/')
    }

    const HandleProfile = () => {
        navigate("/profile")
        HandleMenuAccount()
    }

    const HandleLeaveComment = () => {
        HandleMenuAccount()
    }

    const HandleMenuAccount = () => {
        setMenuAccount(pre => {
            return !pre
        })
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.logo}><Link to={"/"}> <img src={Logo} width={50} alt="" /> </Link></h1>
                <div className={style.nav}>
                    <div className={style.navItemWrapper}>
                        <div className={style.navItem}>English<FontAwesomeIcon className={style.ml5} icon={faLanguage} /></div>
                        <Link className={style.navItem} to={"/findReservation"}><div>My Reservation<FontAwesomeIcon className={style.ml5} icon={faTicket} /></div></Link>
                        {!token && <Link to={"/login"}><div className={style.navItem}>Login</div></Link>}
                        {!token && <Link to={"/register"}><div className={style.navItem}>Register</div></Link>}
                        {token && <div className={style.navItem} ref={buttonMenuRef} onClick={HandleMenuAccount}>
                            <img className={style.user} src={Guest} alt="" height={30} width={30} />{user && user.email}
                        </div>}
                        {menuAccount &&
                            <div className={style.menu} ref={menuRef}>
                                <ul>
                                    <li id='1' onClick={HandleProfile}><FontAwesomeIcon icon={faUser} className={style.menuIcon} />Manage account</li>
                                    <li id='2' onClick={HandleLeaveComment}><FontAwesomeIcon icon={faComment} className={style.menuIcon} />Leave comments</li>
                                    <li id='3' onClick={HandleLogout}><FontAwesomeIcon icon={faPowerOff} className={style.menuIcon} />Sign out</li>
                                </ul>
                            </div>
                        }
                        <div className={style.navItem}><FontAwesomeIcon icon={faQuestionCircle} /></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Header;
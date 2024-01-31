import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faPowerOff, faQuestionCircle, faTicket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


function Header(){
    const [user, setUser] = useState({});
    const token = localStorage.getItem('token')

    const HandleLogout = function(){
        localStorage.removeItem('token')
        setUser({})
        console.log(user)
    }

    // This function is just for testing purpose
    // const HandleLogin = function(){
    //     localStorage.setItem('token','user')
    //     setUser({name:'rocky'})
        
    // }

    return(
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.logo}><Link to={"/"}>LOGO</Link></h1>
                <div className={style.nav}>
                    <div className={style.navItemWrapper}>
                        <div className={style.navItem}>English<FontAwesomeIcon className={style.ml5} icon={faLanguage}/></div>
                    </div>
                    <div className={style.navItemWrapper}>
                        <div className={style.navItem}>My Reservation<FontAwesomeIcon  className={style.ml5} icon={faTicket}/></div>
                    </div>
                    {!token && 
                    <div className={style.navItemWrapper}>
                        <Link to={"/login"}><div className={style.navItem}>Login</div></Link>
                        <Link to={"/register"}><div className={style.navItem}>Register</div></Link>
                        <div className={style.navItem}><FontAwesomeIcon icon={faQuestionCircle}/></div>
                    </div>
                    }
                    {token && 
                    <div className={style.navItemWrapper}>
                        <div className={style.navItem}><Link to={"/user"}><FontAwesomeIcon icon={faUser}/></Link></div>
                        <div className={style.navItem} onClick={HandleLogout}><FontAwesomeIcon icon={faPowerOff}/></div>
                    </div>
                    }
                </div>
            </div>

        </div>
    );
}

export default Header;
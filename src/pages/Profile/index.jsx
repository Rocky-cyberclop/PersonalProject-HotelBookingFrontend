import style from './Profile.module.scss'
import SideBar from './SideBar';
import PersonalDetail from './PersonalDetail';
import MyReservation from './MyReservation';
import ChangePassword from './ChangePassword';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [feature, setFeature] = useState(0)
    const handleChangeFeature = (feature) => {
        setFeature(feature)
    }

    useEffect(() => {
        const resetReservation = async () => {
            try {
                setTimeout(async () => {
                    const response = await axios.get('http://localhost:8080/api/reservation/doClean');
                }, 1500);
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        resetReservation()
    }, [])

    return (
        <div className={style.container}>
            <div className={style.sideBar}>
                <SideBar handleChangeFeature={handleChangeFeature}></SideBar>
            </div>
            <div className={style.content}>
                {feature === 0 && <PersonalDetail />}
                {feature === 1 && < MyReservation />}
                {feature === 2 && < ChangePassword handleChangeFeature={handleChangeFeature} />}

            </div>

        </div>
    )
}

export default Profile;
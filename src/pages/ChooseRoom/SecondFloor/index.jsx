import style from './SecondFloor.module.scss';
import { faElevator, faStairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Room } from '../../../components/Room';
import { useState } from 'react';

function SecondFloor({toggleRoomInfo}) {

    const [rooms, setRooms] = useState(
        [
            {
                capacity: 3,
                images: ['', ''],
                booked: false
            },
            {
                capacity: 2,
                images: ['', ''],
                booked: false
            },
            {
                capacity: 1,
                images: ['', ''],
                booked: false
            }, {
                capacity: 1,
                images: ['', ''],
                booked: false
            }, {
                capacity: 1,
                images: ['', ''],
                booked: true
            }, {
                capacity: 1,
                images: ['', ''],
                booked: true
            }, {
                capacity: 2,
                images: ['', ''],
                booked: false
            }
        ]
    )

    return (
        <>
            <h1>Second Floor</h1>
            <div className={style.container}>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[0]} toggleRoomInfo={toggleRoomInfo}/></div>
                <div className={style.item}><Room data={rooms[1]} toggleRoomInfo={toggleRoomInfo}/></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[2]} toggleRoomInfo={toggleRoomInfo}/></div>
                <div className={`${style.item} ${style.large}`}><Room data={null} toggleRoomInfo={toggleRoomInfo}/> </div>
                <div className={style.item}><Room data={rooms[3]} toggleRoomInfo={toggleRoomInfo}/></div>
                <div className={style.item}><Room data={rooms[4]} toggleRoomInfo={toggleRoomInfo}/></div>
                <div className={style.item}><Room data={rooms[5]} toggleRoomInfo={toggleRoomInfo}/></div>
                <div className={style.item}><Room data={rooms[6]} toggleRoomInfo={toggleRoomInfo}/></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faElevator} size='4x' /></div>
            </div>
        </>
    )
}

export default SecondFloor;
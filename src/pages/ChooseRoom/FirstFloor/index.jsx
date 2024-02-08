import style from './FirstFloor.module.scss';
import { faElevator, faStairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Room } from '../../../components/Room';
import { useState } from 'react';

function FirstFloor() {

    const [rooms, setRooms] = useState(
        [
            {
                capacity: 3,
                images: ['', ''],
                booked: true
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
                booked: true
            }, {
                capacity: 1,
                images: ['', ''],
                booked: false
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
            <h1>First Floor</h1>
            <div className={style.container}>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[0]} /></div>
                <div className={style.item}><Room data={rooms[1]} /></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[2]} /></div>
                <div className={`${style.item} ${style.large}`}><Room data={null} /> </div>
                <div className={style.item}><Room data={rooms[3]} /></div>
                <div className={style.item}><Room data={rooms[4]} /></div>
                <div className={style.item}><Room data={rooms[5]} /></div>
                <div className={style.item}><Room data={rooms[6]} /></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faElevator} size='4x' /></div>
            </div>
        </>
    )
}

export default FirstFloor;
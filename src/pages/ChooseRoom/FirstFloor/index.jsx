import style from './FirstFloor.module.scss';
import { faElevator, faStairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Room } from '../../../components/Room';
import { useState } from 'react';

function FirstFloor({ toggleRoomInfo }) {

    const [rooms, setRooms] = useState(
        [
            {
                title: 'room101',
                number: 101,
                description: 'some words',
                capacity: 3,
                images: ['', '', '', ''],
                price: 1000,
                booked: true
            },
            {
                title: 'room102',
                number: 102,
                description: 'some characters',
                capacity: 2,
                images: ['https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png', '', ''],
                price: 1200,
                booked: false
            },
            {
                title: 'room103',
                number: 1300,
                description: 'some things',
                capacity: 1,
                images: ['https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png'],
                price: 1420,
                booked: false
            }, {
                title: 'room104',
                number: 890,
                description: 'some one',
                capacity: 1,
                images: ['', '', '', '', ''],
                price: 880,
                booked: true
            }, {
                title: 'room105',
                number: 900,
                description: 'some hmm',
                capacity: 1,
                images: ['', '', ''],
                price: 500,
                booked: false
            }, {
                title: 'room106',
                number: 106,
                description: 'some three',
                capacity: 1,
                images: ['', ''],
                price: 700,
                booked: true
            }, {
                title: 'room107',
                number: 107,
                description: 'some some some',
                capacity: 2,
                images: ['', '', ''],
                price: 990,
                booked: false
            }
        ]
    )

    return (
        <>
            <h1>First Floor</h1>
            <div className={style.container}>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[0]} toggleRoomInfo={toggleRoomInfo} /></div>
                <div className={style.item}><Room data={rooms[1]} toggleRoomInfo={toggleRoomInfo} /></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[2]} toggleRoomInfo={toggleRoomInfo} /></div>
                <div className={`${style.item} ${style.large}`}><Room data={null} toggleRoomInfo={toggleRoomInfo} /> </div>
                <div className={style.item}><Room data={rooms[3]} toggleRoomInfo={toggleRoomInfo} /></div>
                <div className={style.item}><Room data={rooms[4]} toggleRoomInfo={toggleRoomInfo} /></div>
                <div className={style.item}><Room data={rooms[5]} toggleRoomInfo={toggleRoomInfo} /></div>
                <div className={style.item}><Room data={rooms[6]} toggleRoomInfo={toggleRoomInfo} /></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faElevator} size='4x' /></div>
            </div>
        </>
    )
}

export default FirstFloor;
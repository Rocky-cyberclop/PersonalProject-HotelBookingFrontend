import style from './FirstFloor.module.scss';
import { faElevator, faStairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Room } from '../../../components/Room';
import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function FirstFloor({ toggleRoomInfo, reserveInfo }) {

    let from, to, guest;
    if (reserveInfo) {
        from = reserveInfo.from;
        to = reserveInfo.to;
        guest = reserveInfo.token
    }

    const [rooms, setRooms] = useState(
        [
        ]
    )

    const stompClientRef = useRef(null);

    const onError = (e) => {
        console.log("Error connect: ", e);
    };

    useEffect(() => {
        setRooms([
            {
                title: 'room101',
                number: 104,
                description: 'some words',
                capacity: 3,
                images: ['', '', '', ''],
                price: 1000,
                booked: true
            },
            {
                title: 'room102',
                number: 105,
                description: 'some characters',
                capacity: 2,
                images: ['https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png', '', ''],
                price: 1200,
                booked: false
            },
            {
                title: 'room103',
                number: 103,
                description: 'some things',
                capacity: 1,
                images: ['https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png'],
                price: 1420,
                booked: false
            }, {
                title: 'room104',
                number: 106,
                description: 'some one',
                capacity: 1,
                images: ['', '', '', '', ''],
                price: 880,
                booked: true
            }, {
                title: 'room105',
                number: 102,
                description: 'some hmm',
                capacity: 1,
                images: ['', '', ''],
                price: 500,
                booked: false
            }, {
                title: 'room106',
                number: 107,
                description: 'some three',
                capacity: 1,
                images: ['', ''],
                price: 700,
                booked: true
            }, {
                title: 'room107',
                number: 101,
                description: 'some some some',
                capacity: 2,
                images: ['', '', ''],
                price: 102,
                booked: false
            }
        ])
    }, []);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
        stompClientRef.current = stomp

        stomp.connect({}, () => {
            stomp.subscribe('/topic/room-state', onMessageReceived);
        }, onError);

        // Cleanup function
        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        // Subscribe to topics or perform other websocket actions
        if (stompClientRef.current) {
            stompClientRef.current.connect({}, () => {
                stompClientRef.current.subscribe('/topic/room-state', onMessageReceived);
            });
        }

        // Cleanup function
        return () => {
            // Unsubscribe from topics or perform other cleanup actions
        };
    }, [from, to, guest]); // Add any relevant dependencies

    function checkDateRange(startRange, endRange, startCheck, endCheck) {
        var startDateRange = new Date(startRange);
        var endDateRange = new Date(endRange);
        var startDateCheck = new Date(startCheck);
        var endDateCheck = new Date(endCheck);
        var withinRange = startDateCheck >= startDateRange && startDateCheck <= endDateRange;
        if (withinRange) {
            withinRange = endDateCheck >= startDateRange && endDateCheck <= endDateRange;
        }

        return withinRange;
    }

    const onMessageReceived = (message) => {
        if (checkDateRange(from, to, JSON.parse(message.body).from, JSON.parse(message.body).to)
            || checkDateRange(JSON.parse(message.body).from, JSON.parse(message.body).to, from, to)) {
            if (guest !== JSON.parse(message.body).guest) {
                if (JSON.parse(message.body).type === "RESERVE") {
                    setRooms(prevRooms => {
                        const updatedRooms = prevRooms.map(room => {
                            if (room.number === JSON.parse(message.body).room) {
                                return {
                                    ...room,
                                    booked: true
                                };
                            }
                            return room;
                        });

                        return updatedRooms;
                    });
                }
                else {
                    setRooms(prevRooms => {
                        const updatedRooms = prevRooms.map(room => {
                            if (room.number === JSON.parse(message.body).room) {
                                return {
                                    ...room,
                                    booked: false
                                };
                            }
                            return room;
                        });
                        return updatedRooms;
                    });
                }
            }
        }
    };



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
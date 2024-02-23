/* eslint-disable */
import style from './ThirdFloor.module.scss';
import { faElevator, faStairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Room } from '../../../components/Room';
import { useState, useEffect } from 'react';
import Cafeteria from '../../../assets/images/cafeteria.png';
import axios from 'axios';

function ThirdFloor({ toggleRoomInfo, reserveInfo, triggerBindingOnMessageReceive }) {

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomResponse = axios.get('http://localhost:8080/api/room/floor/3');
                const roomBookedResponse = axios.post(`http://localhost:8080/api/reservation/floor`, { guest: guest, from: from, to: to });

                const [roomData, roomBookedData] = await Promise.all([roomResponse, roomBookedResponse]);

                setRooms(roomData.data);

                if (roomBookedData.data.length !== 0) {
                    setRooms(prevRooms => {
                        const updatedRooms = prevRooms.map(room => {
                            if (roomBookedData.data.includes(room.number)) {
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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        triggerBindingOnMessageReceive(onMessageReceived)
    }, [guest, from, to]);

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

    function dateInRange(dateToCheck, startDate, endDate) {
        const dateToCheckObj = new Date(dateToCheck);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        return dateToCheckObj >= startDateObj && dateToCheckObj <= endDateObj;
    }

    const onMessageReceived = (message) => {
        console.log("Message got on second floor!")
        if (
            checkDateRange(from, to, JSON.parse(message.body).from, JSON.parse(message.body).to)
            || checkDateRange(JSON.parse(message.body).from, JSON.parse(message.body).to, from, to)
            || dateInRange(from, JSON.parse(message.body).from, JSON.parse(message.body).to)
            || dateInRange(to, JSON.parse(message.body).from, JSON.parse(message.body).to)
        ) {
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
            <h1>Third Floor</h1>
            <div className={style.container}>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[0]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={style.item}><Room data={rooms[1]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faStairs} size='4x' /></div>
                <div className={style.item}><Room data={rooms[2]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={`${style.item} ${style.large}`}> <div><div className={style.displayFlex}>Cafeteria</div> <img src={Cafeteria} alt='' /></div>  </div>
                <div className={style.item}><Room data={rooms[3]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={style.item}><Room data={rooms[4]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={style.item}><Room data={rooms[5]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={style.item}><Room data={rooms[6]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={`${style.item} ${style.hasBorder}`}><FontAwesomeIcon icon={faElevator} size='4x' /></div>
            </div>
        </>
    )
}

export default ThirdFloor;
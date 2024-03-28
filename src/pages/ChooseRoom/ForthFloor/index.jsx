/* eslint-disable */
import style from './ForthFloor.module.scss';
import { Room } from '../../../components/Room';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ForthFloor({ toggleRoomInfo, reserveInfo, triggerBindingOnMessageReceive, bookingRooms }) {

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
                const roomResponse = axios.get('http://localhost:8080/api/room/floor/4');
                const roomBookedResponse = axios.post(`http://localhost:8080/api/reservation/floor`, { guest: guest, from: from, to: to });

                const [roomData, roomBookedData] = await Promise.all([roomResponse, roomBookedResponse]);

                setRooms(roomData.data);

                if (roomBookedData.data.length !== 0) {
                    setRooms(prevRooms => {
                        const updatedRooms = prevRooms.map(room => {
                            if (roomBookedData.data.includes(room.number)) {
                                return {
                                    ...room,
                                    booked: 1
                                };
                            }
                            if (roomBookedData.data.includes(room.number * -1)) {
                                return {
                                    ...room,
                                    booked: -1
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
                                    booked: 1
                                };
                            }
                            return room;
                        });

                        return updatedRooms;
                    });
                }
                else if (JSON.parse(message.body).type === "RESERVING") {
                    setRooms(prevRooms => {
                        const updatedRooms = prevRooms.map(room => {
                            if (room.number === JSON.parse(message.body).room) {
                                return {
                                    ...room,
                                    booked: -1
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
                                    booked: 0
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
            <h1 className={style.floorTitle}>Forth Floor</h1>
            <div className={style.container}>
                <div className={style.item}><Room data={rooms[7]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[8]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[9]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[10]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[11]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[12]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[13]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[14]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[6]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[33]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[32]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[31]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[30]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[29]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[28]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[15]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[5]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[34]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={`${style.item} ${style.large}`}><Room data={null} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} /></div>
                <div className={style.item}><Room data={rooms[27]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[16]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[4]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[35]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[26]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[17]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[3]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[36]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[25]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[18]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[2]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[37]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[24]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[19]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[1]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[38]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[23]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[20]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[0]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[39]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[22]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>
                <div className={style.item}><Room data={rooms[21]} toggleRoomInfo={toggleRoomInfo} setRooms={onMessageReceived} bookingRooms={bookingRooms} /></div>

            </div>
        </>
    )
}

export default ForthFloor;
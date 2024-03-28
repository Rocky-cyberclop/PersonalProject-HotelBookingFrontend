/* eslint-disable */
import style from './ChooseRoom.module.scss'
import FirstFloor from './FirstFloor';
import SecondFloor from './SecondFloor';
import ThirdFloor from './ThirdFloor';
import ForthFloor from './ForthFloor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { Drawer } from '@mui/material';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import CarouselComponent from '../../components/Carousel';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { toast } from 'react-toastify';

const drawerWidth = 500;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
    },
}));

function ChooseRoom() {
    const [currentFloorIndex, setCurrentFloorIndex] = useState(0)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [room, setRoom] = useState({
        title: '', pictures: [], number: 0,
        description: '', booked: 0, price: 0
    })
    const [reserveString, setReserveString] = useState('')
    const [infoReserve, setInfoReserve] = useState({
        rooms: [],
        prices: [],
        price: '',
        total: '',
        tax: ''
    })

    const [handleMessage, setHandleMessage] = useState(null)
    const stompClientRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
        stompClientRef.current = stomp

        stomp.connect({}, () => {
            stomp.subscribe('/topic/room-state', onMessageReceived);

        }, onError);

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (stompClientRef.current) {
            stompClientRef.current.connect({}, () => {
                stompClientRef.current.subscribe('/topic/room-state', onMessageReceived);
                stompClientRef.current.send('/app/connect', {}, JSON.stringify({ guest: previousState.token }))
            });
        }

        return () => {
        };
    }, []);

    const location = useLocation();
    const previousState = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        if (!previousState) {
            navigate("/")
        }
    }, [])

    const HandleUpFloor = function () {
        if (currentFloorIndex < 3) {
            setCurrentFloorIndex(preIndex => preIndex + 1)
        }
    }

    const HandleDownFloor = function () {
        if (currentFloorIndex > 0) {
            setCurrentFloorIndex(preIndex => preIndex - 1)
        }
    }

    const toggleRoomInfo = (data, setRooms) => {
        if (infoReserve.rooms.includes(data.number)) setReserveString('Unreserve')
        else setReserveString('Reserve')
        setIsDrawerOpen((prevState) => !prevState);
        setRoom({
            title: data.title,
            pictures: data.images,
            number: data.number,
            description: data.description,
            booked: data.booked,
            price: data.price
        })
    };

    const HandleReserve = function () {
        const updateReserve = () => {
            const updatedInfoReserve = { ...infoReserve };
            if (!infoReserve.rooms.includes(room.number)) {
                updatedInfoReserve.rooms.push(room.number);
                updatedInfoReserve.prices.push(room.price);
            }
            else {
                updatedInfoReserve.rooms.splice(updatedInfoReserve.rooms.indexOf(room.number), 1);
                updatedInfoReserve.prices.splice(updatedInfoReserve.rooms.indexOf(room.number), 1);
            }
            updatedInfoReserve.price = updatedInfoReserve.prices.reduce((acc, curr) => acc + curr, 0);
            updatedInfoReserve.tax = updatedInfoReserve.price * 0.1;
            updatedInfoReserve.total = updatedInfoReserve.price + updatedInfoReserve.tax;
            setInfoReserve(updatedInfoReserve);
            setIsDrawerOpen((prevState) => !prevState);
            sendMessage(room.number)
        }
        if (reserveString === 'Reserve') {
            if (previousState.room !== 0) {
                previousState.room = previousState.room - 1
                updateReserve()
            } else {
                toast.error("You have chosen too much room!")
            }
        }
        else {
            previousState.room = previousState.room + 1
            updateReserve()
        }
    }

    const triggerBindingOnMessageReceive = (setRooms) => {
        setHandleMessage(() => setRooms)
    }

    const sendMessage = (number = 0) => {
        let type = ''
        if (reserveString === 'Reserve') type = 'RESERVING'
        else type = 'UNRESERVED'
        const fetchData = async () => {
            try {
                const requestBody = {
                    from: previousState.from, to: previousState.to,
                    room: number, type: type, guest: previousState.token
                };
                const response = await axios.post('http://localhost:8080/api/reservation/reserve', requestBody);
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchData()
    }

    const onError = (e) => {
        console.log("Error connect: ", e);
    };

    const onMessageReceived = (message) => {
        if (JSON.parse(message.body).room !== null)
            setHandleMessage(pre => {
                pre(message)
                return pre
            })
    };

    const handleDoneChooseRoom = function () {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/reservation/doneChooseRoom`, {
                    guest: previousState.token, numberOfPeople: previousState.adults
                });
                console.log(response.data);
                if (response.data === null) {
                    toast.error("Reservation no longer exist please check again!");
                    return;
                }
                navigate('/fillInfo', {
                    state: {
                        reservation: response.data,
                        adults: previousState.adults
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchData();
    }

    return (
        <div className={style.container}>
            <div className={style.elevator}>
                <div className={style.up} onClick={HandleUpFloor}><FontAwesomeIcon icon={faCaretUp} size='2xl' /></div>
                <div className={style.down} onClick={HandleDownFloor}><FontAwesomeIcon icon={faCaretDown} size='2xl' /></div>
            </div>
            <div className={style.instruction}>
                <div className={style.youChoose}>
                    <div className={style.color}></div>
                    <div className={style.description}>You're choosing these rooms</div>
                </div>
                <div className={style.someoneChoosing}>
                    <div className={style.color}></div>
                    <div className={style.description}>Someone is choosing but hasn't paid yet</div>
                </div>
                <div className={style.booked}>
                    <div className={style.color}></div>
                    <div className={style.description}>Already booked</div>
                </div>
            </div>
            <div className={style.floor}>
                {currentFloorIndex === 0 &&
                    <FirstFloor
                        toggleRoomInfo={toggleRoomInfo}
                        reserveInfo={previousState}
                        triggerBindingOnMessageReceive={triggerBindingOnMessageReceive}
                        bookingRooms={infoReserve.rooms}
                    />}
                {currentFloorIndex === 1 &&
                    <SecondFloor
                        toggleRoomInfo={toggleRoomInfo}
                        reserveInfo={previousState}
                        triggerBindingOnMessageReceive={triggerBindingOnMessageReceive}
                        bookingRooms={infoReserve.rooms}
                    />}
                {currentFloorIndex === 2 &&
                    <ThirdFloor
                        toggleRoomInfo={toggleRoomInfo}
                        reserveInfo={previousState}
                        triggerBindingOnMessageReceive={triggerBindingOnMessageReceive}
                        bookingRooms={infoReserve.rooms}
                    />}
                {currentFloorIndex === 3 &&
                    <ForthFloor
                        toggleRoomInfo={toggleRoomInfo}
                        reserveInfo={previousState}
                        triggerBindingOnMessageReceive={triggerBindingOnMessageReceive}
                        bookingRooms={infoReserve.rooms}
                    />}
            </div>
            <div className={style.info}>
                <div className={style.header}>Choose your rooms</div>
                <div className={style.body}>
                    <div className={style.listRooms}>Rooms you have chosen:{
                        infoReserve.rooms.map((value, index) => (
                            <div key={index} className={style.roomItem}>{value},</div>
                        ))
                    }</div>
                    <div className={style.prices}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Prices"
                            value={infoReserve.price}
                        />
                    </div>
                    <div className={style.tax}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Tax"
                            value={infoReserve.tax}
                        />
                    </div>
                    <div className={style.total}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Total"
                            value={infoReserve.total}
                        />
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style.deposit}>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={infoReserve.total === 0 || infoReserve.total === ''}
                            onClick={handleDoneChooseRoom}
                        >
                            Fill your information
                        </Button>
                    </div>
                    <div>When you choose rooms, we will keep those rooms
                        for you for one hours if you don't deposit</div>
                </div>
            </div>
            <StyledDrawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleRoomInfo}
            >
                <div className={style.infoContainer}>
                    <div className={style.header}>This is our room</div>
                    <div className={style.body}>
                        <div className={style.number}>Number: {room.number}</div>

                        <div className={style.images}>
                            <div>Image here!</div>
                            <CarouselComponent images={room.pictures} />
                        </div>
                        <div className={style.description}>{room.description}</div>
                        <div className={style.price}>{room.price}$</div>


                    </div>
                    <div className={style.footer}>

                        <Button
                            className={style.reserve}
                            disabled={room.booked != 0}
                            variant='contained'
                            color='primary'
                            onClick={HandleReserve}
                        >{reserveString}</Button>
                    </div>

                </div>
            </StyledDrawer>
        </div>

    )
}

export default ChooseRoom;
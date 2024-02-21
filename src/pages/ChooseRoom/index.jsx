import style from './ChooseRoom.module.scss'
import FirstFloor from './FirstFloor';
import SecondFloor from './SecondFloor';
import ThirdFloor from './ThirdFloor';
import ForthFloor from './ForthFloor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import CarouselComponent from '../../components/Carousel';
import TextField from '@mui/material/TextField';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        description: '', booked: false, price: 0
    })
    const [reserveString, setReserveString] = useState('')
    const [infoReserve, setInfoReserve] = useState({
        rooms: [],
        prices: [],
        price: '',
        total: '',
        tax: ''
    })
    // const [stompClient, setStompClient] = useState(null)

    const location = useLocation();
    const previousState = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        if (!previousState) {
            navigate("/")
        }
        // return () => {
        //     if (stompClient) {
        //         stompClient.disconnect();
        //     }
        // };
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

    const toggleRoomInfo = (data) => {
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

    const sendMessage = (number = 0) => {
        let type=''
        if(reserveString==='Reserve')type='RESERVE'
        else type='UNRESERVED'
        // stompClient.send("/app/roomReserve",
        //     {},
        //     JSON.stringify({ from: previousState.from, to: previousState.to, room: number, type: type, guest: previousState.token })
        // );
        const fetchData = async () => {
            try {
                const requestBody = { from: previousState.from, to: previousState.to, room: number, type: type, guest: previousState.token };
                const response = await axios.post('http://localhost:8080/api/reservation/reserve',requestBody);
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchData()
    }


    return (
        <div className={style.container}>
            <div className={style.elevator}>
                <div className={style.up} onClick={HandleUpFloor}><FontAwesomeIcon icon={faCaretUp} size='2xl' /></div>
                <div className={style.down} onClick={HandleDownFloor}><FontAwesomeIcon icon={faCaretDown} size='2xl' /></div>
            </div>
            <div className={style.floor}>
                {currentFloorIndex === 0 && <FirstFloor toggleRoomInfo={toggleRoomInfo} reserveInfo={previousState}/>}
                {currentFloorIndex === 1 && <SecondFloor toggleRoomInfo={toggleRoomInfo} reserveInfo={previousState}/>}
                {currentFloorIndex === 2 && <ThirdFloor toggleRoomInfo={toggleRoomInfo} reserveInfo={previousState}/>}
                {currentFloorIndex === 3 && <ForthFloor toggleRoomInfo={toggleRoomInfo} reserveInfo={previousState}/>}
            </div>
            <div className={style.info}>
                <div className={style.header}>Choose your rooms</div>
                <div className={style.body}>
                    <div>Rooms you have chosen:</div>
                    <div className={style.listRooms}>
                        {
                            infoReserve.rooms.map((value, index) => (
                                <div key={index}>{value},</div>
                            ))
                        }
                    </div>
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
                        >
                            <Link
                                to={'/deposit'}
                                state={infoReserve} // Pass the state object
                            >
                                Deposit
                            </Link>
                        </Button>
                    </div>
                    <div>When you choose rooms, we will keep those rooms
                        for you for six hours if you don't deposit</div>
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
                            disabled={room.booked}
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
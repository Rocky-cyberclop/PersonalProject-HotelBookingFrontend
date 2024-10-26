/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './Main.module.scss';
import { Checkbox, FormControlLabel, Button, Pagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar, faThumbsUp, faArrowDownWideShort
} from '@fortawesome/free-solid-svg-icons';
import RatingScore from './ratingScore';
import axios from 'axios';
import Img from './img';
import { toast } from 'react-toastify';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const roomType = [
    { title: 'Classic room', value: 0 },
    { title: 'Couple room', value: 1 },
    { title: 'Extra large room', value: 2 },
]
const utilities = [
    { title: 'Television', value: 3 },
    { title: 'Free wifi', value: 4 },
    { title: 'Fridge', value: 5 },
    { title: 'A bathtub', value: 6 },
    { title: 'Single bed beside double bed', value: 7 },
]
const capacities = [
    { title: 'One person', value: 8 },
    { title: 'Two person', value: 9 },
    { title: 'Three person', value: 10 },
]

const SuggestPage = ({ handleChooseOwn, dateRange, people }) => {
    const [dataFound, setDataFound] = useState([])
    const [token, setToken] = useState('')
    const [rooms, setRooms] = useState([])
    const [condition, setCondition] = useState({
        page: 1,
        filterArray: [],
        totalPage: 0,
        totalValue: 0,
        price: 500
    })
    const navigate = useNavigate()
    const [debouncedValue, setDebouncedValue] = useState(500);
    const HandleChosseFilter = (e) => {
        const existed = condition?.filterArray?.indexOf(e.target.value)
        if (existed === -1) {
            setCondition(pre => ({ ...pre, filterArray: [...pre.filterArray, e.target.value] }))
        }
        else {
            setCondition(pre => ({
                ...pre,
                filterArray: pre?.filterArray?.filter(item => item !== e.target.value)
            }))
        }
    }
    const tokenRef = useRef(null);
    const stompClientRef = useRef(null);

    useEffect(() => {
        const makeReservation = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/reservation/chooseRoom', {
                    from: dateRange.checkInDate,
                    to: dateRange.checkOutDate,
                });
                setToken(response.data);
                tokenRef.current = response.data;

                const socket = new SockJS('http://localhost:8080/ws');
                const stomp = Stomp.over(socket);
                stompClientRef.current = stomp;

                stomp.connect({}, () => {
                    stomp.send('/app/connect', {}, JSON.stringify({ guest: tokenRef.current }));
                });

            } catch (error) {
                console.error('Error in reservation process:', error);
            }
        };

        makeReservation();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/reservation/chooseRoomOldConcept`,
                    {
                        from: dateRange.checkInDate,
                        to: dateRange.checkOutDate,
                        page: condition.page - 1,
                        filter: condition.filterArray,
                        adults: people.adults,
                        children: people.children,
                        numberOfRoom: 10,
                        price: condition.price
                    }
                );
                setDataFound(response.data.rooms)
                setCondition(pre => ({
                    ...pre,
                    totalValue: response.data.total,
                    totalPage: response.data.total / 10,

                }))
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        }
        if (dateRange.checkInDate && dateRange.checkOutDate) {
            fetchData()
        }
    }, [
        condition?.filterArray,
        condition?.page,
        condition.price,
        dateRange.checkInDate, dateRange.checkOutDate,
        people.room,
    ])

    useEffect(() => {
        const handler = setTimeout(() => {
            setCondition(pre => ({ ...pre, price: debouncedValue }));
        }, 300);

        return () => clearTimeout(handler);
    }, [debouncedValue]);

    const handleChooseThisRoom = (number) => {
        const existed = rooms.indexOf(number)
        if (existed === -1) {
            if (rooms.length < people.room) {
                setRooms(pre => ([...pre, number]))
                bindRoom(number, 'RESERVING')
            }
            else {
                toast.warning("You have chosen enough room!")
            }
        }
        else {
            setRooms(pre => pre.filter(item => item !== number))
            bindRoom(number, 'UNRESERVED')
        }
    }
    const bindRoom = async (number, type) => {
        try {
            const requestBody = {
                from: dateRange.checkInDate,
                to: dateRange.checkOutDate,
                room: number,
                type: type,
                guest: token,
            };
            await axios.post('http://localhost:8080/api/reservation/reserve', requestBody);
        } catch (error) {
            console.error('Error binding room:', error);
            throw error;
        }
    };
    const handleDoneChooseRoom = () => {
        const navigateToFillInfo = async (token) => {
            try {
                const response = await axios.post(`http://localhost:8080/api/reservation/doneChooseRoom`, {
                    guest: token,
                    numberOfPeople: people.adults,
                });
                if (response.data === null) {
                    toast.error("Reservation no longer exists, please check again!");
                    return;
                }
                navigate('/fillInfo', {
                    state: {
                        reservation: response.data,
                        adults: people.adults,
                    },
                });
            } catch (error) {
                console.error('Error completing reservation:', error);
            }
        };
        navigateToFillInfo(token);
    }
    return (
        <div className={style.why}>
            <div className={style.suggestPage}>
                <div className={style.totalValue}>
                    <div className={style.advertisement}>
                        <div className={style.filterHeader}>
                            Filter by:
                        </div>
                        <div className={style.filterType}>
                            <div className={`${style.textBold}`}>
                                Price range:
                            </div>
                            <div>
                                1 night per room
                            </div>
                            <div>
                                <Box sx={{ width: '100%' }}>
                                    <Slider
                                        value={debouncedValue}
                                        aria-label="Default"
                                        valueLabelDisplay="auto"
                                        min={100}
                                        max={900}
                                        onChange={(_, value) => {
                                            setDebouncedValue(value)
                                        }}
                                    />
                                </Box>
                                <div className={style.priceRange}>
                                    <div className={style.priceRangeText}>USD 100</div>
                                    <div className={style.priceRangeSpace}>

                                    </div>
                                    <div className={style.priceRangeText}>USD 900</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.filterType}>
                            <div className={`${style.textBold}`}>
                                Room type:
                            </div>
                            {roomType.map(item => (
                                <div key={item.value}>
                                    <FormControlLabel control={<Checkbox value={item.value} onChange={HandleChosseFilter} />} label={item.title} />
                                </div>
                            ))}
                        </div>
                        <div className={style.filterType}>
                            <div className={`${style.textBold}`}>
                                Utilities:
                            </div>
                            {utilities.map(item => (
                                <div key={item.value}>
                                    <FormControlLabel control={<Checkbox value={item.value} onChange={HandleChosseFilter} />} label={item.title} />
                                </div>
                            ))}
                        </div>
                        <div className={style.filterType}>
                            <div className={`${style.textBold}`}>
                                Capacity:
                            </div>
                            {capacities.map(item => (
                                <div key={item.value}>
                                    <FormControlLabel control={<Checkbox value={item.value} onChange={HandleChosseFilter} />} label={item.title} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={style.info}>
                    <div className={style.noSuggestion}>
                        <div className={style.suggestionsFound}>
                            <div className={style.suggestionsNumber}>Can Tho: {condition.totalValue} properties found</div>
                            <div className={style.suggestionsSortBy}>
                                <FontAwesomeIcon icon={faArrowDownWideShort} className={style.suggestionsSortByIcon} />Sort by: closest related
                            </div>
                        </div>
                        <div className={style.pickYourOwn}>
                            <div>
                                <span className={style.pickYourOwnNotFound}>Not found your favorite?</span>
                                <button className={style.pickYourOwnChoose} onClick={handleChooseOwn}>Choose more ways out!</button>
                            </div>
                            <div className={style.pickYourOwnDone}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={rooms.length === 0}
                                    onClick={handleDoneChooseRoom}
                                >
                                    Next Step: Fill your information
                                </Button>
                            </div>
                        </div>
                    </div>
                    {
                        dataFound?.map((item, index) => (
                            <div className={`${style.room} ${index === 0 ? style.firstSuggest : ''}`} key={item.number}>
                                <Img change={condition} />
                                <div className={style.roomText}>
                                    <div className={style.rating}>
                                        <div className={style.titleRating}>Room number {item.number}</div>
                                        <div className={style.stars}>
                                            <FontAwesomeIcon icon={faStar} className={style.icon} />
                                            <FontAwesomeIcon icon={faStar} className={style.icon} />
                                            <FontAwesomeIcon icon={faStar} className={style.icon} />
                                            <FontAwesomeIcon icon={faStar} className={style.icon} />
                                        </div>
                                        <FontAwesomeIcon icon={faThumbsUp} className={style.like} />
                                    </div>
                                    <div className={style.roomTextBody}>
                                        {item.description}
                                    </div>
                                </div>
                                <div className={style.roomReserve}>
                                    <div className={style.roomReserveRating}>
                                        <RatingScore />
                                        <div className={style.score}>9.1</div>

                                    </div>
                                    <div className={style.roomReserveLocation}>Location 9.3</div>
                                    <div className={style.roomReservePrice}>${item.price} per night</div>
                                    <div className={style.roomReserveButton}>
                                        <Button
                                            style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                                            variant="contained"
                                            onClick={() => { handleChooseThisRoom(item.number) }}
                                        >{!rooms.includes(item.number) ? 'Reserve' : 'Unreserve'}</Button>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                    <Pagination onChange={(_, value) => {
                        setCondition(pre => ({ ...pre, page: value }))
                    }} count={Math.round(condition.totalPage)} shape="rounded" />
                </div>
            </div>
        </div >
    )
}

export default SuggestPage
/* eslint-disable */
import style from './Main.module.scss';
import { Calendar } from 'react-check-in-out-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MainPage from './main';
import SuggestPage from './suggest';

import Background from '../../assets/images/new_lobby.jpg'
import logo from '../../assets/images/logo.png'



function Main() {
    const [date, setDate] = useState(() => ({ checkInDate: 'null', checkOutDate: 'null' }))

    const [isOneModalOpen, setIsOneModalOpen] = useState(null)
    const [adults, setAdult] = useState(2)
    const [children, setChildren] = useState(0)
    const [room, setRoom] = useState(1)
    const navigate = useNavigate()
    const [nextPage, setNextPage] = useState(false)

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


    // Prevent the Propagation from child to parent 
    const HandlePropagation = function (event) {
        event.stopPropagation()
    }

    const HandleCalendarVisibility = function (event) {
        const firstChild = event.target.children[1];
        if (firstChild) {
            if (firstChild.style.display === "block") {
                firstChild.style.display = "none";
            }
            else {
                if (isOneModalOpen && isOneModalOpen.style.display === "block") isOneModalOpen.style.display = 'none'
                firstChild.style.display = "block";
                setIsOneModalOpen(firstChild)
            }
        }
    }

    const HandlePeopleNumberVisibility = function (event) {
        const firstChild = event.target.children[1];
        if (firstChild) {
            if (firstChild.style.display === "block") {
                firstChild.style.display = "none";
            }
            else {
                if (isOneModalOpen && isOneModalOpen.style.display === "block") isOneModalOpen.style.display = 'none'
                firstChild.style.display = "block";
                setIsOneModalOpen(firstChild)
            }
        }
    }

    const HandleDateChange = useCallback((checkInDate, checkOutDate) => {
        setDate({
            checkInDate: checkInDate,
            checkOutDate: checkOutDate
        })
        console.log(checkInDate, checkOutDate)
    }, [])


    // Adults changing
    const HandleAdultMinus = function () {
        if (adults > 1) {
            setAdult(adults - 1)
            if (adults - 1 < room) setRoom(room - 1)
        }
    }

    const HandleAdultPlus = function () {
        if (adults < 30) { setAdult(adults + 1) }
    }

    // Children changing
    const HandleChildrenMinus = function () {
        if (children > 0) { setChildren(children - 1) }
    }

    const HandleChildrenPlus = function () {
        if (children < 10) { setChildren(children + 1) }
    }

    // Room changing
    const HandleRoomMinus = function () {
        if (room > 1) { setRoom(room - 1) }
    }

    const HandleRoomPlus = function () {
        if (room < 30) {
            setRoom(room + 1)
            if (room + 1 > adults) setAdult(adults + 1)
        }
    }

    const HandleDoneButton = function () {
        isOneModalOpen.style.display = "none";
    }

    const HandleChooseRoom = async function () {
        if (date.checkInDate == "Invalid Date" || date.checkOutDate == "Invalid Date"
            || date.checkOutDate == undefined || date.checkOutDate == undefined) {
            toast.error("Please choose date to check-in and date to check-out");
            return;
        }
        if (nextPage !== true) {
            setNextPage(true)
            isOneModalOpen.style.display = "none";
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await axios.post(`http://localhost:8080/api/reservation/chooseRoom`, { from: date.checkInDate, to: date.checkOutDate });
                    console.log(response.data);
                    navigate('/chooseRoom', {
                        state: {
                            token: response.data,
                            from: date.checkInDate,
                            to: date.checkOutDate,
                            room: room,
                            adults: adults
                        }
                    }) //Pass date through the component to fetch rooms
                } catch (error) {
                    console.error('Error fetching data:', error);
                    return;
                }
            };
            fetchData();
        }
    }

    return (
        <div className={style.container}>
            <img className={style.mainBackground} src={Background} alt='' />
            <div className={style.content}>
                <div className={style.inputBar}>
                    <div
                        className={`${style.inputItem} ${style.displayFlex} ${style.alginItemCenter}`}
                        onClick={HandleCalendarVisibility}
                    ><FontAwesomeIcon size={'2x'} className={style.icon} icon={faCalendarAlt} /> Choose days you like
                        <div
                            className={style.calendar}
                            onClick={HandlePropagation}
                        >
                            <Calendar
                                mainColor="#ff6347"
                                subMainColor="#ffa07a"
                                startDay={0}
                                numMonths={2}
                                language="en"
                                maximumMonths={12}
                                defaultCheckIn={date.checkInDate}
                                defaultCheckOut={date.checkOutDate}
                                isRectangular={false}
                                onCheckInOutChange={HandleDateChange}
                            />
                        </div>
                    </div>
                    <div
                        className={`${style.inputItem} ${style.displayFlex} ${style.alginItemCenter}`}
                        onClick={HandlePeopleNumberVisibility}
                    ><FontAwesomeIcon size={"2x"} className={style.icon} icon={faUsers} /> How many people
                        <div
                            className={style.peopleNumber}
                            onClick={HandlePropagation}
                        >
                            <div className={style.peopleItem}>
                                <div className={style.label}>Adults</div>
                                <div className={style.input}>
                                    <div className={style.minus} onClick={HandleAdultMinus}>-</div>
                                    <div className={style.number}>{adults}</div>
                                    <div className={style.plus} onClick={HandleAdultPlus}>+</div>
                                </div>
                            </div>
                            <div className={style.peopleItem}>
                                <div className={style.label}>Children</div>
                                <div className={style.input}>
                                    <div className={style.minus} onClick={HandleChildrenMinus}>-</div>
                                    <div className={style.number}>{children}</div>
                                    <div className={style.plus} onClick={HandleChildrenPlus}>+</div>
                                </div>
                            </div>
                            <div className={style.peopleItem}>
                                <div className={style.label}>Rooms</div>
                                <div className={style.input}>
                                    <div className={style.minus} onClick={HandleRoomMinus}>-</div>
                                    <div className={style.number}>{room}</div>
                                    <div className={style.plus} onClick={HandleRoomPlus}>+</div>
                                </div>
                            </div>
                            <div className={style.peopleItem} onClick={HandleDoneButton}>
                                <div>Done</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${style.inputItem}`}
                        onClick={HandleChooseRoom}
                    >Choose room</div>
                </div>
            </div>
            {(nextPage === true ? <SuggestPage handleChooseOwn={HandleChooseRoom} dateRange={date} people={{ adults, children, room }} /> : <MainPage />)}
            <div className={style.footer}>
                <div className={style.footerContainer}>
                    <div className={style.logo}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={style.about}>
                        <div className={`${style.item} ${style.title}`}>
                            About Rocky
                        </div>
                        <div className={style.item}>How to Book</div>
                        <div className={style.item}>Contact Us</div>
                        <div className={style.item}>Help Center</div>
                        <div className={style.item}>Careers</div>
                        <div className={style.item}>About Us</div>
                    </div>
                    <div className={style.product}>
                        <div className={`${style.item} ${style.title}`}>
                            Products
                        </div>
                        <div className={style.item}>Villas</div>
                        <div className={style.item}>Hotels</div>
                        <div className={style.item}>Xperience</div>
                        <div className={style.item}>Apartments</div>
                        <div className={style.item}>Bus & Shuttle</div>
                    </div>
                    <div className={style.other}>
                        <div className={`${style.item} ${style.title}`}>
                            Other
                        </div>
                        <div className={style.item}>Blog</div>
                        <div className={style.item}>Privacy Notice</div>
                        <div className={style.item}>Terms & Conditions</div>
                        <div className={style.item}>Regulation for operation</div>
                        <div className={style.item}>Register Your Experience Business</div>
                    </div>
                </div>
                <div className={style.address}>
                    <div>
                        <div className={style.title}>
                            Rocky Vietnam Co., Ltd. Enterprise Reg.: 0355669359. Can Tho University, 3/2, Ward Xuan Khanh, Ninh Kieu District, Can Tho City
                        </div>
                        <div className={style.content}>
                            Copyright © 2024 Rocky. All rights reserved
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
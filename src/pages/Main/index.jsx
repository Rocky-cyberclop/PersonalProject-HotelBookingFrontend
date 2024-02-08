/* eslint-disable */
import style from './Main.module.scss';
import { Calendar } from 'react-check-in-out-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


function Main() {
    const [date, setDate] = useState(() => ({checkInDate: 'null', checkOutDate: 'null'}))

    const [isOneModalOpen, setIsOneModalOpen] = useState(null)
    const [adults, setAdult] = useState(2)
    const [children, setChildren] = useState(0)
    const [room, setRoom] = useState(1)
    const navigate = useNavigate()


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
        if (adults > 1) { setAdult(adults - 1) }
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
        if (room < 30) { setRoom(room + 1) }
    }

    const HandleDoneButton = function () {
        isOneModalOpen.style.display = "none";
    }

    const HandleChooseRoom = function () {
        // console.log(date.checkInDate+" "+date.checkOutDate)
        if (date.checkInDate == "Invalid Date" || date.checkOutDate == "Invalid Date"
            || date.checkOutDate == undefined || date.checkOutDate == undefined) {
            toast.error("Please choose date to check-in and date to check-out");
            return;
        }
        // fetch('http://localhost:8080/api/chooseRoom', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'Authorization': 'Bearer ' + token
        //     },
        //     body: JSON.stringify({
        //         "checkIn": date.checkInDate,
        //         "checkOut": date.checkOutDate,
        //         "adults": adults,
        //         "children": children,
        //         "room": room
        //     }),
        // }).catch(err=> {console.log(err);});
        navigate('/chooseRoom')
    }

    return (
        <div className={style.mainBackground}>
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


        </div>
    );
}

export default Main;
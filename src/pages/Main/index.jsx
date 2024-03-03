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
import Background from '../../assets/images/main_lobby.jpg'
import { Button } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Comment from './Comment';

import slide1 from '../../assets/images/slide1.jpeg'
import slide2 from '../../assets/images/slide2.jpeg'
import slide3 from '../../assets/images/slide3.jpeg'
import slide4 from '../../assets/images/slide4.jpeg'
import slide5 from '../../assets/images/slide5.jpeg'
import slide6 from '../../assets/images/slide6.jpeg'
import slide7 from '../../assets/images/slide7.jpeg'
import slide8 from '../../assets/images/slide8.jpeg'
import card1 from '../../assets/images/why1.webp'
import card2 from '../../assets/images/why2.webp'
import card3 from '../../assets/images/why3.webp'
import logo from '../../assets/images/logo.png'

const responsive = {
    0: { items: 1 },
    256: { items: 2 },
    512: { items: 3 },
    1024: { items: 4 },
};

function Main() {
    const [date, setDate] = useState(() => ({ checkInDate: 'null', checkOutDate: 'null' }))

    const [isOneModalOpen, setIsOneModalOpen] = useState(null)
    const [adults, setAdult] = useState(2)
    const [children, setChildren] = useState(0)
    const [room, setRoom] = useState(1)
    const navigate = useNavigate()

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

    const HandleChooseRoom = function () {
        // console.log(date.checkInDate+" "+date.checkOutDate)
        if (date.checkInDate == "Invalid Date" || date.checkOutDate == "Invalid Date"
            || date.checkOutDate == undefined || date.checkOutDate == undefined) {
            toast.error("Please choose date to check-in and date to check-out");
            return;
        }
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

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const items = [
        <div className={style.slide} onClick={handleScrollTop}> <div> <img className={style.item} src={slide1} /> <div className={style.name}>Hotels</div>            </div></div>,
        <div className={style.slide} onClick={handleScrollTop}> <div><img className={style.item} src={slide2} /> <div className={style.name}>Apartments</div>         </div></div>,
        <div className={style.slide} onClick={handleScrollTop}> <div><img className={style.item} src={slide3} /> <div className={style.name}>Resorts</div>            </div></div>,
        <div className={style.slide} onClick={handleScrollTop}> <div><img className={style.item} src={slide4} /> <div className={style.name}>Villas</div>             </div></div>,
        <div className={style.slide} onClick={handleScrollTop}> <div><img className={style.item} src={slide5} /> <div className={style.name}>Cabins</div>             </div></div>,
        <div className={style.slide} onClick={handleScrollTop}> <div><img className={style.item} src={slide6} /> <div className={style.name}>Cottages</div>           </div></div>,
        <div className={style.slide} onClick={handleScrollTop}> <div><img className={style.item} src={slide7} /> <div className={style.name}>Glamplings</div>         </div></div>,
        <div className={style.slide} onClick={handleScrollTop}> <div><img className={style.item} src={slide8} /> <div className={style.name}>Service apartments</div> </div></div>
    ];

    return (
        <div className={style.container}>
            <img className={style.mainBackground} src={Background} />
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
            <div className={style.offers}>
                <div className={style.header}>
                    <div className={style.title}>Offers</div>
                    <div className={style.description}>Promotions, deals and special offers for you</div>
                </div>
                <div className={style.body}>
                    <div>
                        <div className={style.title}>
                            New year, new adventures
                        </div>
                        <div className={style.description}>
                            Save 15% or more when you book and stay before 1 April 2024
                        </div>
                    </div>
                    <div className={style.button}>
                        <Button style={{ backgroundColor: '#f28e47', color: 'aliceblue' }}
                            onClick={handleScrollTop}>Find Early 2024 Deals</Button>
                    </div>
                </div>
            </div>
            <div className={style.propertyType}>
                <div className={style.header}>
                    Browse by property type
                </div>
                <div className={style.body}>
                    <AliceCarousel
                        mouseTracking
                        items={items}
                        responsive={responsive}
                        controlsStrategy="alternate"
                    />

                </div>
            </div>
            <div className={style.why}>
                <div className={style.header}>Why book with Rocky.hotels?</div>
                <div className={style.body}>
                    <div className={style.card}>
                        <img src={card1} alt="" />
                        <div className={style.description}>
                            <div className={style.title}>One place for all your needs</div>
                            <div className={style.content}>From flights, stays, to sights, just count on our <br />complete products and Travel Guides.</div>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img src={card2} alt="" />
                        <div className={style.description}>
                            <div className={style.title}>Flexible booking options</div>
                            <div className={style.content}>Sudden change of plan? No worries!<br /> Reschedule or Refund without hassle.</div>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img src={card3} alt="" />
                        <div className={style.description}>
                            <div className={style.title}>Secure & convenient payment</div>
                            <div className={style.content}>Enjoy many secure ways to pay, <br />in the currency that's most convenient for you.</div>
                        </div>
                    </div>
                </div>
            </div>
            <Comment/>
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
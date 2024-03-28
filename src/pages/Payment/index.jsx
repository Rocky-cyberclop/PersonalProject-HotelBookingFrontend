/* eslint-disable */
import style from './Payment.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, Modal, Box, Typography } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import { faCcVisa, faCcAmex, faCcMastercard, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo, faMoneyBills, faInfo, faTaxi, faStar, faThumbsUp, faWifi, faParking } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@mui/material';

function Payment() {
    const [reservation, setReservation] = useState({
        come: '',
        go: '',
        totalDays: '',
        paid: '',
        id: '',
        price: '',
        rooms: '',
        tax: '',
        total: ''
    })
    const [payment, setPayment] = useState({
        curency: '',
        method: '',
        intent: '',
        description: ''
    })
    const [modal, setModal] = useState(false);
    const location = useLocation();
    const infoReserve = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        if (!infoReserve) {
            navigate("/")
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/${infoReserve.reservation}`);
                if (response.data !== null)
                    setReservation(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        setPayment(pre => {
            return { ...pre, curency: 'USD', method: 'Paypal', intent: 'Sale', description: 'Payment for Rocky Hotels reservation.' }
        })

        fetchData();
    }, [])

    const createOrder = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/reservation/create-paypal-order", {
                id: infoReserve.reservation,
                total: infoReserve.total,
            })
            if (response.data !== null) return response.data.id;

        } catch (error) {
            console.log(error)
        }
    }
    const onApprove = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/reservation/capture-paypal-order", {
                paymentId: data.orderID,
                total: infoReserve.total,
                id: infoReserve.reservation
            })
            if (response.data !== null) {
                toast.success("Thanks for using our service!")
                navigate('/')
            }
        }
        catch (error) {

        }
    }

    const handleOpenModal = () => {
        setModal(true)
    }
    const handleCloseModal = () => {
        setModal(false)
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        date.setDate(date.getDate() + 1)

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const formattedDate = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;

        return formattedDate;
    }

    function countDaysToTargetDate(targetDate) {
        const target = new Date(targetDate);
        const currentDate = new Date();
        const differenceMs = target - currentDate;
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        return differenceDays;
    }

    function formatDateShort(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    }



    return (
        <div className={style.parent}>
            <div className={style.container}>
                <div className={style.totalValue}>
                    <div className={style.advertisement}>
                        <div className={style.rating}>
                            <div className={style.title}>Hotel</div>
                            <div className={style.stars}>
                                <FontAwesomeIcon icon={faStar} className={style.icon} />
                                <FontAwesomeIcon icon={faStar} className={style.icon} />
                                <FontAwesomeIcon icon={faStar} className={style.icon} />
                                <FontAwesomeIcon icon={faStar} className={style.icon} />
                            </div>
                            <FontAwesomeIcon icon={faThumbsUp} className={style.like} />
                        </div>
                        <div className={style.name}>Rocky Hotels</div>
                        <div className={style.address}>3/2 Street, Xuan Khanh Ward, Ninh Kieu District, Can Tho City, Vietnam</div>
                        <div className={style.slogan}>
                            <div className={style.score}>9.1</div>
                            <div className={style.compliment}>Superb</div>
                            <div className={style.wifi}><FontAwesomeIcon icon={faWifi} /> Free wifi</div>
                            <div className={style.parking}><FontAwesomeIcon icon={faParking} /> Parking</div>
                        </div>

                    </div>
                    <div className={style.bookingDetail}>
                        <div className={style.header}>
                            Your booking details
                        </div>
                        <div className={style.check}>
                            <div className={style.checkIn}>
                                <div className={style.title}>Check-in</div>
                                <div className={style.date}>{formatDate(reservation.come)}</div>
                                <div className={style.time}>From 14:00</div>
                            </div>
                            <div className={style.checkOut}>
                                <div className={style.title}>Check-out</div>
                                <div className={style.date}>{formatDate(reservation.go)}</div>
                                <div className={style.time}>Until: 12:00</div>
                            </div>
                        </div>
                        <div className={`${style.warning} ${countDaysToTargetDate(reservation.come) < 7 && style.near}`}>
                            <FontAwesomeIcon icon={faCircleInfo} className={style.icon} />
                            {(countDaysToTargetDate(reservation.come) > 7 && 'About ') || 'Just '}
                            {countDaysToTargetDate(reservation.come)} days away
                        </div>
                        <div className={style.days}>
                            Total length of stay:
                            <div className={style.totalDays}>{reservation.totalDays} nights</div>
                        </div>
                    </div>
                    <div className={style.priceSumary}>
                        <div className={style.header}>
                            <div className={style.title}>Your price summary</div>
                            <div className={style.content}>
                                <div>Price</div>
                                <div>
                                    <div className={style.total}>${reservation.total}</div>
                                    <div className={style.description}>Includes taxes and charges</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.body}>
                            <div className={style.title}>
                                Price information
                            </div>
                            <div className={style.item}>
                                <FontAwesomeIcon icon={faMoneyBills} className={style.icon} />
                                <div className={style.description}>Includes $ {reservation.tax} in 5% taxes and charges</div>
                            </div>
                            <div className={style.item}>
                                <FontAwesomeIcon icon={faInfo} className={style.icon} />
                                <div className={style.description}>
                                    Damage deposit $ {reservation.tax / 2} (Fully refundable)
                                </div>
                            </div>
                        </div>
                        <div className={style.footer}>
                            <div className={style.title}>Benefits included</div>
                            <div>
                                <FontAwesomeIcon icon={faTaxi} className={style.icon} /> Free airport taxi
                            </div>
                        </div>
                    </div>
                    <div className={style.paymentSchedule}>
                        <div className={style.title}>Your payment schedule</div>
                        <div className={style.description}>You will be charged a prepayment of the total price of the reservation right after your confirmation.</div>
                    </div>
                    <div className={style.cancelCost}>
                        <div className={style.title}>How much will it cost to cancel?</div>
                        <div className={style.body}>Free cancellation until {formatDateShort(reservation.come)}</div>
                        <div className={style.price}>
                            <div>
                                From 00:00 on {formatDateShort(reservation.come)}
                            </div>
                            <div>
                                ${reservation.total / 2}
                            </div>
                        </div>
                    </div>


                </div>
                <div className={style.info}>
                    <div className={style.content}>
                        <div className={style.header}>
                            <div className={style.title}>Make final payment</div>
                            <div className={style.nocard}>
                                <Button onClick={handleOpenModal}><FontAwesomeIcon icon={faQuestionCircle} className={style.icon} />No card?</Button>
                            </div>
                        </div>
                        <div className={style.guarantee}>
                            <FontAwesomeIcon icon={faCircleInfo} className={style.icon} />
                            You need to complete payment to guarantee your booking.
                        </div>
                        <div className={style.inputs}>
                            <TextField label='Total' value={reservation.total} className={style.formControl} disabled />
                            <TextField label='Curency' value={payment.curency} className={style.formControl} disabled />
                            <TextField label='Payment method' value={payment.method} className={style.formControl} disabled />
                            <TextField label='Intent' value={payment.intent} className={style.formControl} disabled />
                            <TextField label='Description' value={payment.description} className={style.formControl} disabled />
                        </div>
                        <div className={style.body}>
                            <div className={style.title}>Accepted cards</div>
                            <div className={style.icons}>
                                <FontAwesomeIcon icon={faCcVisa} className={style.visa} />
                                <FontAwesomeIcon icon={faCcAmex} className={style.amex} />
                                <FontAwesomeIcon icon={faCcMastercard} className={style.masterCard} />
                                <FontAwesomeIcon icon={faCcDiscover} className={style.discover} />
                            </div>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <FormGroup className={style.formCheckbox}>
                            <FormControlLabel control={<Checkbox />} label="I consent to receiving marketing emails from Booking.com, including promotions, rewards, travel experiences and information about Booking.com’s products and services." />
                            <FormControlLabel control={<Checkbox />} label="I consent to receiving marketing emails from Booking.com, including promotions, rewards, travel experiences and information about Booking.com Transport Limited’s products and services." />
                        </FormGroup>
                        <div className={style.confirm}>
                            Your booking is with Rocky Hotel directly and by completing this booking you agree to the <div className={style.condition}>booking conditions</div>, <div className={style.term}>general terms</div>, and <div className={style.policy}>privacy policy</div>.
                        </div>
                    </div>
                    <div className={style.payBtn}>
                        <div className={style.btn}>
                            <PayPalScriptProvider options={{ clientId: "AWJN8uzl55bfKeR4Q2fjVDrpTnArGbmRoIqa-6fHRY-0QHzAfviY0c9lgbuDtogtUI__jdvvZ14Ptf-t" }}>
                                <PayPalButtons
                                    className={style.payBtn}
                                    style={{ layout: "horizontal" }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                />
                            </PayPalScriptProvider>
                        </div>

                    </div>
                </div>
                <Modal
                    open={modal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bolder' }}>
                            Can I make a reservation without a paypal account?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            A valid paypal account is needed to guarantee your reservation with most properties.
                            You can provide other's paypal account to do reserve.
                            However, that will guarantee your reservation within your account.
                            You can also make a booking using someone else’s account provided you have their permission.
                        </Typography>
                    </Box>
                </Modal>

            </div>
            <div className={style.containerFooter}>
                <div className={style.container}>
                    <div className={style.wrapper}>
                        <div className={style.footerWrapperItem}>About Booking.com</div>
                        <div className={style.footerWrapperItem}>Customer Service help</div>
                        <div className={style.footerWrapperItem}>Terms & Conditions</div>
                        <div className={style.footerWrapperItem}>Privacy & Cookie Statement</div>
                    </div>
                    <div className={style.copyRight}>Copyright © 1996–2024 rocky.hotels.com. All rights reserved.</div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
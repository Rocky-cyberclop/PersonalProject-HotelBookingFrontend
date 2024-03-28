/* eslint-disable */
import style from './FillInfo.module.scss'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, FormGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faMoneyBills,
    faInfo, faTaxi,
    faStar, faThumbsUp,
    faWifi, faParking,
    faMugSaucer, faUserGroup,
    faCheck, faHandSparkles,
    faBanSmoking, faRulerCombined,
    faPersonSwimming, faCity,
    faSnowflake, faBath,
    faTv, faVolumeOff,
    faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

function FillInfo() {

    const location = useLocation();
    const infoReserve = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        if (!infoReserve) {
            navigate("/")
        }
    }, [])

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
    const [adult, setAdult] = useState({ name: '', email: '', phone: '' })
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [helperText, setHelperText] = useState({ email: '', phone: '', name: '' })
    const [validInput, setValidInput] = useState({ email: false, phone: false, name: false })
    const [adults, setAdults] = useState([]);


    useEffect(() => {
        if (infoReserve && infoReserve.adults) {
            const initialAdultsState = Array.from({ length: infoReserve.adults - 1 }, () => ({
                name: '',
                phone: ''
            }));
            setAdults(initialAdultsState);
        }
    }, [infoReserve]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/${infoReserve.reservation}`);
                if (response.data !== null)
                    setReservation(response.data);
                fetchGuest()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchGuest = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/guests/${infoReserve.reservation}`);
                if (response.data !== null) {
                    const [customer, ...adults] = response.data
                    setAdult(customer)
                    setAdults(adults)
                    setAdult(pre => {
                        const { _id, ...remain } = pre
                        return remain
                    })
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchCountries = async () => {
            const response = await axios.get('https://restcountries.com/v3.1/all')
            if (response.data !== null)
                setCountries(response.data.map((item) => (
                    { name: item.name.common }
                )))
            setCountries(pre => {
                const sortedCountries = pre.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                return sortedCountries

            })
            setCountry('Vietnam')
        }
        fetchData();
        fetchCountries()
    }, []);

    const handleAdultInputChange = (property, value) => {
        setAdult({ ...adult, [property]: value });
        setHelperText({ name: '', email: '', phone: '' })
    };

    const handleInputChange = (index, property, value) => {
        const newAdults = [...adults];
        newAdults[index] = { ...newAdults[index], [property]: value };
        setAdults(newAdults);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleSubmit = () => {
        const isAnyAdultPropertyBlank = Object.values(adult).some(value => {
            return value.trim() === ''
        });

        if (isAnyAdultPropertyBlank) {
            toast.error('Please fill out all the your informations section.')
            if (adult.name.trim() === '') setHelperText((pre) => ({ ...pre, name: 'Name can not be blank' }))
            if (adult.phone.trim() === '') { setHelperText((pre) => ({ ...pre, phone: 'Phone can not be blank' })) }
            if (adult.email.trim() === '') { setHelperText((pre) => ({ ...pre, email: 'Email can not be blank' })) }
            setValidInput({ name: false, email: false, phone: false })

        }
        else {
            setHelperText((pre) => ({ ...pre, name: '' }))
            setValidInput((pre) => ({ ...pre, name: true }))
            if (!isValidPhoneNumber(adult.phone)) {
                setValidInput((pre) => ({ ...pre, phone: false }))
            }
            else {
                setHelperText((pre) => ({ ...pre, phone: '' }))
                setValidInput((pre) => ({ ...pre, phone: true }))
            }
            if (!isValidEmail(adult.email)) {
                setValidInput((pre) => ({ ...pre, email: false }))
            }
            else {
                setHelperText((pre) => ({ ...pre, email: '' }))
                setValidInput((pre) => ({ ...pre, email: true }))
            }
        }
        setValidInput(pre => {
            if (pre.name && pre.phone && pre.email) {
                const submit = async () => {
                    try {
                        const response = await axios.post(`http://localhost:8080/api/reservation/${infoReserve.reservation}`,
                            [adult, ...adults]);
                        if (response.data !== null)
                            navigate('/payment', {
                                state: {
                                    reservation: response.data,
                                    total: reservation.total
                                }
                            })
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };
                submit();
            }
            return pre
        })

    };

    const isValidEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        setHelperText((pre) => ({ ...pre, email: 'Email is not in right format' }))
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        setHelperText((pre) => ({ ...pre, phone: 'Phone is not in right format' }))
        return phoneRegex.test(phone);
    };

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

    function countElementsFromString(str) {
        // Remove the square brackets and any extra spaces
        str = str.replace(/\[|\]|\s/g, '');

        // Split the string into an array using comma as the delimiter
        const elements = str.split(',');

        // Remove any empty elements resulting from trailing commas
        const filteredElements = elements.filter(element => element.trim() !== '');

        // Return the length of the resulting array
        return filteredElements.length;
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
                        <div className={style.selected}>
                            <div className={style.title}>You selected</div>
                            <div className={style.description}>
                                {countElementsFromString(reservation.rooms)} rooms for {infoReserve.adults} adults
                            </div>
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

                </div>
                <div className={style.info}>
                    <div className={style.content}>
                        <div className={style.header}>
                            <div className={style.title}>Enter your details</div>
                        </div>
                        <div className={style.guarantee}>
                            <FontAwesomeIcon icon={faCircleInfo} className={style.icon} />
                            Almost done! Just fill in the required info
                        </div>
                        <div className={style.inputs}>
                            <TextField
                                className={style.formControl}
                                error={!(helperText.name === '')}
                                helperText={helperText.name}
                                id="outlined-error-helper-text"
                                variant="outlined"
                                label="Full name"
                                name='name'
                                value={adult.name}
                                onChange={(e) => handleAdultInputChange('name', e.target.value)}
                            />
                            <div className={style.formControl}>
                                <TextField
                                    fullWidth
                                    error={!(helperText.phone === '')}
                                    helperText={helperText.phone}
                                    id="outlined-error-helper-text"
                                    variant="outlined"
                                    label="Phone number"
                                    name='phone'
                                    value={adult.phone}
                                    onChange={(e) => handleAdultInputChange('phone', e.target.value)}
                                />
                                <div className={style.explain}>Needed by the property to validate your booking</div>
                            </div>
                            <div className={style.formControl}>
                                <TextField
                                    fullWidth
                                    error={!(helperText.email === '')}
                                    helperText={helperText.email}
                                    id="outlined-error-helper-text"
                                    variant="outlined"
                                    label="Email"
                                    name='email'
                                    value={adult.email}
                                    onChange={(e) => handleAdultInputChange('email', e.target.value)}
                                />
                                <div className={style.explain}>Reservation's Id email goes to this address</div>
                            </div>
                            <FormControl className={`${style.formControl} ${style.select}`}>
                                <InputLabel id="demo-simple-select-label">Country/Region</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Country/Region"
                                    fullWidth
                                    value={country}
                                    onChange={handleCountryChange}
                                >
                                    {countries && countries.map((item, index) => (
                                        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>

                                    ))}
                                </Select>
                            </FormControl>
                            <div className={`${style.formControl} ${style.checkbox}`}>
                                <Checkbox id='checkBoxPaperless' checked disableFocusRipple />
                                <label htmlFor='checkBoxPaperless' className={style.checkboxExplain}>I'd like free paperless confirmation (recommended)</label>
                            </div>
                        </div>


                    </div>
                    {adults.map((adult, index) => (
                        <div className={style.guest} key={index}>
                            <div className={style.title}>Junior Suite For Guest</div>
                            <div className={style.adver}>
                                <div className={style.breakfast}>
                                    <FontAwesomeIcon icon={faMugSaucer} className={style.icon} />
                                    <div className={style.description}>
                                        <div>Breakfast included in the price</div>
                                        <div>9.1 Superb</div>
                                    </div>
                                </div>
                                <div className={style.cancel}>
                                    <FontAwesomeIcon icon={faCheck} className={style.icon} />
                                    <div className={style.cancelFree}>Free cancellation</div>
                                    <div className={style.cancelDate}>before {formatDateShort(reservation.come)}</div>
                                </div>
                                <div className={style.numberOfGuest}>
                                    <FontAwesomeIcon icon={faUserGroup} className={style.icon} />
                                    <div className={style.numberOfGuestTitle}>Guests:</div><div> 1-3 adults</div>
                                </div>
                                <div className={style.spotless}>
                                    <FontAwesomeIcon icon={faHandSparkles} className={style.icon} /><div className={style.spotlessDescription}>Spotless rooms</div>
                                </div>
                                <div className={style.noSmoke}>
                                    <FontAwesomeIcon icon={faBanSmoking} className={style.icon} /><div className={style.noSmokeDescription}>No smoking</div>
                                </div>
                                <div className={style.advances}>
                                    <div className={style.item}>
                                        <FontAwesomeIcon icon={faRulerCombined} className={style.icon} />55 m²
                                    </div>
                                    <div className={style.item}>
                                        <FontAwesomeIcon icon={faPersonSwimming} className={style.icon} />Pool view
                                    </div>
                                    <div className={style.item}>
                                        <FontAwesomeIcon icon={faCity} className={style.icon} />Pool view
                                    </div>
                                    <div className={style.item}>
                                        <FontAwesomeIcon icon={faSnowflake} className={style.icon} />Air conditioning
                                    </div>
                                    <div className={style.item}>
                                        <FontAwesomeIcon icon={faBath} className={style.icon} />Private bathroom
                                    </div>
                                    <div className={style.item}>
                                        <FontAwesomeIcon icon={faTv} className={style.icon} />Flat-screen TV
                                    </div>
                                    <div className={style.item}>
                                        <FontAwesomeIcon icon={faVolumeOff} className={style.icon} />Soundproofing
                                    </div>
                                </div>
                            </div>
                            <div className={style.guestInfo}>
                                <TextField
                                    className={style.formControl}
                                    id="outlined-error-helper-text"
                                    variant="outlined"
                                    label="Full name"
                                    name='name'
                                    value={adult.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                />
                                <div className={style.formControl}>
                                    <TextField
                                        fullWidth
                                        id="outlined-error-helper-text"
                                        variant="outlined"
                                        label="Phone number"
                                        name='phone'
                                        value={adult.phone}
                                        onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                                    />
                                    <div className={style.guarantee}>Phone number are only used for sending reservation information. No commercial messages – <div className={style.guaranteed}>guaranteed</div>.</div>
                                </div>
                            </div>

                        </div>
                    ))}
                    <div className={style.arrivalTime}>
                        <div className={style.title}>Your arrival time</div>
                        <div className={style.checkIn}><FontAwesomeIcon icon={faCircleCheck} className={style.icon} />Your rooms will be ready for check-in at 14:00</div>
                        <div className={style.helpDesk}><FontAwesomeIcon icon={faUserTie} className={style.icon} />24-hour front desk – Help whenever you need it!</div>
                        <div className={style.timezone}>Time is for Ho Chi Minh City time zone</div>
                    </div>
                    <div className={style.footer}>
                        <Button
                            style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={reservation.paid === "true"}
                        >
                            {((reservation.paid === "false") && "Final step: Deposit") || "Deposited"}
                        </Button>
                    </div>

                </div>
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

export default FillInfo
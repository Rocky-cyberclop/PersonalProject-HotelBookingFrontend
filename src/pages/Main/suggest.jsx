/* eslint-disable */
import React, { useEffect, useState } from 'react'
import style from './Main.module.scss';
import { Checkbox, FormControlLabel, Button, Pagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar, faThumbsUp, faArrowDownWideShort
} from '@fortawesome/free-solid-svg-icons';
import RatingScore from './ratingScore';
import axios from 'axios';

import slide1 from '../../assets/images/slide1.jpeg'
import slide2 from '../../assets/images/slide2.jpeg'
import slide3 from '../../assets/images/slide3.jpeg'


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
    const [rooms, setRooms] = useState([])
    const [condition, setCondition] = useState({ page: 1, filterArray: [] })
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/reservation/chooseRoomOldConcept`,
                    {
                        from: dateRange.checkInDate,
                        to: dateRange.checkOutDate,
                        page: condition.page,
                        filter: condition.filterArray,
                        adults: people.adults,
                        children: people.children,
                        numberOfRoom: people.room
                    }
                );
                setDataFound([])
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        }
        fetchData()
    }, [condition?.filterArray, condition?.page])
    const handleChooseThisRoom = (number) => {
        const existed = rooms.indexOf(number)
        if (existed === -1) {
            setRooms(pre => ([...pre, number]))
        }
        else {
            setRooms(pre => pre.filter(item => item !== number))
        }
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
                            <div className={style.suggestionsNumber}>Can Tho: 24 properties found</div>
                            <div className={style.suggestionsSortBy}>
                                <FontAwesomeIcon icon={faArrowDownWideShort} className={style.suggestionsSortByIcon} />Sort by: closest relate
                            </div>
                        </div>
                        <div className={style.pickYourOwn}>
                            <span className={style.pickYourOwnNotFound}>Not found your favorite?</span>
                            <button className={style.pickYourOwnChoose} onClick={handleChooseOwn}>Choose more ways out!</button>

                        </div>
                    </div>
                    <div className={`${style.room} ${style.firstSuggest}`}>
                        <div className={style.roomImage}><img src={slide1} className={style.roomImg} alt='pic' /></div>
                        <div className={style.roomText}>
                            <div className={style.rating}>
                                <div className={style.titleRating}>Silverland Sakyo Hotel</div>
                                <div className={style.stars}>
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                </div>
                                <FontAwesomeIcon icon={faThumbsUp} className={style.like} />
                            </div>
                            <div className={style.roomTextBody}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </div>
                        </div>
                        <div className={style.roomReserve}>
                            <div className={style.roomReserveRating}>
                                <RatingScore />
                                <div className={style.score}>9.1</div>

                            </div>
                            <div className={style.roomReserveLocation}>Location 9.3</div>
                            <div className={style.roomReservePrice}>$500</div>
                            <div className={style.roomReserveButton}>
                                <Button
                                    style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                                    variant="contained"
                                    onClick={() => { handleChooseThisRoom(1) }}
                                >{!rooms.includes(1) ? 'Reserve' : 'Unreserve'}</Button>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.room}`}>
                        <div className={style.roomImage}><img src={slide2} className={style.roomImg} alt='pic' /></div>
                        <div className={style.roomText}>
                            <div className={style.rating}>
                                <div className={style.titleRating}>Silverland Sakyo Hotel</div>
                                <div className={style.stars}>
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                </div>
                                <FontAwesomeIcon icon={faThumbsUp} className={style.like} />
                            </div>
                            <div className={style.roomTextBody}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </div>
                        </div>
                        <div className={style.roomReserve}>
                            <div className={style.roomReserveRating}>
                                <RatingScore />
                                <div className={style.score}>9.1</div>

                            </div>
                            <div className={style.roomReserveLocation}>Location 9.3</div>
                            <div className={style.roomReservePrice}>$500</div>
                            <div className={style.roomReserveButton}>
                                <Button
                                    style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                                    variant="contained"
                                    onClick={() => { handleChooseThisRoom(2) }}
                                >{!rooms.includes(2) ? 'Reserve' : 'Unreserve'}</Button>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.room}`}>
                        <div className={style.roomImage}><img src={slide3} className={style.roomImg} alt='pic' /></div>
                        <div className={style.roomText}>
                            <div className={style.rating}>
                                <div className={style.titleRating}>Silverland Sakyo Hotel</div>
                                <div className={style.stars}>
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                    <FontAwesomeIcon icon={faStar} className={style.icon} />
                                </div>
                                <FontAwesomeIcon icon={faThumbsUp} className={style.like} />
                            </div>
                            <div className={style.roomTextBody}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </div>
                        </div>
                        <div className={style.roomReserve}>
                            <div className={style.roomReserveRating}>
                                <RatingScore />
                                <div className={style.score}>9.1</div>

                            </div>
                            <div className={style.roomReserveLocation}>Location 9.3</div>
                            <div className={style.roomReservePrice}>$500</div>
                            <div className={style.roomReserveButton}>
                                <Button
                                    style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                                    variant="contained"
                                    onClick={() => { handleChooseThisRoom(3) }}
                                >{!rooms.includes(3) ? 'Reserve' : 'Unreserve'}</Button>
                            </div>
                        </div>
                    </div>
                    <Pagination onChange={(_, value) => {
                        setCondition(pre => ({ ...pre, page: value }))
                    }} count={10} shape="rounded" />
                </div>
            </div>
        </div>
    )
}

export default SuggestPage
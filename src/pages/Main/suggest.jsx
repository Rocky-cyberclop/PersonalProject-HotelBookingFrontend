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
import Img from './img';
import { toast } from 'react-toastify';


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
    const [condition, setCondition] = useState({ page: 1, filterArray: [], totalPage: 0, totalValue: 0 })
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
                        page: condition.page - 1,
                        filter: condition.filterArray,
                        adults: people.adults,
                        children: people.children,
                        numberOfRoom: 10
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
        dateRange.checkInDate, dateRange.checkOutDate,
        people.room
    ])
    const handleChooseThisRoom = (number) => {
        const existed = rooms.indexOf(number)
        if (existed === -1) {
            if (rooms.length < people.room) { setRooms(pre => ([...pre, number])) }
            else {
                toast.warning("You have chosen enough room!")
            }
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
                            <div className={style.suggestionsNumber}>Can Tho: {condition.totalValue} properties found</div>
                            <div className={style.suggestionsSortBy}>
                                <FontAwesomeIcon icon={faArrowDownWideShort} className={style.suggestionsSortByIcon} />Sort by: closest related
                            </div>
                        </div>
                        <div className={style.pickYourOwn}>
                            <span className={style.pickYourOwnNotFound}>Not found your favorite?</span>
                            <button className={style.pickYourOwnChoose} onClick={handleChooseOwn}>Choose more ways out!</button>

                        </div>
                    </div>
                    {
                        dataFound?.map((item, index) => (
                            <div className={`${style.room} ${index === 0 ? style.firstSuggest : ''}`}>
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
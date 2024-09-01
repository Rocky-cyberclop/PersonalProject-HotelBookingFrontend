import React, { useState } from 'react'
import style from './Main.module.scss';
import { Checkbox, FormControlLabel, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar, faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import slide1 from '../../assets/images/slide1.jpeg'
import slide2 from '../../assets/images/slide2.jpeg'
import slide3 from '../../assets/images/slide3.jpeg'

const compliments = ['Fabulous', 'Very good', 'Superb', 'Good']

const roomType = [
    { title: 'Classic room', value: '0' },
    { title: 'Couple room', value: '1' },
    { title: 'Extra large room', value: '2' },
]
const utilities = [
    { title: 'Television', value: '3' },
    { title: 'Free wifi', value: '4' },
    { title: 'Fridge', value: '5' },
    { title: 'A bathtub', value: '6' },
    { title: 'Single bed beside double bed', value: '7' },
]
const capacities = [
    { title: 'One person', value: '8' },
    { title: 'Two person', value: '9' },
    { title: 'Three person', value: '10' },
]

const SuggestPage = () => {
    const [filter, setFilter] = useState([])
    const HandleChosseFilter = (e) => {
        const existed = filter.indexOf(e.target.value)
        if (existed === -1) {
            setFilter(pre => [...pre, e.target.value])
        }
        else {
            setFilter(pre => pre.filter(item => item !== e.target.value))
        }
        // console.log(filter)
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
                                <div className={style.ratingText}>
                                    <div>{compliments.at(Math.floor(Math.random() * 4))}</div>
                                    <div className={style.ratingScore}>{Math.round(Math.random(1, 100) * 1000)} reviews</div>
                                </div>
                                <div className={style.score}>9.1</div>

                            </div>
                            <div className={style.roomReserveLocation}>Location 9.3</div>
                            <div className={style.roomReservePrice}>$500</div>
                            <div className={style.roomReserveButton}>
                                <Button
                                    style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                                    variant="contained"
                                >Reserve</Button>
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
                                <div className={style.ratingText}>
                                    <div>{compliments.at(Math.floor(Math.random() * 4))}</div>
                                    <div className={style.ratingScore}>{Math.round(Math.random(1, 100) * 1000)} reviews</div>
                                </div>
                                <div className={style.score}>9.1</div>

                            </div>
                            <div className={style.roomReserveLocation}>Location 9.3</div>
                            <div className={style.roomReserveButton}>
                                <Button
                                    style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                                    variant="contained"
                                >Reserve</Button>
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
                                <div className={style.ratingText}>
                                    <div>{compliments.at(Math.floor(Math.random() * 4))}</div>
                                    <div className={style.ratingScore}>{Math.round(Math.random(1, 100) * 1000)} reviews</div>
                                </div>
                                <div className={style.score}>9.1</div>

                            </div>
                            <div className={style.roomReserveLocation}>Location 9.3</div>
                            <div className={style.roomReserveButton}>
                                <Button
                                    style={{ backgroundColor: 'rgb(36, 36, 168)' }}
                                    variant="contained"
                                >Reserve</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestPage
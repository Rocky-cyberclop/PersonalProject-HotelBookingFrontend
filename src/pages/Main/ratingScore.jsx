/* eslint-disable */
import React, { useRef } from 'react'
import style from './Main.module.scss';

const compliments = ['Fabulous', 'Very good', 'Superb', 'Good']

const RatingScore = () => {
    const compliment = useRef(compliments.at(Math.floor(Math.random() * 4)))
    const score = useRef(Math.round(Math.random(1, 100) * 1000))
    return (
        <div className={style.ratingText}>
            <div>{compliment.current}</div>
            <div className={style.ratingScore}>{score.current} reviews</div>
        </div>
    )
}

export default RatingScore
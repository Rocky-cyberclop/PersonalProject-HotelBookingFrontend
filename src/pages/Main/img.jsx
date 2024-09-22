import React, { useEffect, useRef, useState } from 'react'
import style from './Main.module.scss';

import slide1 from '../../assets/images/slide1.jpeg'
import slide2 from '../../assets/images/slide2.jpeg'
import slide3 from '../../assets/images/slide3.jpeg'
import slide4 from '../../assets/images/slide4.jpeg'
import slide5 from '../../assets/images/slide5.jpeg'
import slide6 from '../../assets/images/slide6.jpeg'
import slide7 from '../../assets/images/slide7.jpeg'
import slide8 from '../../assets/images/slide8.jpeg'

const imgs = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8]
const Img = ({ change }) => {
    const [image, setImage] = useState(imgs.at(Math.floor(Math.random() * 4)))
    useEffect(() => {
        setImage(imgs.at(Math.floor(Math.random() * 4)))
    }, [change])
    return (
        <div className={style.roomImage}><img src={image} className={style.roomImg} alt='pic' /></div>
    )
}

export default Img
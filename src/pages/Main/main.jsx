/* eslint-disable */
import React from 'react'
import style from './Main.module.scss';
import { Button } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import Comment from './Comment';
import 'react-alice-carousel/lib/alice-carousel.css';

import card1 from '../../assets/images/why1.webp'
import card2 from '../../assets/images/why2.webp'
import card3 from '../../assets/images/why3.webp'
import slide1 from '../../assets/images/slide1.jpeg'
import slide2 from '../../assets/images/slide2.jpeg'
import slide3 from '../../assets/images/slide3.jpeg'
import slide4 from '../../assets/images/slide4.jpeg'
import slide5 from '../../assets/images/slide5.jpeg'
import slide6 from '../../assets/images/slide6.jpeg'
import slide7 from '../../assets/images/slide7.jpeg'
import slide8 from '../../assets/images/slide8.jpeg'

const responsive = {
    0: { items: 1 },
    256: { items: 2 },
    512: { items: 3 },
    1024: { items: 4 },
};

const MainPage = () => {

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
    <div className='advertise'>
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
                            <Button style={{ backgroundColor: '#195bbe', color: 'aliceblue' }}
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
            </div>
  )
}

export default MainPage
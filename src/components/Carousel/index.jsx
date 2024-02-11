import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from '@mui/system';

// Styles for the slider container
const StyledSlider = styled(Slider)({
    width: '100%',
    '& .slick-slide img': {
        width: '100%',
    },
});

function CarouselComponent({ images }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <StyledSlider {...settings}>
            {images && images.map((image, index) => (
                <div key={index}>
                    <img src={image} style={{ width: '300px' }}  alt={`Slide ${index}`} />
                </div>
            ))}
        </StyledSlider>
    );
}

export default CarouselComponent;

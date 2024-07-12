import React, { useState } from 'react';
import { images } from './CarouselData';
import '../styles/Carousel.css';
function Carousel() {
     // 'currentImg' holds the index of the current image displayed in the carousel.
    const [currentImg, setCurrentImg] = useState(0);

    const goToNext = () => {
          // Check if the current image is the last one in our list of images. If yes, then start again from the first image.
    // If not, just move to the next image by increasing the image index by one.
        setCurrentImg(currentImg === images.length - 1 ? 0 : currentImg + 1);
    };

    const goToPrev = () => {
         // Check if the current image is the first one. If yes, then jump to the last image in the list.
    // If not, go back to the previous image by reducing the image index by one.
        setCurrentImg(currentImg === 0 ? images.length - 1 : currentImg - 1);
    };

    return (
        <div className='carousel'>
            <div className='carouselInner'
                style={{ backgroundImage: `url(${images[currentImg].img})` }}>
                <div className="carousel-content">
                    <h1>{images[currentImg].title}</h1>
                    <p>{images[currentImg].subtitle}</p>
                </div>
                <span onClick={goToPrev} className="carousel-control-prev">&#10094;</span>
                <span onClick={goToNext} className="carousel-control-next">&#10095;</span>
            </div>
        </div>
    );
}

export default Carousel;
import React from 'react';
import './Banner.css';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SlideF from './Images/slide1.jpg';
import SlideS from './Images/slide2.jpg';
import SlideT from './Images/slide3.jpg';

function Banner() {
    return (
        <div className="banner">
            <div className="container"/>
            <Carousel 
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    <img src={SlideF} alt="backgroundImage" className="backgroundImage" />
                </div>

                <div>
                    <img src={SlideS} alt="backgroundImage" className="backgroundImage" />
                </div>
            
                <div>
                    <img src={SlideT} alt="backgroundImage" className="backgroundImage" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner

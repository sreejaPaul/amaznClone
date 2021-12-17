import React from 'react';
import './Homebody.css';
import Product from './Product';
import Banner from './Banner';
import ProductFeed from './ProductFeed';

export default function Homebody() {

    return (
        <div className="home">
            <div className="homeContainer">
                <Banner/>
                <ProductFeed/>
            </div>
        </div>
    )
}

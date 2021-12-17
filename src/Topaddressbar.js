import React from 'react';
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import './Topbaraddress.css';

function Topaddressbar() {
    return (
        <div className="headerAddress">
            <LocationOnOutlinedIcon className="headerLocationIcon" />

            <div className="headerAddressnav">
                <div className="headerAddressoption">
                    <span className="headerAddressoptionOne">Deliver to</span>
                    <span className="headerAddressoptionTwo">India</span>
                </div>

                <div className="headerAddressoption__one">
                    <span className="headerAddressoption__one__two">Today's Deals</span>
                    <span className="headerAddressoption__one__two">Customer Service</span>
                    <span className="headerAddressoption__one__two">Gift Cards</span>
                    <span className="headerAddressoption__one__two">Registry</span>
                    <span className="headerAddressoption__one__two">Sell</span>
                </div>
            </div>
        </div>
    )
}

export default Topaddressbar;

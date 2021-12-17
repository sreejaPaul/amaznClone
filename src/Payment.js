import React, {useState, useEffect} from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link ,useNavigate} from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import {db} from './firebase';

function Payment() {
    const [{ basket, user, address, filteredBasket }, dispatch] = useStateValue();
    const history = useNavigate();

    const buy = ()=>{
        db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(user?.uid + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 60))
        .set({
            basket : filteredBasket,
            amount: getBasketTotal(basket),
            created: new Date()
        });
        dispatch({
            type: 'EMPTY_BASKET',
        })
        history("/orders", { replace: true })
    }

    useEffect(()=>{
        console.log(filteredBasket)
    },[filteredBasket]);

    return (
        <div>
            <div className='payment'>
                <div className='payment__container'>
                    <h1>
                        Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                    </h1>


                    {/* Payment section - delivery address */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3>Delivery Address Details</h3>
                        </div>
                        <div className='payment__address'>
                            {(address !== null) ?
                                <div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Email  </b></div>
                                        <div className="indiv2">{user?.email}</div>
                                    </div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Contact Number </b></div>
                                        <div className="indiv2">{address.Number}</div>
                                    </div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Address  </b></div>
                                        <div className="indiv2">{address.Address + "," + address.City + "," + address.State}</div>
                                    </div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Pincode  </b></div>
                                        <div className="indiv2">{address.Pin}</div>
                                    </div>
                                </div> : ""}
                        </div>
                    </div>

                    {/* Payment section - Review Items */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3>Review items and delivery</h3>
                        </div>
                        <div className='payment__items'>
                            {filteredBasket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    count={item.count}
                                />
                            ))}
                        </div>
                    </div>


                    {/* Payment section - Payment method */}
                    <div className='payment__section'>
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            <h3>Pay On Delivery</h3>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                            />
                            <button onClick={buy}>
                                {"Buy Now"}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment

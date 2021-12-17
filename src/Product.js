import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import {Button} from '@material-ui/core';

export default function Product({id, title, price, description, category, image, rating}) {
    const[{basket},dispatch] = useStateValue();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const action = key => (
        
            <Button onClick={() => { closeSnackbar(key) }}>
                <CancelIcon style={{color: "white"}}/>
            </Button>
        
    );
    const addToBasket = ()=>{
        //dispatch the item into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price:price,
                rating: rating
            }
        })
        enqueueSnackbar('Item Added To Cart', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            TransitionComponent: Slide,
            autoHideDuration: 1500,
            action
        });
    }
    return (
        <div className="product">
            <div className="productDetails">
                <p className="productCategory">{category}</p>
                <p style={{marginTop:"0.75rem",marginBottom:"0.75rem", fontWeight:"bold"}}>{title}</p>
            
                <p className="productPrice">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="productRating">
                    {
                        Array(Math.round(rating)).fill().map((_,index)=>{
                            return <p key={index}><StarRateIcon fontSize={"medium"} style={{color: "#f0c14b"}}/></p>
                        })
                    }

                </div>
            </div>
            <img src={image} alt="product" style={{marginTop:"10px"}}/>
            <button onClick={addToBasket}>Add to Basket</button>
            
        </div>
    )
}

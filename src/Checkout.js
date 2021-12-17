import React, {useState, useEffect} from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

export default function Checkout() {
    const [{ basket,user }, dispatch] = useStateValue();
    const [filterArr, setFilterArr] = useState([]);

    useEffect(()=>{
        //get all ids
        const nArray = basket.map((data)=>{
            return data.id
        })
        //filter unique ids
        const uniq = [...new Set(nArray)];
        //filter content of unique ids
        let uniqProd = [];
        for(let i=0;i<uniq.length;i++){
            let f  = basket.find((data)=>{
                return uniq[i] === data.id
            })
            uniqProd = uniqProd.concat(f)
        }
        
        //which id is present how many times
        const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
            obj[e] = (obj[e] || 0) + 1;
            return obj;
          }, {});
          
        const objVal = arrToInstanceCountObj(nArray)
        
        const keys = Object.keys(objVal);
        for(let i=0;i<uniqProd.length;i++){
            for(let j=0;j<keys.length;j++){
                if(uniqProd[i].id === parseInt(keys[j])){
                    uniqProd[i].count = parseInt(objVal[keys[j]]);
                }
            }
        }
        uniqProd.sort((a, b) => {
            return a.id - b.id;
        });
        setFilterArr(uniqProd)
    },[basket,user])

    useEffect(()=>{
        //dispatch the item into data layer
        if(filterArr.length>0){
        dispatch({
            type: 'FILTER_BASKET',
            item: filterArr,
        })
    }
    },[filterArr])

    return (
        <div className="checkout">
            <div className="ckeckoutLeft">
                <img src="https://www.idlenerd.com/wp-content/uploads/2018/06/amazon-prime-day-india-1.gif" alt="" className="checkoutAd" />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkoutTitle">Your Shopping Basket</h2>
                    {
                        filterArr.map((item,index) => (
                            <CheckoutProduct
                                id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} key={index} count={item.count}/>
                        ))
                    }
                </div>
            </div>
            <div className="checkoutRight">
                <Subtotal />
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import './ProductFeed.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductFeed() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setTimeout(()=>{
            axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                console.log(res.data)
                setProducts(res.data)
            })
        },1000);
    }, [])
    return (
        <div>
            {(products.length > 0) ?
                <>
                    <div className="cont">
                        {products.map((data) => (
                            <div style={{ float: "left" }}>
                                <Product key={data.id} id={data.id} title={data.title} price={(Math.ceil(data.price * 80))} description={data.description} category={data.category} image={data.image} rating={data.rating?.rate} />
                            </div>
                        ))}
                    </div>
                </>
                : <>
                    <div style={{display:"flex"}}>
                        {
                            Array(6).fill().map((_, index) => {
                                return <div style={{padding: "20px",margin:"5px"}}><Skeleton height={280} width={200}/><div><Skeleton height={50} width={200}/></div></div>
                            })
                        }
                    </div>
                </>}
        </div>
    )
}

export default ProductFeed

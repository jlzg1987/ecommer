import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartThunk } from '../store/slices/carts.Slice';
import { setIsLoading } from '../store/slices/isLoading.slice';
import getConfig from '../utils/getConfig';

const CounterCart = ({ carts }) => {

    const [counter, setCounter] = useState(carts?.quantity)
    const priceone = parseFloat(carts.product?.price)
    const [prices, setPrices] = useState( parseFloat(priceone))
    const dispatch = useDispatch()

    const more = (id) => {
        setCounter(counter+1)
        setPrices(priceone * counter)
       
    }
    const less = (id) => {
        if (counter ===0) {
            setCounter(1)
            setPrices(priceone* counter)

        } else {
            setCounter(counter - 1)
            setPrices(priceone * counter)
           
        }
    }
    const delitecart = (id) => {
        dispatch(setIsLoading(true));
        axios
            .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`, getConfig())
            .then(() => dispatch(getCartThunk()))
            .finally(() => dispatch(setIsLoading(false)));
    }

    return (
        <div className='cartCouter'>
            <button onClick={less}><i className="fa-solid fa-minus"></i></button>
            <h4>{counter}</h4>
            <button onClick={more}><i className="fa-solid fa-plus"></i></button>
            <h2 className='carth2'> Total:   <span>$ {prices.toFixed(2)}</span></h2>
            <div className='btbDelite'>
                <h5 onClick={() => delitecart(carts.id)}><i className="fa-solid fa-trash-can"></i></h5>
            </div>
           
        </div>
    );
};

export default CounterCart;
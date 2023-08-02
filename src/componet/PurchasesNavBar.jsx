import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, postPurchasesThunk } from '../store/slices/carts.Slice';
import CounterCart from './CounterCart';

const PurchasesNavBar = ({ show, handleClose }) => {
    const purchaseCart = useSelector((state) => state.cart);
    
    let total = 0;
    purchaseCart.forEach(product => {
        const productTotal = Number(product.product.price) * product.quantity;
        total += productTotal;
    })
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])
// console.log(total)
    return (
        <div>
            <Offcanvas placement={"end"} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className='ulCarts'>
                        {
                            purchaseCart.map(carts => (
                                <li className='cartitem' key={carts.id}>
                                    <div className='cartimg'>
                                        <img src={carts.product?.images?.[0].url} alt="" />
                                    </div>
                                    <h3>{carts.product?.title}</h3>
                                    <CounterCart carts={carts} />
                                </li>

                            ))
                        }

                      
                    </ul>

                </Offcanvas.Body>  
                
                    <div className='cartEnd'>
                        <div className='CardEndTotal'>
                            <h4>Total: </h4>
                            
                            <h2>$ {total.toFixed(2)}</h2>
                        </div>
                        <button onClick={() => dispatch(postPurchasesThunk())}>Checkout</button>
                    </div> 
              
              
            </Offcanvas>
        </div>
    );
};

export default PurchasesNavBar;
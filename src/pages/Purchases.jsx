import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.Slice';

const Purchases = () => {
    const purchases = useSelector((state) => state.purchases);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <ul className='header-purchase'>
                {purchases.map((purchase) => (
                    <li className='containePurchase' key={purchase.id}>
                        <Link to={`/product/${purchase.product?.id}`}>
                            
                            <div className='img-purchases'>
                                <img src={purchase.product?.images?.[0].url} alt="" />
                            </div>
                            <h3>{purchase?.createdAt.substr(0,10)}</h3>
                            <h1>{purchase.product?.title}</h1>
                            <p>{purchase.product?.description}</p>
                            <div className='purchase-pri-qua'>
                                <h5>Price:</h5>
                                <h2>{purchase.product?.price}</h2>
                                <h5>Quantity:</h5>
                                <h2>{purchase?.quantity}</h2>
                            </div>

                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Purchases;
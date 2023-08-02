import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {  filterNewsCategoryThunk } from "../store/slices/productNew.slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { filterAddProductThunk } from "../store/slices/carts.Slice";

const Product = () => {
  const { id } = useParams()
  const [news, setNews] = useState({})
  const newsListProduc = useSelector((state) => state.newProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setCouter] = useState(1);
  const [urlimg, setUrlimg] = useState(0)

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
      .then(res => {
        setNews(res.data)
        dispatch(filterNewsCategoryThunk(res.data.categoryId))
      })
  }, [id])
  const counterValuemore = () => {
    setCouter(counter + 1)
  }
  const counterVAlueless = () => {
    if (counter == 0) {
      setCouter(0)
    } else {
      setCouter(counter - 1)
    }
  }
  const counterimgmore = () => {
    if (urlimg === 0) {
      setUrlimg(0)
    } else {
      setUrlimg(urlimg - 1)
    }
  }
  const counterimgless = () => {
    if (urlimg === (news.images.length) - 1) {
      setUrlimg(urlimg)
    } else {
      setUrlimg(urlimg + 1)
    }
  }

  //paginado
  const [page, setPage] = useState(1);
  const productPerPage = 4;
  const lastIndex = page * productPerPage;
  const firstIndex = lastIndex - productPerPage;
  const productPaginated = newsListProduc.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(newsListProduc.length / productPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
 
  const addToCard = (rate) => {
    const cart ={
      quantity: counter,
      productId:news.id
    }
    dispatch(filterAddProductThunk(cart))
  }
  return (
    <div className="Product-one">
      {scrollTo(0, 0)}
      <div className="img-cart">

        <button onClick={counterimgmore}><i className="fa-solid fa-circle-chevron-left"></i></button>
        <img src={news.images?.[urlimg]?.url} alt="" />
        <button onClick={counterimgless}><i className="fa-solid fa-circle-chevron-right"></i></button>
        <div className="img-all">
          {news.images?.map((imglis, i) => (
            <img key={imglis.id} src={imglis.url} onClick={() => setUrlimg(i)} alt="" />
          ))}
        </div>
      </div>

      <div className="date-all">
        <h1>{news.category?.name}</h1>
        <div className="date-title">
          <h2>{news?.title}</h2>
          <p>{news?.description}</p>
          <div className="data-price">
            <div className="price-mone">
              <h4>Price</h4>
              <h3>$ {news?.price}</h3>
            </div>
            <div className="more-cant">
              <button onClick={counterValuemore}><i className="fa-solid fa-plus"></i></button>
              <h4 className="counter">{counter} </h4>
              <button onClick={counterVAlueless}><i className="fa-solid fa-minus"></i></button>
            </div>
          </div>
        </div>
        <button className="date-all-btb" onClick={addToCard}>Add to card</button>
      </div>

      <ul className="discover">
        <div className="discoverpage">
          <h3> Discover similar items</h3>

          <div className='pageall'>
            <button className='btb-one' onClick={() => setPage(Number(page) - 1)} disabled={page === 1}>
              Prev page
            </button>
            <h4 className='pageh4'>{page}</h4>
            <h5 className='ttpage'>{totalPages}</h5>
            <button className='btb-one' onClick={() => setPage(Number(page) + 1)}disabled={page === totalPages}>
              Next page
            </button>
          </div>
        </div>

        <div className="discover-all">
          {

            productPaginated?.map(newProduct => (
              <li key={newProduct.id} onClick={() => navigate(`/product/${newProduct.id}`)}>
                <Card style={{ width: '15rem' ,height:'30rem'}}>
                  <Card.Img className="img-li" variant="top" src={newProduct.images?.[0].url} />
                  <Card.Body>
                    
                      <Card.Title className="titleProducto"> {newProduct.title}</Card.Title> 
                    
                   
                    Price:
                    <Card.Text className="title-li">
                      {newProduct.price}
                    </Card.Text>
                    <Button className="btb-li" variant="primary" onClick={addToCard}><i className="fa-solid fa-cart-shopping"></i></Button>
                  </Card.Body>
                </Card>

              </li>
            ))
          }


        </div>
      </ul>

    </div>
  );
};

export default Product;
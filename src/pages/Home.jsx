import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterNewsCategoryThunk, filterNewsHeadlineThunk, getProductThunk } from "../store/slices/productNew.slice";
import axios from "axios";
import { Accordion, Button, Card, Form, InputGroup } from "react-bootstrap";
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const newsListProduc = useSelector((state) => state.newProduct);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const [productFiltrePrice, setProductFiltrePrice] = useState([])
  //Paginado
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const lastIndex = page * productPerPage;
  const firstIndex = lastIndex - productPerPage;
  const productPaginated = productFiltrePrice.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(productFiltrePrice.length / productPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

useEffect(() => {
    setProductFiltrePrice(newsListProduc)
  }, [productPaginated ])

  useEffect(() => {
    dispatch(getProductThunk())
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories/")
      .then((res) => setCategories(res.data));
  }, [])
  //paginado


  return (
    <div className="headerAll">
  
      <div className="content">
        <div className="search-AllProduct">

          <Accordion className="category-all" defaultActiveKey="0">
            
            <Accordion.Item className="category" eventKey="0">
              <Accordion.Header>Category</Accordion.Header>
              <Accordion.Body>
                <div className="Category-content">

                  {
                    categories.map((category) => (
                      <div key={category.id} className="btb-category">

                        <Button

                          onClick={() => dispatch(filterNewsCategoryThunk(category.id))}
                        >
                          {category.name}
                        </Button>
                      </div>
                    ))
                  }
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


        </div>


        <div className="Product">
          <div className='pageall'>
            <button className='btb-one'
              onClick={() => setPage(Number(page) - 1)}
              disabled={page === 1}>
              Prev page
            </button>
            <input className='pageinput'
              type="text"
              value={page}
              onChange={(e) => setPage(e.target.value)} />
            <h5 className='ttpage'> {totalPages}</h5>
            <button className='btb-one'
              onClick={() => setPage(Number(page) + 1)}
              disabled={page === totalPages}>
              Next page
            </button>
          </div>
          <ul className="ul-producto">

            {

              productPaginated.map(newProduct => (
                <li key={newProduct.id} onClick={() => navigate(`/product/${newProduct.id}`)}>
                  <Card style={{ width: '14rem',height:'30rem' }}>
                    <Card.Img className="img-li" variant="top" src={newProduct.images?.[0].url} />
                    <Card.Body>
                      <Card.Title className="titleProducto"> {newProduct.title}</Card.Title>
                      Price:
                      <Card.Text className="title-li">
                        {newProduct.price}
                      </Card.Text>
                     
                    </Card.Body>
                  </Card>

                </li>
              ))
            }
          </ul>
        </div>

      </div>
            <div className="pieend">
              <div className="containerend">
                <div className="about">
                <h5>About Me</h5>
                <h6>Creado por:</h6>
                <p>Ma. Ing. Jose Zambrano</p>
                <p>jlzg1987@hotmail.com</p>
                </div>
                <div className="frace">
                  <p>Creador con amor </p>
                </div>
              </div>
            </div>
    </div>
  );
};

export default Home;

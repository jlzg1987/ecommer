import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { deleteuserThunk } from "../store/slices/register.slice";

const ListRegister = () => {
  const registerList = useSelector((state) => state.registerUser);
  const dispatch = useDispatch();
    console.log (registerList.id)
  return (
    <div>
      <h1>Users  list</h1>
      <Row xs={1} md={1} lg={2} className="g-4">
        {registerList.map((car) => (
          <Col key={car.id}>
            <Card style={{ width: "17rem" }}>
              <Card.Body>
                <Card.Title>
                  {car.firstName} {car.lastName}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <b>E-mail: </b> {car.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Phone: </b>
                  {car.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>create Date: </b>
                  {car.createdAt.substr(0,10)}
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="danger"
                onClick={() => dispatch(deleteuserThunk(car.id))}
              >
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListRegister;

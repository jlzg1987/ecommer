import { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PurchasesNavBar from './PurchasesNavBar';


const AppNavbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/login")
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>

      <Navbar bg="primary" variant="dark">
        <Container>

          <Navbar.Brand as={Link} to="/"><h2>e-commerce</h2></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='one' as={Link} to="/login"><i className="fa-solid fa-user"></i></Nav.Link>
            <Nav.Link className='two' as={Link} to="/purchases"><i className="fa-solid fa-box-archive"></i> </Nav.Link>
            <Nav.Link className='three' onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
            <Nav.Link className='logout' onClick={logout} to="/cart"><i className="fa-solid fa-user-xmark"></i></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <PurchasesNavBar show={show} handleClose={handleClose} />
    </div>
  );
};

export default AppNavbar;
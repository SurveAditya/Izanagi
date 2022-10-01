import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>Izanagi</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  )
}

export default Header

{/* <header> */}
{/* we had to write variant otherwise it would be dark text on dark backgrounds */}
{/* <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect> */}
{/* <Container>
<LinkContainer to="/">
  <Navbar.Brand> <Link rel="icon" href="../public/favicon.ico" type="image/x-icon" />Izanagi</Navbar.Brand>
</LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
    <LinkContainer to="/cart">
      <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/login">
      <Nav.Link ><i className="fas fa-user"></i>Sign In</Nav.Link>
    </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>

</header> */}
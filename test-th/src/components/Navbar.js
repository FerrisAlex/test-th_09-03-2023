import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const  CustomNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/">TH</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Sucursales</Nav.Link>
            <Nav.Link href="/categoria-producto">Categoria de Producto</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
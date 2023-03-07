import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RiAccountCircleLine } from "react-icons/ri";
import "./Navigation.css"

export default function Navigaiton() {
  return (
    <>
    {[false].map((expand) => (
      <Navbar  key={expand} expand={expand} className="mb-3 pt-0 sticky-top navbar">
        <Container fluid className='navbar-color'>
          <Navbar.Brand href="#">ProgramTogether</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
            <Offcanvas.Header closeButton>
            <RiAccountCircleLine size={60}></RiAccountCircleLine>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                ProgrammTogether
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link>Courses</Nav.Link>
              <Nav.Link>Account</Nav.Link>
              <Nav.Link>sdsd</Nav.Link>
              <Nav.Link>sdsd</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>
  )
}

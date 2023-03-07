import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./Navigation.css"
import Login from '../Login/Login';
import Register from '../Login/Register';
import { FaLaptopCode } from "react-icons/fa";
export default function Navigaiton() {
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 80) {
            setColor(true);
        } else {
            setColor(false);
        }
    }
    window.addEventListener('scroll', changeColor)
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3 pt-0 sticky-top navbar">
                    <Container fluid className={color ? 'navbar-color' : 'navbar-color-scroll'}>
                        <Navbar.Brand ><FaLaptopCode size={40} /></Navbar.Brand>
                        <div className='auth'>
                            <Login></Login>
                            <Register></Register>
                        </div>
                        {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
           <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
            <Offcanvas.Header closeButton>
            <RiAccountCircleLine size={60}></RiAccountCircleLine>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                LearProgramming
              </Offcanvas.Title>
            </Offcanvas.Header>f
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link>Courses</Nav.Link>
              <Nav.Link>Account</Nav.Link>
              <Nav.Link>sdsd</Nav.Link>
              <Nav.Link>sdsd</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas> */}
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

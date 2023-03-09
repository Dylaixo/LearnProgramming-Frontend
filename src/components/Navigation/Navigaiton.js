import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./Navigation.css"
import Login from '../Login/Login';
import Register from '../Login/Register';
import { FaLaptopCode } from "react-icons/fa";
export default function Navigaiton() {
    const [change, setChange] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 70) {
            setChange(true);
        } else {
            setChange(false);
        }
    }
    window.addEventListener('scroll', changeColor)
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3 pt-0 sticky-top navbar">
                    <Container fluid className={change ? 'navbar-color' : 'navbar-color-scroll'}>
                        <Navbar.Brand ><FaLaptopCode className={change ? 'change-size' : 'normal-size'} /></Navbar.Brand>
                        <div className='auth row me-2'>
                            <div className='col-lg-6  col-md-6 col-sm-6 col-6'>
                            <Login></Login>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                            <Register></Register>
                            </div>
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

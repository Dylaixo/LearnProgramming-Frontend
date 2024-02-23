import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavigationAuth.css";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GiExitDoor } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import NavigationAuthStyles from '../../modules/NavigationAuth.module.scss'
import axios from 'axios';



function NavigationAuth() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate(`/`);
    localStorage.removeItem('token');

    window.location.reload();

  };
  return (
    <Navbar  className="NavAuth sticky-top" expand="lg">

        <Navbar.Brand><FaLaptopCode/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Strona główna</Nav.Link>
            <Nav.Link href="/Courses">Kursy</Nav.Link>
            <Nav.Link href="/MyCourses">Moje kursy</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link href='/Profile' className={NavigationAuthStyles.profile}>Profil <BsFillPersonFill size={40}/></Nav.Link>
        <Nav.Link className={NavigationAuthStyles.logout}><GiExitDoor size={40} onClick={handleLogout} /></Nav.Link>
    </Navbar>
  );
}

export default NavigationAuth;
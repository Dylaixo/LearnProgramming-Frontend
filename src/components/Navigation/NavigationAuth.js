import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavigationAuth.css";
import React, { useState, useEffect } from 'react';
import { GiExitDoor } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import NavigationAuthStyles from '../../modules/NavigationAuth.module.scss'
import axios from 'axios';

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const loginToken = localStorage.getItem('token');
function NavigationAuth() {
const [categories, setCategories] = useState([]);
console.log(loginToken)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://34.136.176.140:8000/api/languages/', {headers: { "Authorization" : `Bearer ${loginToken}`, "Accept": '*/*'}});
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories data:', error);
      }
    };

    if (loginToken) {
      fetchData();
    }
  }, [loginToken]);

// useEffect(() => {
//   const fetchCourses = async () => {
//     try {
//       const response = await fetch('http://34.136.176.140:8000/api/languages');
//       const categoriesData = await response.json();
//       setCategories(categoriesData);
//     } catch (error) {
//       console.error('Error fetching courses data:', error);
//     }
//   };

//   fetchCourses();
// }, []);
  return (
    <Navbar  className="NavAuth sticky-top" expand="lg">

        <Navbar.Brand><FaLaptopCode/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Courses">Courses</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              {categories.map((cat, index) => (
                   <NavDropdown.Item key={index} href={`/category/${cat.id}`}>{cat.name}</NavDropdown.Item>
            ))}
              {/* <NavDropdown.Item href="/category/frontend">Frontend</NavDropdown.Item>
              <NavDropdown.Item href="/category/backend">Backedn</NavDropdown.Item>
              <NavDropdown.Item href="/category/script">Script languages</NavDropdown.Item>
              <NavDropdown.Item href="/category/oop">Object oriented programming</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link href='/profile' className={NavigationAuthStyles.profile}>Profile <BsFillPersonFill size={40}/></Nav.Link>
        <Nav.Link className={NavigationAuthStyles.logout}><GiExitDoor size={40} onClick={handleLogout} /></Nav.Link>
    </Navbar>
  );
}

export default NavigationAuth;
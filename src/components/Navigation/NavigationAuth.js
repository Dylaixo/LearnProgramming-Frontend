import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavigationAuth.css"
import { GiExitDoor } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

function NavigationAuth() {
  return (
    <Navbar  className='NavAuth sticky-top' expand="lg">

        <Navbar.Brand><FaLaptopCode/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Courses</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Frontend</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Backedn</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Script languages</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Object oriented programming</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link className='profile'>Profile <BsFillPersonFill size={40}/></Nav.Link>
        <Nav.Link className='logout'><GiExitDoor size={40} onClick={handleLogout} /></Nav.Link>
    </Navbar>
  );
}

export default NavigationAuth;
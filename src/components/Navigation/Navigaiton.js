import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./Navigation.css"
import Login from '../Login/Login';
import Register from '../Login/Register';
import { FaLaptopCode } from "react-icons/fa";
import { changeActions } from '../../store/change-slice';
import { useDispatch, useSelector } from 'react-redux';
import NavigationStyles from '../../modules/Navigation.module.scss'

export default function Navigaiton() {
    const isChanged = useSelector(state => state.color.isChanged);
    const dispatch = useDispatch();

    const changeColor = () => {
        if (window.scrollY >= 70) {
          dispatch(changeActions.setColor());
        } else {
          dispatch(changeActions.unsetColor());
        }
      };

    window.addEventListener('scroll', changeColor);
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3 pt-0 sticky-top ">
                    <Container fluid className={isChanged ? `${NavigationStyles.navbarColor}` : `${NavigationStyles.navbarColorScroll}`}>
                        <Navbar.Brand ><FaLaptopCode className={isChanged ? `${NavigationStyles.changeSize}` : `${NavigationStyles.normalSize}`} /> </Navbar.Brand>
                        <div className={`${NavigationStyles.auth} row me-2`}>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                <Login />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                <Register />
                            </div>
                        </div>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

import React from 'react'
import { FaLaptopCode } from "react-icons/fa";
import Social from './Social';
import "./Footer.css"
function Footer() {
    return (
        <>
            <div className='row footer'>
                <div className='col-3'>
                    <h5>Authors - link</h5>
                </div>
                <div className='col-6 FooterLogo' >
                    <h3><FaLaptopCode />LearnProgramming</h3>
                </div>
                <div className='col-3 socials'>
                    <Social />
                </div>
            </div>
        </>
    )
}

export default Footer;
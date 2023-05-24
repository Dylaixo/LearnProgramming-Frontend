import React from 'react'
import { FaLaptopCode } from "react-icons/fa";
import Social from './Social';
import FooterStyles from '../../modules/Footer.module.scss'

function Footer() {
    return (
        <>
            <div className={`row ${FooterStyles.footer}`}>
                <div className='col-3'>
                    <h5>Authors - link</h5>
                </div>
                <div className={`col-6 ${FooterStyles.footerLogo}`} >
                    <h3><FaLaptopCode className='me-3' />LearnProgramming</h3>
                </div>
                <div className={`col-3 ${FooterStyles.socials}`}>
                    <Social />
                </div>
            </div>
        </>
    )
}

export default Footer;
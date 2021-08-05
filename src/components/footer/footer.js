import React from "react";
import BigLogo from '../../images/2021RusProfiNetFooterLogo.svg';
import Roles from '../../images/2021RusProfiNetRoles.png';
import './footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container wrap-box'>
                <div className='column col-xs-12 col-md-6 col-lg-3'>
                    <a href='#/'>+7 916 500 50 50</a>
                    <a href='https://google.com'>Напишите нам</a>
                    <a href='localhost:3000'>Рекламодателям</a>
                </div>
                <div className='column col-xs-12 col-md-6 col-lg-3'>
                    <a href='127.0.0.1:3000'>FAQ</a>
                    <a href='#/'>Условия использования</a>
                </div>
                <div className='col-xs-12 col-md-3 col-lg-3'>

                </div>
                <div className='big-logo col-xs-12 col-md-6 col-lg-3'>
                    <img src={BigLogo} alt='logo'/>
                </div>
            </div>
            <div className='roles'>
                <p className='roles-text'>2021 RusProfiNet. Все права защищены</p>
            </div>
        </div>
    );
};

export default Footer;
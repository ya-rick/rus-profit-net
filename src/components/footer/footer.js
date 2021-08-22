import React from "react";
import { Link } from 'react-router-dom';

import BigLogo from '../../images/2021RusProfiNetFooterLogo.svg';
import './footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container wrap-box'>
                <div className='column col-xs-12 col-md-6 col-lg-3'>
                    <Link href='/#'>+7 916 500 50 50</Link>
                    <Link href='https://google.com'>Напишите нам</Link>
                    <Link href='http://localhost:3000'>Рекламодателям</Link>
                </div>
                <div className='column col-xs-12 col-md-6 col-lg-3'>
                    <Link href='http://127.0.0.1:3000'>FAQ</Link>
                    <Link to={'/userAgreement'}>Условия использования</Link>
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
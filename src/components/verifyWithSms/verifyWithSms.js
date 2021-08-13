import React, {Component} from "react";
import './verifyWithSms.css';

export default class VerifyWithSms extends Component{
    render() {
        return(
            <div className='center-sub'>
                <p className='p-text'>Для подтверждения e-mail,
                    введите код из e-mail</p>
                <div className='numbers-sub'>
                    <input className='number-sms' type='text'/>
                    <input className='number-sms' type='text'/>
                    <input className='number-sms' type='text'/>
                    <input className='number-sms' type='text'/>
                </div>
                <button className='a-style'>Отправить код повторно через 60 сек.</button>
                <div className='margin-bottom'>

                </div>
                <div className='margin-bottom'>

                </div>
            </div>
        );
    }
};


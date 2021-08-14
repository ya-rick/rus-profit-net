import React, {Component} from "react";
import Avatar from '../../images/avatar.png';
import './generalInformation.css';

export default class GeneralInformation extends Component{
    render() {
        return (
            <div className='container wrap-box'>
                <img className='reg-avatar col-xs-6 col-md-6 col-lg-3' src={Avatar} alt='avatar'/>
                <div className='container-sub col-xs-6 col-md-6 col-lg-3'>
                    <button className='reg-dwn-img'>
                        Добавьте фотографию
                    </button>
                    <p className='reg-subtext'>Размер файла не более 1 Мб</p>
                </div>
                <div className='col-xs-6 col-md-6 col-lg-3'>

                </div>
                <div className='container-sub col-xs-6 col-md-6 col-lg-3'>
                    <button className='reg-date'>
                        Дата рождения*
                    </button>
                </div>
            </div>
        );
    };
};


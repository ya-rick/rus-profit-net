import React, {Component} from "react";
import Avatar from '../../images/avatar.png';
import './generalInformation.css';
import MyCalendar from "../myCalendar";
import { PhotoContext } from '../mainPage/contexts';

class GeneralInformation extends Component {

    changeDate = (date)=>{
        const dateObj = new Date(date);

        this.props.onChangeDate(dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() > 9 ? dateObj.getMonth() : '0' + dateObj.getMonth()) + '-' + dateObj.getDate());
    }

    render() {
        const {date, imgFile} = this.context;
        const myStyle = {
            display: 'none'
        }
        return (
            <div className='container wrap-box'>
                <img className='reg-avatar col-xs-6 col-md-6 col-lg-3' src={imgFile ? URL.createObjectURL(imgFile) : Avatar} alt='avatar'/>
                <div className='container-sub col-xs-6 col-md-6 col-lg-3'>
                    <input id='in' className='reg-dwn-img' type='file' style={myStyle} onChange={this.context.onImgChanged}/>
                    <label for='in' className='reg-dwn-img'>Добавьте фотографию</label>
                    <p className='reg-subtext'>Размер файла не более 1 Мб</p>
                </div>
                <div className='col-xs-6 col-md-6 col-lg-3'>
                    <MyCalendar changeDate={this.changeDate}/>
                </div>
                <div className='container-sub col-xs-6 col-md-6 col-lg-3'>
                    <button className='reg-date'>
                        {date}
                    </button>
                </div>
            </div>
        );
    };
};

GeneralInformation.contextType = PhotoContext;

export default GeneralInformation;

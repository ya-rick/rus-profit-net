import React, {Component} from "react";
import Avatar from '../../images/avatar.png';
import './generalInformation.css';
import MyCalendar from "../myCalendar";
import { PhotoContext } from '../mainPage/contexts';
import { GeneralInfoWrapper, Image, InfoWrapper } from "./styles";

class GeneralInformation extends Component {

    constructor() {
        super();

        this.state = {
            date: null
        }
    }

    changeDate = (date)=>{
        const dateObj = new Date(date);

        const formatedDate = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() > 9 ? dateObj.getMonth() : '0' + dateObj.getMonth()) + '-' + dateObj.getDate();

        this.setState({ date: formatedDate })
        this.props.onChangeDate(formatedDate);
    }

    render() {
        const { imgFile } = this.context;
        const myStyle = {
            display: 'none'
        }
        return (
            <GeneralInfoWrapper>
                <Image
                    src={imgFile ? URL.createObjectURL(imgFile) : Avatar}
                    alt='avatar'
                />

                <InfoWrapper>
                    <input id='in' className='reg-dwn-img' type='file' style={myStyle} onChange={this.context.onImgChanged}/>
                    <label for='in' className='reg-dwn-img'>Добавьте фотографию</label>
                    <p className='reg-subtext'>Размер файла не более 5 Мб</p>
                </InfoWrapper>
                
                <MyCalendar changeDate={this.changeDate}/>

                <InfoWrapper>
                    <p for='in' className='reg-dwn-img'>{this.state.date}</p>
                </InfoWrapper>
                
            </GeneralInfoWrapper>
        );
    };
};

GeneralInformation.contextType = PhotoContext;

export default GeneralInformation;

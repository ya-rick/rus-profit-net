import React, {Component} from "react";
import Avatar from '../../images/avatar.png';
import './generalInformation.css';
import MyCalendar from "../myCalendar";
import { PhotoContext } from '../mainPage/contexts';
import { GeneralInfoWrapper, Image, InfoWrapper } from "./styles";
import { inject, observer } from "mobx-react";

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
        this.props.registrationStore.setField('birthday')(formatedDate);
    }

    render() {
        const { imgFile } = this.context;
        const { commonInfo: { birthday, image }, setField } = this.props.registrationStore;
        const myStyle = {
            display: 'none'
        }
        return (
            <>
                <h2 className='register-title'>Общие данные
                    <p className='subtext-new'>Необходимо указать хотя бы один дополнительный способ связи</p>
                    {/* {nameContact && <ErrorMessage>{nameContact}</ErrorMessage>} */}
                </h2>
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
                        <p for='in' className='reg-dwn-img'>{birthday}</p>
                    </InfoWrapper>
                    
                </GeneralInfoWrapper>
            </>
        );
    };
};

GeneralInformation.contextType = PhotoContext;

export default inject('registrationStore')(observer(GeneralInformation));

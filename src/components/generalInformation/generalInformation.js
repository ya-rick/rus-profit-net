import React, {Component} from "react";
import Avatar from '../../images/avatar.png';
import './generalInformation.css';
import MyCalendar from "../myCalendar";
import { PhotoContext } from '../mainPage/contexts';
import { GeneralInfoWrapper, Image, InfoWrapper } from "./styles";
import { inject, observer } from "mobx-react";
import { ModalVariants } from "../../common/consts";
import ErrorMessage from "../../common/components/ErrorMessage";

class GeneralInformation extends Component {

    changeDate = (date)=>{
        const dateObj = new Date(date);

        const formatedDate = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() > 9 ? dateObj.getMonth() : '0' + dateObj.getMonth()) + '-' + dateObj.getDate();

        this.setState({ date: formatedDate })
        this.props.registrationStore.setField('birthday')(formatedDate);
    }

    choosePhoto = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.props.uiStore.openModal(ModalVariants.RedImg, { photo: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        const { commonInfo: { birthday, image }, error: { generalInfo } } = this.props.registrationStore;
        const myStyle = {
            display: 'none'
        }

        return (
            <>
                <h2 className='register-title'>Общие данные
                    {generalInfo && <ErrorMessage>{generalInfo}</ErrorMessage>}
                </h2>
                <GeneralInfoWrapper>
                    <Image
                        src={image ? URL.createObjectURL(image) : Avatar}
                        alt='avatar'
                    />

                    <InfoWrapper>
                        <input id='in' className='reg-dwn-img' type='file' style={myStyle} onChange={this.choosePhoto}/>
                        <label for='in' className='reg-dwn-img'>Добавьте фотографию</label>
                        <p className='reg-subtext'>Размер файла не более 5 Мб</p>
                    </InfoWrapper>
                    
                    <MyCalendar changeDate={this.changeDate}/>

                    <InfoWrapper>
                        <p for='in' className='reg-dwn-img'>{birthday?.split('-').reverse().join('-')}</p>
                    </InfoWrapper>
                    
                </GeneralInfoWrapper>
            </>
        );
    };
};

GeneralInformation.contextType = PhotoContext;

export default inject('registrationStore', 'uiStore')(observer(GeneralInformation));

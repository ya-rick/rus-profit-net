import { observer, inject } from 'mobx-react';
import Calendar from 'react-calendar';

import './generalInformation.css';
import './Calendar.css';
import Avatar from '../../../images/avatar.png';

import { Image, InfoWrapper } from './styles';
import { ModalVariants } from '../../../common/consts';


export default inject('uiStore')(observer(GeneralInformation));

function GeneralInformation({ uiStore, birthday, onChangeField, image }) {

    function changeDate(date) {
        const dateObj = new Date(date);

        const formatedDate = dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();

        onChangeField('birthday')(formatedDate);
    }

    function choosePhoto(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            uiStore.openModal(ModalVariants.RedImg, {
                photo: reader.result,
                onSuccessCallback: onChangeField('image')
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const myStyle = {
        display: 'none'
    }

    return (
        <>
            <Image
                src={image ? typeof image === 'string' ? image : URL.createObjectURL(image) : Avatar}
                alt='avatar'
            />

            <InfoWrapper>
                <input id='in' className='reg-dwn-img' type='file' style={myStyle} onChange={choosePhoto}/>
                <label for='in' className='reg-dwn-img'>Добавьте фотографию</label>
                <p className='reg-subtext'>Размер файла не более 5 Мб</p>
            </InfoWrapper>

            <Calendar
                onChange={changeDate}
                value={new Date(birthday)}
            />

            <InfoWrapper>
                <p for='in' className='reg-dwn-img'>{birthday?.split('-').reverse().join('-') || 'Дата рождения*'}</p>
            </InfoWrapper>
        </>
    );
};
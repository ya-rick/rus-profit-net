import { observer, inject } from 'mobx-react';
import Calendar from 'react-calendar';

import './generalInformation.css';
import './Calendar.css';
import Avatar from '../../../images/avatar.png';

import { Image, InfoWrapper } from './styles';
import { ModalVariants } from '../../../common/consts';


export default inject('uiStore')(observer(GeneralInformation));

function GeneralInformation({ uiStore, birthday, onChangeField, avatar }) {

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
                onSuccessCallback: onChangeField('avatar')
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
                src={avatar ? typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar) : Avatar}
                alt='avatar'
            />

            <InfoWrapper>
                <input id='in' className='reg-dwn-img' type='file' style={myStyle} onChange={choosePhoto}/>
                <label for='in' className='reg-dwn-img'>Добавьте фотографию</label>
                <p className='reg-subtext'>Размер файла не более 5 Мб</p>
            </InfoWrapper>

            <Calendar
                onChange={changeDate}
                value={birthday ? new Date(birthday) : new Date(Date.now())}
            />

            <InfoWrapper>
                <p for='in' className='reg-dwn-img'>{birthday?.split('-').reverse().join('-') || 'Дата рождения*'}</p>
            </InfoWrapper>
        </>
    );
};

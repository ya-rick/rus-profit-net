import { observer, inject } from 'mobx-react';
import Calendar from 'react-calendar';

import './generalInformation.css';
import './Calendar.css';
import Avatar from '../../../images/avatar.png';

import { Image, InfoWrapper } from './styles';
import { ModalVariants } from '../../../common/consts';


export default inject('uiStore', 'localeService')(observer(GeneralInformation));

function GeneralInformation({ uiStore, birthday, onChangeField, avatar, localeService }) {
    const formats = ['image/jpeg', 'image/png'];

    function changeDate(date) {
        const dateObj = new Date(date);

        const formatedDate = dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();

        onChangeField('birthday')(formatedDate);
    }

    function choosePhoto(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        if (!formats.includes(file.type)) {
            uiStore.openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey('unsupported_extention')
            });

            return;
        }
        
        if (file.size / 1024 / 1024 > 5) {
            uiStore.openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey('file_size')
            });

            return;
        }

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
            <div>
                <p>Ваша фотография</p>
                <Image
                    src={avatar ? typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar) : Avatar}
                    alt='avatar'
                />
            </div>
            

            <InfoWrapper>
                <input
                    id='in'
                    className='reg-dwn-img'
                    type='file'
                    style={myStyle}
                    onClick={e => e.target.value = null}
                    onChange={choosePhoto}
                />

                <label
                    for='in'
                    className='reg-dwn-img'
                >
                    {avatar ? 'Изменить фотографию' : 'Добавьте фотографию'}
                </label>

                <p className='reg-subtext'>Размер файла не более 5 Мб.<br/>Поддерживаемые форматы png и jpeg</p>
            </InfoWrapper>

            <div>
                <p>Дата рождения</p>
            <Calendar
                onChange={changeDate}
                value={birthday ? new Date(birthday) : new Date()}
            />
            </div>

            <InfoWrapper>
                <p for='in' className='reg-dwn-img'>{birthday?.split('-').reverse().map(value => value.padStart(2, '0')).join('-') || 'Дата рождения*'}</p>
            </InfoWrapper>
        </>
    );
};

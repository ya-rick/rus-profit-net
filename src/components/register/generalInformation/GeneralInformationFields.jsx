import { observer, inject } from 'mobx-react';
import Calendar from 'react-calendar';

import './Calendar.css';
import Avatar from '../../../images/avatar.png';

import { Description, Image, InfoWrapper } from './styles';
import { ModalVariants } from '../../../common/consts';
import { CommonText, RegularTitle } from '../../../common/components/Typography';
import styled, { css } from 'styled-components';
import { forDevice } from '../../../common/commonAdaptiveStyles';


export default inject('uiStore', 'localeService')(observer(GeneralInformation));

function GeneralInformation({ uiStore, birthday, onChange, avatar, localeService }) {
    const formats = ['image/jpeg', 'image/png'];

    function changeDate(date) {
        const dateObj = new Date(date);

        const formatedDate = dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();

        onChange('birthday')(formatedDate);
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
                onSuccessCallback: onChange('avatar')
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
            <ComplexLayout>
                <RegularTitle>Ваша фотография</RegularTitle>

                <Image
                    src={avatar ? typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar) : Avatar}
                    alt='avatar'
                />
            </ComplexLayout>
            

            <InfoWrapper style={{ marginBlockEnd: '2rem' }}>
                <input
                    id='in'
                    type='file'
                    style={myStyle}
                    onClick={e => e.target.value = null}
                    onChange={choosePhoto}
                />

                <WithBackgroundWrapper>
                    <label
                        for='in'
                    >
                        {avatar ? 'Изменить фотографию' : 'Добавьте фотографию'}
                    </label>
                </WithBackgroundWrapper>

                <Description>Размер файла не более 5 Мб.<br/>Поддерживаемые форматы png и jpeg</Description>
            </InfoWrapper>

            <ComplexLayout>
                <RegularTitle>Дата рождения</RegularTitle>
                <Calendar
                    onChange={changeDate}
                    value={birthday ? new Date(birthday) : new Date()}
                />
            </ComplexLayout>

            <InfoWrapper>
                <WithBackgroundWrapper>
                    <CommonText for='in'>{birthday?.split('-').reverse().map(value => value.padStart(2, '0')).join('-') || 'Дата рождения*'}</CommonText>
                </WithBackgroundWrapper>
            </InfoWrapper>
        </>
    );
};

const ComplexLayout = styled.div`
    display: flex;
    flex-direction: column;

    > *:nth-child(1) {
        margin-inline: auto;

        ${forDevice.M(css`
            margin-inline: initial;
        `)}
    }
`;

const WithBackgroundWrapper = styled.div`
    background: #F7FBFC;
    padding: .5rem 1rem;
    text-align: center;

    ${props => props.theme.smallBorderRadius}
`;

import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import UserContactFields from '../register/nameContact/UserContactFields';
import { Contact3Grid } from '../register/nameContact';
import GeneralInformationFields from '../register/generalInformation';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Centerer, DefaultContainer } from '../../common/components/Layouts';
import { CommonButton } from '../../common/components/Buttons';
import { ModalVariants } from '../../common/consts';
import Input from '../../common/components/Input';
import { MainSubtitle, RegularTitle, Subtitle } from '../../common/components/Typography';
import Loading from '../../common/components/Loading';


export default inject('uiStore', 'localeService')(observer(UserInfoPage));

function UserInfoPage({ uiStore, localeService }) {

    const [error, setError] = useState(false);

    const { userModel, openModal } = uiStore;

    if (!userModel.editInfo) {
        return <Loading/>
    }

    const {
        editInfo: {
            birthday, avatar, user_surname, user_name, contacts_info,
        },
        user: { user_email },
        error: { generalInfo, contactInfo, mainInfo }, setField, saveData
    } = userModel;

    async function onSave() {
        try {

            setError(false);

            await saveData();

            openModal(ModalVariants.InfoModal, {
                title: 'Получилось!',
                description: 'Ваши личные данные изменены'
            });

        } catch(e) {
            if (e === false) {
                setError(true);
                return;
            }

            openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey(e.message)
            });
        }
    }

    return <>
        <DefaultContainer>
            <MainSubtitle>
                Личная информация
                {mainInfo && <ErrorMessage>{mainInfo}</ErrorMessage>}
            </MainSubtitle>
        </DefaultContainer>

        <UserMainInfoLayout>

            <div>
                <RegularTitle>Фамилия*</RegularTitle>
                <Input
                    className='input-reg'
                    value={user_surname}
                    onChange={e => setField('user_surname')(e.target.value)}/>
            </div>

            <div>
                <RegularTitle>Имя*</RegularTitle>
                <Input
                    className='input-reg'
                    value={user_name}
                    onChange={e => setField('user_name')(e.target.value)}/>
            </div>

            <div>
                <RegularTitle>E-mail*</RegularTitle>
                <Input
                    className='input-reg'
                    value={user_email}
                    disabled
                    onChange={e => {}}/>
            </div>

        </UserMainInfoLayout>

        <DefaultContainer>
            <Subtitle>
                Предпочитаемый способ связи
                {contactInfo && <ErrorMessage>{contactInfo}</ErrorMessage>}
            </Subtitle>
        </DefaultContainer>

        <Contact3Grid>
            <UserContactFields
                onChangeField={setField}
                contactFields={contacts_info}
                showMoreButton
            />
        </Contact3Grid>

        <GeneralInformationFields
            onChange={setField}
            error={generalInfo}
            birthday={birthday}
            avatar={avatar}
        />

        <ButtonLayout>
            {error && <ErrorMessage>{localeService.getByKey('invalid_data')}</ErrorMessage>}

            <CommonButton
                onClick={onSave}
            >
                Сохранить
            </CommonButton>
        </ButtonLayout>
    </>
}

const UserMainInfoLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    align-content: center;
    flex-wrap: wrap;
    column-gap: 1.5rem;

    > * {
        flex: 1 1 30%;
        max-width: 45%;
    }
`;

const ButtonLayout = styled(Centerer)`
    margin-block: 2.5rem;

    flex-direction: column;
    row-gap: 1rem;
`;

import { useState } from 'react';
import { inject } from 'mobx-react';

import Input from '../../common/components/Input';
import { CommonButton } from '../../common/components/Buttons';
import { ModalButtonWapper, ModalContent, ModalSubtitle, ModalTitle } from '../../common/components/ModalStyles';
import TextArea from '../../common/components/TextArea';
import { requestWithFormData } from '../../api/exchangeLayer';
import { ModalVariants } from '../../common/consts';


export default inject('uiStore')(function QuestionModalContent({ uiStore: { openModal } }) {
    const [fields, setFields] = useState({});

    function setField(e) {
        setFields(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function sendQuestion() {
        try {
            await requestWithFormData('sendQuestion', fields);

            openModal(ModalVariants.InfoModal, {
                title: 'Поздравляем!',
                description: 'Ответ на Ваш вопрос будет отправлен на указанный почтовый ящик'
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <ModalTitle>Задайте ваш вопрос</ModalTitle>
        
            <ModalContent>

                <ModalSubtitle>Ваше имя*</ModalSubtitle>

                <Input
                    value={fields.user_name}
                    name={'user_name'}
                    onChange={setField}
                    placeholder={'Мария'}
                />

                <ModalSubtitle>Телефон</ModalSubtitle>

                <Input
                    value={fields.phone}
                    name={'phone'}
                    onChange={setField}
                    placeholder={'+7 916 450 50 50'}
                />

                <ModalSubtitle>E-mail*</ModalSubtitle>

                <Input
                    value={fields.user_email}
                    name={'user_email'}
                    onChange={setField}
                    placeholder={'maria@mail.ru'}
                />

                <ModalSubtitle>Ваш вопрос*</ModalSubtitle>

                <TextArea
                    value={fields.question}
                    name={'question'}
                    onChange={setField}
                    placeholder={'Как мне связаться с работодателем?'}
                />

            </ModalContent>

            <ModalButtonWapper>
                <CommonButton onClick={sendQuestion}>Отправить</CommonButton>
            </ModalButtonWapper>
        </>
    )
})
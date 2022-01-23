import { useState } from 'react';
import { inject } from 'mobx-react';

import Input from '../../../common/components/Input';
import { ModalButton, ModalButtonWapper, ModalContent, ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';
import TextArea from '../../../common/components/TextArea';
import { requestWithFormData } from '../../../api/exchangeLayer';
import { ModalVariants } from '../../../common/consts';
import ErrorMessage from '../../../common/components/ErrorMessage';
import styled from 'styled-components';
import { DefaultContainer } from '../../../common/components/Layouts';


export default inject('uiStore', 'localeService')(function QuestionModalContent({
    uiStore: { openModal },
    localeService
}) {
    const [fields, setFields] = useState({
        user_name: '',
        user_email: '',
        question: '',
    });
    const [isError, setError] = useState(false);

    function setField(e) {
        setFields(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function validateFields() {
        return ['user_name', 'user_email', 'question'].reduce((isError, fieldName) => isError || fields[fieldName].length === 0, false);
    }

    async function sendQuestion() {
        try {
            setError(false);

            if (validateFields()) {
                setError(true);
                return;
            }

            await requestWithFormData('sendQuestion', fields);

            openModal(ModalVariants.InfoModal, {
                title: 'Спасибо!',
                description: 'Ваш вопрос принят, ответ будет отправлен в ближайшее время на указанный почтовый ящик'
            });
        } catch (e) {
            openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey(e.message)
            });
        }
    }

    return (
        <>
            <DefaultContainer>
                <ModalTitle>Задайте ваш вопрос</ModalTitle>
            </DefaultContainer>
        
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

            <ButtonWithErrorBlock>
                {isError && <ErrorMessage
                    style={{ textAlign: 'center' }}
                >
                    {localeService.getByKey('invalid_data')}
                </ErrorMessage>}
                <ModalButton
                    onClick={sendQuestion}
                    onBlur={() => setError(false)}
                >
                    Отправить
                </ModalButton>
            </ButtonWithErrorBlock>
        </>
    )
})

const ButtonWithErrorBlock = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: minmax(auto, 300px);

    margin-block-start: 1rem;

    gap: .5rem;
`;

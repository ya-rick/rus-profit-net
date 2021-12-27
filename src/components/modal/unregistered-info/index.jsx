import styled from 'styled-components';
import { inject } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import Icon from '../../../common/components/Icon';
import { ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';
import { CommonButton } from '../../../common/components/Buttons';
import { ModalVariants } from '../../../common/consts';
import { DefaultContainer } from '../../../common/components/Layouts';
import { TwoLinkedButtonGroup } from '../../../common/components/StaticPagesStyles';


export default inject('uiStore')(function UnregisteredInfo({ uiStore: { openModal, closeModal } }) {
    const history = useHistory();

    function registrationClicked() {
        closeModal();

        history.push('/register');
    }

    return (
        <>
            <DefaultContainer>
                <ModalTitle>Зарегистрируйтесь или авторизуйтесь</ModalTitle>
            </DefaultContainer>

            <ModalSubtitle>Как работает наш сайт?</ModalSubtitle>

            <InstructionsLayout>
                <InstractopnWithArrow>
                    <InstructionWithText>
                        <Icon
                            iconName={'registration_info'}
                            size={'md'}
                        />
                        <div style={{ textAlign: 'center' }}>
                            Заполните анкету
                            и зарегистрируйтесь
                        </div>
                    </InstructionWithText>
                    <Icon
                        iconName={'arrow_right'}
                        size={'md'}
                    />
                </InstractopnWithArrow>

                <InstractopnWithArrow>
                    <InstructionWithText>
                        <Icon
                            iconName={'publication_info'}
                            size={'md'}
                        />
                        <div style={{ textAlign: 'center' }}>
                            Опубликуйте вашу 
                            вакансию/анкету
                        </div>
                    </InstructionWithText>
                    <Icon
                        iconName={'arrow_right'}
                        size={'md'}
                    />
                </InstractopnWithArrow>

                <InstractopnWithArrow>
                    <InstructionWithText>
                        <Icon
                            iconName={'find_info'}
                            size={'md'}
                        />
                        <div style={{ textAlign: 'center' }}>
                            Выберите нужный
                            из тысячи вариантов
                        </div>
                    </InstructionWithText>
                </InstractopnWithArrow>
            </InstructionsLayout>

            <TwoLinkedButtonGroup>
                <CommonButton
                    onClick={() => openModal(ModalVariants.Authorization)}
                >Авторизация</CommonButton>

                <CommonButton
                    onClick={registrationClicked}
                >Регистрация</CommonButton>
            </TwoLinkedButtonGroup>
        </>
    )
})

const gap = '30px';

const InstructionsLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-items: center;
    justify-content: start;
    gap: ${gap};

    margin-block: ${gap};
`;

const InstractopnWithArrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    column-gap: calc(${gap} - 20px);
`;

const InstructionWithText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    gap: ${gap};
    line-height: 25px;
`;

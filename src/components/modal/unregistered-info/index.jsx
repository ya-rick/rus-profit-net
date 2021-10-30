import styled from 'styled-components';

import Icon from '../../../common/components/Icon';
import { ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';


export default function UnregisteredInfo() {
    return <>
        <ModalTitle>Зарегистрируйтесь или авторизуйтесь</ModalTitle>

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
    </>
}

const gap = '30px';

const InstructionsLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    align-items: center;
    justify-items: center;
    justify-content: start;
    gap: ${gap};

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const InstractopnWithArrow = styled.div`
    display: grid;
    grid-template-columns: 200px auto;
    align-items: center;
    gap: calc(${gap} - 20px);
`;

const InstructionWithText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    gap: ${gap};
    line-height: 25px;
`;

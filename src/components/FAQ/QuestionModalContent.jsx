import Input from '../../common/components/Input';
import CommonButton from '../../common/components/CommonButton';
import { ModalButtonWapper, ModalContent, ModalSubtitle, ModalTitle } from '../../common/components/ModalStyles';
import TextArea from '../../common/components/TextArea';

export default function QuestionModalContent() {
    return (
        <>
            <ModalTitle>Задайте ваш вопрос</ModalTitle>
        
            <ModalContent>

                <ModalSubtitle>Ваше имя</ModalSubtitle>

                <Input
                    placeholder={'Мария'}
                />

                <ModalSubtitle>Телефон</ModalSubtitle>

                <Input
                    placeholder={'+7 916 450 50 50'}
                />

                <ModalSubtitle>E-mail</ModalSubtitle>

                <Input
                    placeholder={'maria@mail.ru'}
                />

                <ModalSubtitle>Ваш вопрос</ModalSubtitle>

                <TextArea
                    placeholder={'Как мне связаться с работодателем?'}
                />

            </ModalContent>

            <ModalButtonWapper>
                <CommonButton>Отправить</CommonButton>
            </ModalButtonWapper>   
        </>
    )
}
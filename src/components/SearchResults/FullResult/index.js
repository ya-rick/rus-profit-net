import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import DefaultAvatar from '../../../images/avatar.png';

import { requestWithParams } from '../../../api/exchangeLayer';
import { PageContentWrapper } from '../../../common/components/Layouts';
import LinkedButton from '../../../common/components/LinkedButton';
import HandsLike from '../HandsLike';
import PageTitle from '../../../common/components/PageTitle';
import Icon from '../../../common/components/Icon';
import { flexAlignCenter } from '../../../common/components/mixins';
import CommonButton from '../../../common/components/CommonButton';
import { ModalVariants } from '../../../common/consts';

function Vacancy({ searchStore, uiStore: { isUserAuthenticated, openModal } }) {
    const [isContactsShown, setContactsHown] = useState(false);

    function onContactsClick() {
        if (isUserAuthenticated) {
            setContactsHown(true);
        } else {
            openModal(ModalVariants.InfoModal, {
                title: 'Извините,',
                description: 'но для получения списка контактов необходимо войти в систему.'
            })
        }
    }

    const {
        isCurrentSearchResult, setCurrentResult, onFavouriteClicked, onLikeClicked,
        mainInfoSearchResult, secondaryInfoSearchResult
    } = searchStore;

    const { name, description, experience, avatar, salary, salary_type,
        places, category, employer, contacts_info, mark, isFavourite, vacancy_name,
        create_date, currency, id: result_id, files_images } = searchStore.currentChosenResult || {};

    const { id, searchType } = useParams();

    const isResume = searchType === 'getResumeByID';

    useEffect(() => {
        if (!isCurrentSearchResult) {
            const requestData = isResume ? { resume_id: id } : { vacancy_id: id };

            requestWithParams(searchType, requestData)
                .then(res => {
                    const fromServerData = isResume ? res.resume[0] : res.vacancy[0]

                    setCurrentResult(fromServerData);
                })
                .catch(e => console.error(e));
        }
    }, []);

    return (
        <PageContentWrapper>
            {isCurrentSearchResult ? <>
                <PageTitle>
                    <FullInfoHeader>
                        <FullInfoTitle>{isResume ? name : vacancy_name}</FullInfoTitle>
                        {isUserAuthenticated && <FavouriteIcon
                            iconName={'favourite'}
                            onClick={onFavouriteClicked(isResume ? 'resumeToFavourites' : 'vacancyToFavourites', result_id)}
                            isActive={isFavourite}
                        />}
                        
                        <ShareIcon
                            iconName={'share'}
                            onClick={() => {}}
                        />
                        <LinkedButton to={'/searchResults'}>
                            Вернуться к списку
                        </LinkedButton>
                    </FullInfoHeader>
                </PageTitle>

                <ContentLayout>

                    <MainBlock>
                        {isResume && <FullInfoImageBlock>

                            <FullInfoImage src={avatar || DefaultAvatar}/>

                            {isUserAuthenticated && <HandsLike
                                currentMark={mark}
                                onHandClick={onLikeClicked(isResume ? 'resume' : 'vacancy', id)}
                            />}

                        </FullInfoImageBlock>}

                        <FullInfoTextBlock>

                            {isResume && <div style={{ textAlign: 'center' }}>{category}</div>}

                            <MainInfoBlock>
                                <FullInfoBolderText>{`${salary} ${currency} ${salary_type}`}</FullInfoBolderText>

                                {!isResume && <MainInfoBlockItem>
                                    <FullInfoBolderText>Работодатель:</FullInfoBolderText>
                                    <div>{employer}</div>
                                </MainInfoBlockItem>}

                                {!isResume && <MainInfoBlockItem>
                                    <FullInfoBolderText>Дата публикации:</FullInfoBolderText>
                                    <div>{create_date}</div>
                                </MainInfoBlockItem>}

                                <MainInfoBlockItem>
                                    <FullInfoBolderText>Опыт работы:</FullInfoBolderText>
                                    <div>{experience} лет</div>
                                </MainInfoBlockItem>

                                <MainInfoBlockItem>
                                    <FullInfoBolderText>Города:</FullInfoBolderText>
                                    <div>
                                        {places.map(place => <div>{`${place.country_name}: ${place.cities.map(city => city.name).join(',')}`}</div>)}
                                    </div>    
                                </MainInfoBlockItem>

                                {mainInfoSearchResult.map(param => <MainInfoBlockItem>
                                    <FullInfoBolderText>{param.name}:</FullInfoBolderText>
                                    <div>{param.options?.map(option => option.name).join(', ')}</div>
                                </MainInfoBlockItem>)}
                            </MainInfoBlock>

                        </FullInfoTextBlock>
                    </MainBlock>

                    <DescriptionBlock>
                        <FullInfoSubtitle>Описание вакансии</FullInfoSubtitle>

                        <FullInfoDescrption>{description}</FullInfoDescrption>
                    </DescriptionBlock>

                    {secondaryInfoSearchResult.length > 0 && <SecondaryBlock>
                        <FullInfoSubtitle>Подробнее</FullInfoSubtitle>

                         <SecondaryBlockLayout>
                            {secondaryInfoSearchResult.map(param => <MainInfoBlockItem
                                key={param.name}
                            >
                                <FullInfoBolderText>{param.name}:</FullInfoBolderText>
                                <div>{param.options?.map(option => option.name).join(', ')}</div>
                            </MainInfoBlockItem>)}
                        </SecondaryBlockLayout>

                        {isContactsShown && isUserAuthenticated ? <SecondaryBlockLayout>
                            {contacts_info.map(contact=> <MainInfoBlockItem>
                                <FullInfoBolderText>{contact.name}</FullInfoBolderText>
                                <FullInfoBolderText>{contact.value}</FullInfoBolderText>
                            </MainInfoBlockItem>)}
                        </SecondaryBlockLayout>
                        : <ContactsButton
                            onClick={onContactsClick}
                        >Получить контакты</ContactsButton>}
                        
                    </SecondaryBlock>}
                    
                    {files_images.length > 0 && <ExamplesContainer>
                        <ExamplesImageLayout>
                            {files_images.map(image => <StyledImage src={URL.createObjectURL(image)}/>)}
                        </ExamplesImageLayout>
                    </ExamplesContainer>}

                </ContentLayout>


            </>
            : 'Загрузка...'}
        </PageContentWrapper>
        
    );
};

export default inject('searchStore', 'uiStore')(observer(Vacancy));

const FullInfoHeader = styled.div`
    ${flexAlignCenter}

    > * {
        margin-right: 40px;
    }

    > *:last-child {
        margin-right: 0;
        margin-left: auto;
    }
`;

const ContentLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 70px;

    padding: 0 50px;
`;

const MainBlock = styled.div`
    ${flexAlignCenter}

    justify-content: space-evenly;
    gap: 50px;
`;

const MainInfoBlock = styled.div`
    ${flexAlignCenter}

    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;

    gap: 20px;
`;

const MainInfoBlockItem = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 45%);
`;

const DescriptionBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 30px;
`;

const SecondaryBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 30px;
`;

const SecondaryBlockLayout = styled.div`
    display: flex;
    gap: 30px;
    align-items: flex-start;
    flex-wrap: wrap;

    > * {
        flex: 1 1 45%;
    }
`;

const FullInfoImageBlock = styled.div`
    flex-basis: 30%;

    ${flexAlignCenter}

    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
`;

const FullInfoTextBlock = styled.div`
    flex-basis: 40%;

    ${flexAlignCenter}

    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    gap: 20px;
`;

const FavouriteIcon = styled(Icon)`
    cursor: pointer;

    ${props => props.isActive && `
        > svg > path {
            fill: #CC363B;
        }
    `}

    :hover {
        > svg > path {
            fill: #CC363B;
        }
    }
`;

const ShareIcon = styled(Icon)`
    cursor: pointer;

    :hover {
        > svg > path {
            fill: #CC363B;
        }
    }
`;

const FullInfoImage = styled.img`
    width: 100%;
    max-height: 300px;
`;

const FullInfoTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const FullInfoSubtitle = styled.div`
    font-size: 25px;
`;

const FullInfoBolderText = styled.div`
    font-weight: bolder;
`;

const FullInfoDescrption = styled.div`
    border-radius: 15px;
    padding: 20px;
    font-size: 20px;
    border: 1px solid #6F80A5;
`;

const ContactsButton = styled(CommonButton)`
    align-self: flex-end;
`;

const ExamplesContainer = styled.div``;

const ExamplesImageLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 140px));
    grid-template-rows: 140px;
    grid-gap: 15px;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
`;

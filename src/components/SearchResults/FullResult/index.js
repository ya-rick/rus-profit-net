import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import DefaultAvatar from '../../../images/avatar.png';

import { requestWithParams } from '../../../api/exchangeLayer';
import { PageContentWrapper } from '../../../common/components/Layouts';
import { LinkedButton } from "../../../common/components/Buttons";
import HandsLike from '../HandsLike';
import PageTitle from '../../../common/components/PageTitle';
import Icon from '../../../common/components/Icon';
import { flexAlignCenter } from '../../../common/components/mixins';
import { CommonButton } from '../../../common/components/Buttons';
import { ModalVariants } from '../../../common/consts';
import FullSizedImage from '../../../common/components/fullsizedImage';
import Loading from '../../../common/components/Loading';

function Vacancy({ searchStore, uiStore: { userModel: { isUserAuthenticated }, openModal, openImage, setImages,isImageShown } }) {
    const [isContactsShown, setContactsHown] = useState(false);

    function onContactsClick() {
        if (isUserAuthenticated) {
            setContactsHown(true);
        } else {
            openModal(ModalVariants.InfoModal, {
                title: 'Извините,',
                description: 'но для получения списка контактов необходимо войти в систему'
            })
        }
    }

    const {
        isCurrentSearchResult, setCurrentResult, mainInfoSearchResult,
        secondaryInfoSearchResult
    } = searchStore;

    const isResultsPresent = searchStore.searchResultsCollection.results?.length > 0;

    const { name, description, experience, avatar, salary, salary_type,
        places, category, employer, contacts_info, mark, isFavourite, vacancy_name,
        create_date, currency, example, type } = searchStore.currentChosenResult || {};

    const { id } = useParams();

    const isResume = type === 'resume';

    useEffect(() => {
        if (!isCurrentSearchResult) {

            requestWithParams('getByID', { id })
                .then(res => {
                    const fromServerData = isResume ? res.resume[0] : res.vacancy[0]

                    setCurrentResult(fromServerData);
                })
                .catch(e => console.error(e));
        }

        setImages(example?.map(el => el.photo));
    }, [example]);

    function onFavouriteClicked(type, id) {
        requestWithParams(type, {
            id,
        })
            .then(() => {
                searchStore.currentChosenResult.isFavourite = !searchStore.currentChosenResult.isFavourite;
            })
            .catch(err => console.error(err))
    }

    function favouriteClickHandler(type, id) {
        return e => {
            e.stopPropagation();

            onFavouriteClicked(type, id)
        }
    }

    function likeClicked(type_mark, id) {
        return (mark) => {
            if (!isUserAuthenticated) {
                openModal(ModalVariants.InfoModal, {
                    title: 'Для оценки',
                    description: 'необходимо авторизироваться в системе'
                });
    
                return;
            }

            requestWithParams('setMark', {
                type_mark, id, value: mark
            })
                .catch(err => console.error(err))
        }
    }

    return (
        <PageContentWrapper>
            {isCurrentSearchResult ? <>
                <PageTitle>
                    <FullInfoHeader>
                        <FullInfoTitle>{isResume ? name : vacancy_name}</FullInfoTitle>
                        {isUserAuthenticated && <FavouriteIcon
                            iconName={'favourite'}
                            onClick={favouriteClickHandler('setToFavourites', id)}
                            isActive={isFavourite}
                        />}
                        
                        <ShareIcon
                            iconName={'share'}
                            onClick={() => {}}
                        />
                        {isResultsPresent && <LinkedButton to={'/searchResults'}>
                            Вернуться к списку
                        </LinkedButton>}
                    </FullInfoHeader>
                </PageTitle>

                <ContentLayout>

                    <MainBlock>
                        {isResume && <FullInfoImageBlock>

                            <FullInfoImage src={avatar || DefaultAvatar}/>

                            {isUserAuthenticated && <HandsLike
                                currentMark={mark}
                                onHandClick={likeClicked(isResume ? 'resume' : 'vacancy', id)}
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
                        <FullInfoSubtitle>{isResume ? 'О себе' : 'Описание вакансии'}</FullInfoSubtitle>

                        <FullInfoDescrption>{description}</FullInfoDescrption>
                    </DescriptionBlock>

                    <DescriptionBlock>
                            <FullInfoSubtitle>Подробнее</FullInfoSubtitle>

                            <SecondaryBlockLayout>
                                {secondaryInfoSearchResult.map(param => <MainInfoBlockItem
                                    key={param.name}
                                >
                                    <FullInfoBolderText>{param.name}:</FullInfoBolderText>
                                    <div>{param.options?.map(option => option.name).join(', ')}</div>
                                </MainInfoBlockItem>)}
                                
                            </SecondaryBlockLayout>

                            <div style={{ display: 'flex' }}>
                                {isContactsShown ? <SecondaryBlockLayout>
                                    {contacts_info?.map(contact => <MainContactBlockItem>
                                        <FullInfoBolderText>{contact.value}</FullInfoBolderText>
                                    </MainContactBlockItem>)}
                                </SecondaryBlockLayout>
                                : <ContactsButton
                                    style={{ marginLeft: 'auto', marginRight: 'o' }}
                                    onClick={onContactsClick}
                                >Получить контакты</ContactsButton>}
                            </div>
                            
                    </DescriptionBlock>

                    {example?.length > 0 && <ExamplesContainer>
                        <FullInfoSubtitle>Примеры работ</FullInfoSubtitle>

                        <ExamplesImageLayout>
                            {example.map((image, index) => <StyledImage
                                src={image.photo}
                                onClick={() => openImage(index)}
                            />)}
                        </ExamplesImageLayout>

                        
                    </ExamplesContainer>}
                    
                </ContentLayout>
                
                {isImageShown && <FullSizedImage/>}
            </>
            : <LoadingLayout>
                <Loading/>
            </LoadingLayout>}
        </PageContentWrapper>
        
    );
};

export default inject('searchStore', 'uiStore')(observer(Vacancy));

const FullInfoHeader = styled.div`
    ${flexAlignCenter}

    > * {
        margin-right: 40px;
    }

    > a:last-child {
        margin-right: 0;
        margin-left: auto;
    }
`;

const ContentLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 70px;
`;

const MainBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 50px;
    border-radius: 15px;
    background-color: #F7FBFC;

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

const MainContactBlockItem = styled(MainInfoBlockItem)`
    grid-template-columns: 22.5%;
`;

const DescriptionBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 30px;
    padding: 50px;
    background-color: #F7FBFC;
    border-radius: 15px;
`;

const SecondaryBlockLayout = styled.div`
    display: flex;
    gap: 30px;
    align-items: flex-start;

    > * {
        width: 45%;
    }

    @media (max-width: 1000px) {
        flex-wrap: wrap;
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

const ExamplesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    padding: 50px;
    background-color: #F7FBFC;
    border-radius: 15px;
`;

const ExamplesImageLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 140px));
    grid-template-rows: 130px;
    grid-gap: 15px;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
`;

const LoadingLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

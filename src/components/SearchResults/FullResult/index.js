import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import DefaultAvatar from '../../../images/avatar.png';
import Logo from '../../../images/2021RusProfiNetFooterLogo.svg';

import { requestWithParams } from '../../../api/exchangeLayer';
import { PageContentWrapper } from '../../../common/components/Layouts';
import { LinkedButton } from "../../../common/components/Buttons";
import HandsLike from '../HandsLike';
import { PageTitle } from '../../../common/components/TitleVariants';
import Icon from '../../../common/components/Icon';
import { flexAlignCenter } from '../../../common/components/mixins';
import { CommonButton } from '../../../common/components/Buttons';
import { ModalVariants } from '../../../common/consts';
import FullSizedImage from '../../../common/components/fullsizedImage';
import Loading from '../../../common/components/Loading';
import { useMetaTags, useRequest } from '../../../common/hooks';


function Vacancy({ searchStore, uiStore: { userModel: { isUserAuthenticated }, openModal, openImage, setImages, isImageShown } }) {
    const [isContactsShown, setContactsShown] = useState(false);

    const {
        isCurrentSearchResult, setCurrentResult, mainInfoSearchResult,
        secondaryInfoSearchResult, getContactsByID, searchResultsCollection
    } = searchStore;

    const isResultsPresent = searchResultsCollection.results?.length > 0;

    const { id } = useParams();

    const { result, isLoading, error } = useRequest({ requestType: 'getByID', requestParams: { id } });

    const { name, description, experience, avatar, salary,
        places, category, employer, contacts_info, mark, isFavourite, vacancy_name,
        create_date, example, type } = result || {};

    useEffect(() => {
        if (!isLoading && result) {
            setCurrentResult(result);

            setImages(example?.map(el => el.photo));
        }
    }, [result, example]);

    const isResume = type === 'resume';

    useMetaTags({
        description,
        title: isResume ? name : vacancy_name,
        url: window.location.href,
        image: isResume ? avatar : Logo
    });

    if (isLoading) return <Loading/>;

    if (error) return error.message;

    async function onContactsClick() {
        try {
            await getContactsByID(id);
            
            setContactsShown(true);
        } catch (e) {
            console.error(e);

            openModal(ModalVariants.UnregisteredInfo);
        }
    }

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
                            onClick={() => openModal(ModalVariants.Share)}
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

                            <HandsLike
                                currentMark={mark}
                                onHandClick={likeClicked(type, id)}
                            />

                        </FullInfoImageBlock>}

                        <FullInfoTextBlock>

                            {isResume && <CategoryName>{category.name}</CategoryName>}

                            <MainInfoBlock>
                                <FullInfoBolderText>{`${salary.value} ${salary.currency.value} ${salary.type.value}`}</FullInfoBolderText>

                                {!isResume && <MainInfoBlockItem>
                                    <FullInfoBolderText>Работодатель:</FullInfoBolderText>
                                    <SimpleInfo>{employer}</SimpleInfo>
                                </MainInfoBlockItem>}

                                {!isResume && <MainInfoBlockItem>
                                    <FullInfoBolderText>Дата публикации:</FullInfoBolderText>
                                    <div>{create_date}</div>
                                </MainInfoBlockItem>}

                                <MainInfoBlockItem>
                                    <FullInfoBolderText>Опыт работы:</FullInfoBolderText>
                                    <SimpleInfo>{experience} лет</SimpleInfo>
                                </MainInfoBlockItem>

                                <MainInfoBlockItem>
                                    <FullInfoBolderText>Города:</FullInfoBolderText>
                                    <SimpleInfo>
                                        {places.map(place => <SimpleInfo>{`${place.country_name}: ${place.cities.map(city => city.name).join(',')}`}</SimpleInfo>)}
                                    </SimpleInfo>    
                                </MainInfoBlockItem>

                                {mainInfoSearchResult.map(param => <MainInfoBlockItem>
                                    <FullInfoBolderText>{param.name}:</FullInfoBolderText>
                                    <SimpleInfo>{param.options?.map(option => option.name).join(', ')}</SimpleInfo>
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
                                    <SimpleInfo>{param.options?.map(option => option.name).join(', ')}</SimpleInfo>
                                </MainInfoBlockItem>)}
                                
                            </SecondaryBlockLayout>

                            {isContactsShown && isUserAuthenticated ? <SecondaryBlockLayout>
                                {contacts_info?.map(contact => <FullInfoBolderText>
                                    {contact.value}
                                </FullInfoBolderText>)}
                            </SecondaryBlockLayout>
                            : <ContactsButton
                                style={{ marginLeft: 'auto', marginRight: 'o' }}
                                onClick={onContactsClick}
                            >Получить контакты</ContactsButton>}
                            
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
    gap: 40px;
`;

const MainBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    align-items: start;
    gap: 50px;

    padding: 50px;
    border-radius: 15px;
    background-color: #F7FBFC;
`;

const MainInfoBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

    gap: 20px;
`;

const MainInfoBlockItem = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(min-content, 200px));
    column-gap: 20px;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
`;

const FullInfoImageBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    > * {
        flex-grow: 1;
    }
`;

const CategoryName = styled.div`
    font-weight: 600;
    background-color: #F1F3F6;
    border-radius: 15px;
    padding: 1em 5em;
    text-align: center;
    align-self: center;
`;

const FullInfoTextBlock = styled.div`
    display: flex;
    flex-direction: column;
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
    align-self: center;
    width: 100%;
    max-width: 400px;
    max-height: 400px;
`;

const SimpleInfo = styled.div`
    line-height: 25px;
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

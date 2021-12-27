import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import DefaultAvatar from '../../../images/avatar.png';
import Logo from '../../../images/2021RusProfiNetFooterLogo.svg';

import { requestWithParams } from '../../../api/exchangeLayer';
import { DefaultContainer, MainContainer } from '../../../common/components/Layouts';
import { LinkedButton } from "../../../common/components/Buttons";
import HandsLike from '../HandsLike';
import { MainTitle } from '../../../common/components/Typography';
import Icon from '../../../common/components/Icon';
import { flexAlignCenter } from '../../../common/components/mixins';
import { CommonButton } from '../../../common/components/Buttons';
import { ModalVariants } from '../../../common/consts';
import FullSizedImage from '../../../common/components/fullsizedImage';
import Loading from '../../../common/components/Loading';
import { useMetaTags, useRequest } from '../../../common/hooks';
import { mapAge } from '../../../common/utils';
import { TwoLinkedButtonGroup } from '../../../common/components/StaticPagesStyles';


function Vacancy({
    searchStore,
    uiStore: {
        userModel: { isUserAuthenticated },
        openModal, openImage, setImages, isImageShown
    },
    localeService
}) {
    const [contacts_info, setContacts] = useState(null);

    const {
        isCurrentSearchResult, setCurrentResult, mainInfoSearchResult,
        secondaryInfoSearchResult, getContactsByID, searchResultsCollection,
        currentChosenResult
    } = searchStore;

    const isResultsPresent = searchResultsCollection.results?.length > 0;

    const { id } = useParams();

    const { result, isLoading, error } = useRequest({ requestType: 'getByID', requestParams: { id } });

    const { name, description, experience, avatar, salary,
        places, category, employer, vacancy_name,
        create_date, example, type } = result || {};
    
    useEffect(() => {
        if (error) return;

        if (!isLoading && result && !currentChosenResult) {
            setCurrentResult(result);

            setImages(example?.map(el => el.photo));
        }
    }, [result, example, error]);

    useEffect(() => {
        isUserAuthenticated && onContactsClick();
    }, []);
    
    const isResume = type === 'resume';

    useMetaTags({
        description,
        title: isResume ? name : vacancy_name,
        url: window.location.href,
        image: isResume ? avatar : Logo
    });

    if (isLoading) return <Loading/>;

    if (error) return <Redirect to={'/404'}/>;

    async function onContactsClick() {
        try {
            setContacts(await getContactsByID(id));
        } catch (e) {
            openModal(ModalVariants.UnregisteredInfo);
        }
    }

    function onFavouriteClicked(type, id) {
        requestWithParams(type, {
            id,
        })
            .then(() => currentChosenResult.isFavourite = !currentChosenResult.isFavourite)
            .catch(err => openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey(err.type)
            }));
    }

    function favouriteClickHandler(type, id) {
        return e => {
            e.stopPropagation();

            onFavouriteClicked(type, id)
        }
    }

    function likeClicked(type_mark, id) {
        return (mark) => {
            requestWithParams('setMark', {
                type_mark, id, value: mark
            })
                .then(result => currentChosenResult.mark = result.new_mark)
                .catch(() => openModal(ModalVariants.InfoModal, {
                    title: 'Ошибка!',
                    description: localeService.getByKey('unauthorized_mark')
                }));
        }
    }

    return (
        <MainContainer>
            {isCurrentSearchResult ? <>
                <DefaultContainer>
                    <MainTitle>
                        <FullInfoHeader>
                            <FullInfoTitle>{isResume ? name : vacancy_name}</FullInfoTitle>
                            {isUserAuthenticated && <FavouriteIcon
                                iconName={'favourite'}
                                onClick={favouriteClickHandler('setToFavourites', id)}
                                isActive={currentChosenResult.isFavourite}
                            />}
                            
                            <ShareIcon
                                iconName={'share'}
                                onClick={() => openModal(ModalVariants.Share)}
                            />
                        </FullInfoHeader>
                    </MainTitle>
                </DefaultContainer>

                <ContentLayout>

                    <MainBlock>
                        <ImgAndMainInfoBlock>
                            {isResume && <FullInfoImageBlock>

                                <FullInfoImage src={avatar || DefaultAvatar}/>

                                <HandsLike
                                    currentMark={currentChosenResult.mark}
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
                                        <SimpleInfo>{mapAge(experience)}</SimpleInfo>
                                    </MainInfoBlockItem>

                                    {places.length > 0 && <MainInfoBlockItem>
                                        <FullInfoBolderText>Города:</FullInfoBolderText>
                                        <SimpleInfo>
                                            {places.map(place => <SimpleInfo>
                                                {place.country_name}
                                                {place.cities.length > 0 && `: ${place.cities.map(city => city.name).join(', ')}`}
                                            </SimpleInfo>)}
                                        </SimpleInfo>    
                                    </MainInfoBlockItem>}

                                    {mainInfoSearchResult.map(param => <MainInfoBlockItem>
                                        <FullInfoBolderText>{param.name}:</FullInfoBolderText>
                                        <SimpleInfo>{param.options?.map(option => option.name).join(', ')}</SimpleInfo>
                                    </MainInfoBlockItem>)}
                                </MainInfoBlock>

                            </FullInfoTextBlock>
                        </ImgAndMainInfoBlock>
                        
                        <FullInfoTextBlock>
                            <FullInfoSubtitle>{isResume ? 'О себе' : 'Описание вакансии'}</FullInfoSubtitle>

                            <FullInfoDescrption>{description}</FullInfoDescrption>
                        </FullInfoTextBlock>
                    </MainBlock>

                    <DescriptionBlock>
                            <FullInfoSubtitle>Подробнее</FullInfoSubtitle>

                            <SecondaryBlockLayout>
                                {secondaryInfoSearchResult.map(param => <MainInfoBlockItem
                                    key={param.name}
                                >
                                    <FullInfoBolderText>{param.name}:</FullInfoBolderText>
                                    <TwoColumnsText>{param.options?.map(option => <div>{option.name}</div>)}</TwoColumnsText>
                                </MainInfoBlockItem>)}
                                
                            </SecondaryBlockLayout>

                            {contacts_info && isUserAuthenticated ? <SecondaryBlockLayout>
                                {contacts_info.filter(contact => Boolean(contact.value)).map(contact => <MainInfoBlockItem key={contact.key}>
                                    <FullInfoBolderText>
                                        {contact.name}:
                                    </FullInfoBolderText>
                                    <TwoColumnsText>
                                        {contact.value}
                                    </TwoColumnsText>
                                </MainInfoBlockItem>)}
                            </SecondaryBlockLayout>
                            : <ContactsButton
                                style={{ marginLeft: 'auto', marginRight: '0' }}
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

                    {isResultsPresent && <TwoLinkedButtonGroup>
                        <LinkedButton to={'/searchResults'}>
                            Вернуться к списку
                        </LinkedButton>
                    </TwoLinkedButtonGroup>}
                </ContentLayout>
                
                {isImageShown && <FullSizedImage/>}
            </>
            : <LoadingLayout>
                <Loading/>
            </LoadingLayout>}
        </MainContainer>
        
    );
};

export default inject('searchStore', 'uiStore', 'localeService')(observer(Vacancy));

const FullInfoHeader = styled.div`
    ${flexAlignCenter}

    > * {
        margin-right: 2rem;
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
    gap: 2rem;
`;

const MainBlock = styled.div`
    padding: 2rem;
    background-color: #F7FBFC;

    ${props => props.theme.smallBorderRadius}
`;

const ImgAndMainInfoBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    align-items: start;
    gap: 2rem;

    margin-bottom: 1.5rem;
`;

const MainInfoBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

    gap: 1rem;
`;

const MainInfoBlockItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 1rem;
`;

const DescriptionBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    padding: 2rem;
    background-color: #F7FBFC;

    ${props => props.theme.smallBorderRadius}
`;

const SecondaryBlockLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 48%));
    gap: 1.5rem;
`;

const FullInfoImageBlock = styled.div`

    display: flex;
    flex-direction: column;
    gap: 1rem;

    > * {
        flex-grow: 1;
    }
`;

const CategoryName = styled.div`
    font-weight: 600;
    background-color: #F1F3F6;
    padding: 1em 5em;
    text-align: center;
    align-self: center;

    ${props => props.theme.smallBorderRadius}
`;

const FullInfoTextBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    max-width: 20rem;
    max-height: 20rem;
`;

const SimpleInfo = styled.div``;

const TwoColumnsText = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    gap: 1rem;
`;

const FullInfoTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const FullInfoSubtitle = styled.div`
    font-size: 1.25rem;
`;

const FullInfoBolderText = styled.div`
    font-weight: bolder;
`;

const FullInfoDescrption = styled.div`
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #6F80A5;

    ${props => props.theme.smallBorderRadius}
`;

const ContactsButton = styled(CommonButton)`
    align-self: flex-end;
`;

const ExamplesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 2.5rem;
    background-color: #F7FBFC;

    ${props => props.theme.smallBorderRadius}
`;

const ExamplesImageLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5rem, 7rem));
    grid-template-rows: 6rem;
    gap: .75rem;
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

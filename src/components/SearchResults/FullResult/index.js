import React, {useEffect} from 'react';
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

function Vacancy({ searchStore, uiStore: { isUserAuthenticated } }) {
    const { 
        isCurrentSearchResult, setCurrentResult } = searchStore;

    const { name, description, experience, avatar, parameters, salary, salary_type,
        places, category, employer, contacts_info, mark, isFavourite, vacancy_name,
        create_date, currency } = searchStore.currentChosenResult || {};

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
                            onClick={() => {}}
                            isActive={false}
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
                                currentMark
                                onHandClick
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
                            </MainInfoBlock>

                        </FullInfoTextBlock>
                    </MainBlock>

                    <DescriptionBlock>
                        <FullInfoSubtitle>Описание вакансии</FullInfoSubtitle>

                        <FullInfoDescrption>{description}</FullInfoDescrption>
                    </DescriptionBlock>

                    <SecondaryBlock>
                        <FullInfoSubtitle>Подробнее</FullInfoSubtitle>

                        <SecondaryBlockLayout>
                            {parameters.map(parameter => <MainInfoBlockItem
                                key={parameter.name}
                            >
                                <FullInfoBolderText>{parameter.name}:</FullInfoBolderText>
                                <div>{parameter.options.map(option => option.name).join(', ')}</div>
                            </MainInfoBlockItem>)}
                        </SecondaryBlockLayout>
                        
                        
                    </SecondaryBlock>
                    
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

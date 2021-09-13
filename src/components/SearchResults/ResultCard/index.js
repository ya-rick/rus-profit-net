import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import DefaultAvatar from '../../../images/avatar.png'

import HandsLike from '../HandsLike';
import Icon from '../../../common/components/Icon';


function ResultCard({ result, resultType, searchStore, uiStore: { isUserAuthenticated } }) {

    const [redirectToID, setRedirectID] = useState(null);

    const { category, city, country, experience, parameters, salary,
        salary_type, description, name, avatar, id, mark, isFavourite } = result;
        
    const isResume = resultType === 'getResumes';

    const { onLikeClicked, onFavouriteClicked } = searchStore;

    if (redirectToID) {
        return <Redirect to={`/searchResults/${isResume ? 'getResumeByID' : 'getVacancyByID'}/${redirectToID}`}/>
    }

    function onPlusClicked(result) {
        return () => {
            searchStore.setCurrentResult(result);
            setRedirectID(result.id);
        }
    }

    return (
        <CardWrapper>
            {isResume && <CardImageBlock>

                <CardImage src={avatar || DefaultAvatar}/>

                {isUserAuthenticated && <HandsLike
                    currentMark={mark}
                    onHandClick={onLikeClicked(isResume ? 'resume' : 'vacancy', id)}
                />}

            </CardImageBlock>}

            <CardInfoBlock>

                <CardHeader>
                    <CardTitle>
                        {isResume ? name : category}
                        {!isResume && <CardSubtitle>{`${country}, ${city}`}</CardSubtitle>}
                    </CardTitle>
                    {isUserAuthenticated && <FavouriteIcon
                        iconName={'favourite'}
                        onClick={onFavouriteClicked(isResume ? 'resumeToFavourites' : 'vacancyToFavourites', id)}
                        isActive={isFavourite}
                    />}
                    <PlusIcon
                        iconName={'plus'}
                        onClick={onPlusClicked(result)}
                    />
                </CardHeader>

                <CardOptionalInfoBlock>
                    <div>Опыт {experience} лет</div>
                    <div>{parameters[0]?.options[0]?.name}</div>
                    <div>{salary} {salary_type}</div>
                </CardOptionalInfoBlock>

                <CardSubtitle>Описание вакансии</CardSubtitle>

                <CardDescrption>{description}</CardDescrption>

            </CardInfoBlock>
            
        </CardWrapper>
    );
};

export default inject('searchStore', 'uiStore')(observer(ResultCard));

const CardWrapper = styled.div`
    padding: 50px;
    border-radius: 15px;

    display: flex;
    gap: 40px;

    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }
`;

const CardImageBlock = styled.div`
    flex: 1 1 30%;

    display: flex;
    flex-direction: column;
    align-items: center;
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

const PlusIcon = styled(Icon)`
    cursor: pointer;
`;

const CardImage = styled.img`
    width: 100%;
    max-height: 300px;
`;

const CardInfoBlock = styled.div`
    flex: 1 1 70%;

    > * {
        margin-bottom: 40px;
    }

    > *:last-child {
        margin-bottom: 0;
    }

`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    align-content: center;

    > * {
        margin-right: 40px;
    }

    > *:last-child {
        margin-right: 0;
        margin-left: auto;
    }
`;

const CardTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const CardSubtitle = styled.div`
    font-size: 25px;
    font-weight: 500;
`;

const CardOptionalInfoBlock = styled.div`
    display: flex;

    > div {
        margin-inline-start: 100px;
        font-size: 20px;
    }

    > div:first-child {
        margin-inline-start: 0;
    }
`;

const CardDescrption = styled.div`
    border-radius: 15px;
    padding: 20px;
    font-size: 20px;
    border: 1px solid #6F80A5;
`;

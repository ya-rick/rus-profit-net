import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import DefaultAvatar from '../../../images/avatar.png'

import HandsLike from '../../../components/SearchResults/HandsLike';
import Icon from '../Icon';
import { mapAge } from '../../utils';
import { ModalVariants } from '../../consts';
import { requestWithParams } from '../../../api/exchangeLayer';


export default inject('searchStore', 'uiStore')(observer(ResultCard));

function ResultCard({
    result, isResume, onSelectResult,
    uiStore: { userModel: { isUserAuthenticated }, openModal }
}) {

    const { category, places, experience, parameters, salary,
        salary_type, description, name, avatar, id, mark, isFavourite } = result;

    function onFavouriteClicked(type, id) {
        requestWithParams(type, {
            id,
        })
            .then(() => {
                if (this.results.length) {
                    this.results.forEach(result => {
                        if (result.id === id) {
                            result.isFavourite = !result.isFavourite;
                        }
                    })
                } else {
                    // case of exact loading from route of vacncy/resume
                    this.currentChosenResult.isFavourite = !this.currentChosenResult.isFavourite;
                }
                
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
        <CardWrapper onClick={onSelectResult}>
            {isResume && <CardImageBlock>

                <CardImage src={avatar || DefaultAvatar}/>

                <HandsLike
                    currentMark={mark}
                    onHandClick={likeClicked(isResume ? 'resume' : 'vacancy', id)}
                />

            </CardImageBlock>}

            <CardInfoBlock>

                <CardHeader>
                    <CardTitle>
                        {isResume ? name : category}
                        {!isResume && <CardSubtitle>{places[0].country_name}: {places[0].cities.length > 0 ?
                            places[0].cities.map(city => city.name).join(',')
                            : 'Все города'}</CardSubtitle>}
                    </CardTitle>
                    {isUserAuthenticated && <FavouriteIcon
                        iconName={'favourite'}
                        onClick={favouriteClickHandler(isResume ? 'resumeToFavourites' : 'vacancyToFavourites', id)}
                        isActive={isFavourite}
                    />}
                    <PlusIcon
                        iconName={'plus'}
                        onClick={onSelectResult}
                    />
                </CardHeader>

                <CardOptionalInfoBlock>
                    <div>Опыт: {mapAge(experience)}</div>
                    <div>{parameters[0]?.options[0]?.name}</div>
                    <div>{salary} {salary_type}</div>
                </CardOptionalInfoBlock>

                <CardSubtitle>Описание вакансии</CardSubtitle>

                <CardDescrption>{description}</CardDescrption>

            </CardInfoBlock>
            
        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    padding: 50px;
    border-radius: 15px;
    background-color: #F7FBFC;
    margin-bottom: 30px;

    > :last-child {
        margin-bottom: 0;
    }

    display: flex;
    gap: 40px;

    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }

    @media (max-width: 1000px) {
        flex-wrap: wrap;
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
`;

const CardInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
    max-height: calc(23px * 4);
    word-break: break-all;
    overflow-y: auto;
`;

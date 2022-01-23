import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';

import DefaultAvatar from '../../../images/avatar.png'

import HandsLike from '../../../components/SearchResults/HandsLike';
import Icon from '../Icon';
import { mapAge } from '../../utils';
import { ModalVariants } from '../../consts';
import { requestWithParams } from '../../../api/exchangeLayer';
import ProfileFooter, { ProfileFooterLayout } from './ProfileFooter';
import ProfileHeaderOptions from './ProfileHeaderOptions';
import { forDevice } from '../../commonAdaptiveStyles';


export default inject('searchStore', 'uiStore', 'createEditStore', 'localeService')(observer(ResultCard));

function ResultCard({
    result, onSelectResult, userProfileInfo = false, viewsOrFavourites = false,
    uiStore: { userModel: { isUserAuthenticated, setTabResultsType }, openModal },
    createEditStore, onDeleteCallback,
    localeService
}) {

    const { category, places, experience, parameters, salary, type,
        description, name, avatar, id, mark, isFavourite, status,
        count_favorites, count_views } = result;

    const isResume = type === 'resume';

    const disabled = userProfileInfo && (status === 'stopped' || status === 'pending');

    function onFavouriteClicked(type, id) {
        return requestWithParams(type, {
            id,
        })
            .then(() => {
                result.isFavourite = !result.isFavourite;
            })
            .catch(err => localeService.getByKey(err.type));
    }

    function favouriteClickHandler(type, id) {
        return e => {
            e.stopPropagation();

            onFavouriteClicked(type, id)
                .then(() => {
                    if (isFavourite) {
                        onDeleteCallback && onDeleteCallback(id);
                    }
                })
        }
    }

    function likeClicked(type_mark, id) {
        return async (mark) => {
            try {
                const fromServerResult = await requestWithParams('setMark', {
                    type_mark, id, value: mark
                });

                result.mark = fromServerResult.new_mark;
            } catch(e) {
                openModal(ModalVariants.InfoModal, {
                    title: 'Ошибка!',
                    description: localeService.getByKey('unauthorized_mark')
                });
            }
        }
    }

    async function onEditClicked() {
        try {
            createEditStore.startUpdating(result)
        } catch (e) {
            localeService.getByKey(e.message);
        }
    }

    async function toggleActiveState(status) {
        try {
            await requestWithParams('toggleActivation', {
                type_data: type,
                status, id: result.id
            });

            result.status = status;
        } catch (e) {
            openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey(e.message)
            });
        }
    }

    async function deleteResult() {
        try {
            await requestWithParams('delete', { id });

            onDeleteCallback && onDeleteCallback(id);
        } catch (e) {
            openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey(e.message)
            });
        }
    }

    function onFooterLinksClickCallback() {
        return e => {
            e.stopPropagation();

            setTabResultsType(type);
        }
    }

    function onClickWrapper(e) {
        e.stopPropagation();

        if (!disabled) onSelectResult();
    }

    const withImageBlock = isResume && !userProfileInfo;

    return (
        <CardWrapper
            onClick={onClickWrapper}
            disabled={disabled}
            withImage={withImageBlock}
            isInProfile={userProfileInfo}
        >
            <CardInfosLayout withImage={withImageBlock}>
                {withImageBlock && <CardImageBlock>

                    <CardImage src={avatar || DefaultAvatar}/>

                    <HandsLike
                        currentMark={mark}
                        onHandClick={likeClicked(type, id)}
                    />

                </CardImageBlock>}

                <CardInfoBlock smallerFont={userProfileInfo || viewsOrFavourites}>

                    <CardHeader>
                        <CardTitle>
                            {isResume ? name : category.name}
                            {!isResume && places.length > 0 && <CardCountryBlock>
                                {places[0].country_name}
                                {places[0].cities.length > 0 && `: ${places[0].cities.map(city => city.name).join(', ')}`}
                            </CardCountryBlock>}
                        </CardTitle>

                        {isUserAuthenticated && !userProfileInfo && <FavouriteIcon
                            iconName={'favourite'}
                            onClick={favouriteClickHandler('setToFavourites', id)}
                            isActive={isFavourite}
                        />}

                        {userProfileInfo
                            ? <ProfileHeaderOptions 
                                    onTrashClickCallback={deleteResult}
                                    onButtonClickCallback={toggleActiveState}
                                    status={status}
                                    disabled={disabled}
                                    isResume={isResume}
                                />
                            : <PlusIcon
                                iconName={'plus'}
                                onClick={onSelectResult}
                            />
                        }
                    </CardHeader>

                    <CardOptionalInfoBlock>
                        <div>Опыт: {mapAge(experience)}</div>
                        <div>{parameters[0]?.options[0]?.name}</div>
                        <div>{salary.value} {salary.currency.value} {salary.type.value}</div>
                    </CardOptionalInfoBlock>

                    <CardSubtitle>Описание {isResume ? 'анкеты' : 'вакансии'}</CardSubtitle>

                    <CardDescrption>{description}</CardDescrption>

                </CardInfoBlock>
            </CardInfosLayout>
            
            {userProfileInfo && <ProfileFooter
                resultID={id}
                disabled={disabled}
                editClicked={onEditClicked}
                type={type}
                count_favorites={count_favorites}
                count_views={count_views}
                onFavouritesClickCallback={onFooterLinksClickCallback}
                onViewsClickCallback={onFooterLinksClickCallback}
            />}

        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    position: relative;

    font-size: ${props => props.isInProfile ? '.75rem' : '1rem'};
    padding: 4%${props => props.withImage && '5%'};
    background-color: #F7FBFC;
    margin-bottom: 1.5rem;
    
    > :last-child {
        margin-bottom: 0;
    }
    
    ${props => props.disabled && css`
    
        ${CardInfosLayout} > *, ${ProfileFooterLayout}, ${CardTitle} {
            > *:not(${CardHeader}) {
                filter: opacity(0.5);
                cursor: default;
                pointer-events: none;
            }
        }
    `};
    
    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }

    ${props => props.theme.smallBorderRadius};
`;

const CardInfosLayout = styled.div`
    gap: 2rem;

    ${forDevice.M(css`
        display: grid;
        grid-template-columns: ${props => props.withImage && '1fr'} 2fr;
        align-items: start;
    `)}
`;

const CardImageBlock = styled.div`
    flex: 1 1 30%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

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

const PlusIcon = styled(Icon)`
    position: absolute;
    top: 10px;
    right: 10px;

    cursor: pointer;

    ${forDevice.M(css`
        position: static;
        margin-inline: auto 0; 
    `)}
`;

const CardImage = styled.img`
    width: 100%;
`;

const CardInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    font-size: ${props => props.smallerFont ? '1.5rem' : '2rem'};

    > * {
        margin-bottom: 1rem;
    }

    > *:last-child {
        margin-bottom: 0;
        flex-grow: 1;
    }

`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const CardTitle = styled.div`
    font-size: .8em;
    font-weight: bold;

    margin-block-start: 1rem;
`;

const CardCountryBlock = styled.div`
    font-size: .6em;
`;

const CardSubtitle = styled.div`
    font-size: .7em;
    font-weight: 500;
`;

const CardOptionalInfoBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;

    > div {
        font-size: .5em;
    }
`;

const CardDescrption = styled.div`
    padding: 1rem;
    font-size: .5em;
    border: 1px solid #6F80A5;
    max-height: calc(23px * 10);
    word-break: break-all;
    overflow-y: auto;
    ${props => props.theme.smallBorderRadius};
`;

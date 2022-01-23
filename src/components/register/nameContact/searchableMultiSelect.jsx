import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { requestWithParams } from '../../../api/exchangeLayer';
import Icon from '../../../common/components/Icon';
import OutsideClickWrapper from '../../../common/components/OutsideClickWrapper';
import { RegularTitle } from '../../../common/components/Typography';
import { useToggle } from '../../../common/hooks';

export const SearchableMultiSelect = observer(({
    isCountry = false, onTagClick, onTagDelete,
    editableCountryID, chosenOptions, onItemSelected,
    emptyCaseMessage, title, ...rest
}) => {

    const disabled = !editableCountryID && !isCountry;

    const [isOpen, toggleOpen] = useToggle();

    const [searchParam, setSearchParam] = useState('');
    const [apiResult, setApiResult] = useState(null);

    function onSomethingClicked(data, callback) {
        return (e) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            setSearchParam('');
            callback(data);
        }
    }

    function resultExcept(initResult, chosen) {
        if (!chosen) return initResult || [];

        return initResult?.filter(el => !chosen.find(option => option.id === el.id))
    }

    function filterBySearch(search) {
        return apiResult?.filter(el => {
            let searchLower = search.toLowerCase();

            return el.name.toLowerCase().includes(searchLower) || el.name_en?.toLowerCase().includes(searchLower);
        });
    }

    useEffect(() => {

        if (isCountry) {
            requestWithParams('getCountries')
                .then(res => setApiResult(res.countries))
        }

    }, [])

    useEffect(() => {

        if (!isCountry) {
            setApiResult(null);

            requestWithParams('getCities', { value: searchParam, 'country_id[]': editableCountryID })
                .then(res => setApiResult(res.countries && res.countries[0]?.cities))
        }

    }, [searchParam, editableCountryID]);

    return (
        <div {...rest}>
            <RegularTitle>{title}</RegularTitle>
            <OutsideClickWrapper onOutsideClickHandler={() => toggleOpen(false)}>
                {elRef => <SelectWrapper ref={elRef}>

                    <SelectTagedHeader
                        disabled={disabled}
                    >

                        <SelectTagsContainer>
                            <InputTag
                                onChange={e => setSearchParam(e.target.value)}
                                onClick={() => toggleOpen(true)}
                                value={searchParam}
                                placeholder={'Поиск'}
                            />
                            {!chosenOptions.length && <Message>
                                {emptyCaseMessage}    
                            </Message>}
                            {chosenOptions?.map(tag => <SelectTag
                                onClick={onSomethingClicked(tag, onTagClick)}
                            >
                                {tag.name}
                                <Icon
                                    iconName={'exit'}
                                    onClick={onSomethingClicked(tag, onTagDelete)}
                                    key={tag.id}
                                />
                            </SelectTag>)}
                        </SelectTagsContainer>

                        <Icon
                            iconName={'arrow_down'}
                            cursorDefault
                            onClick={() => toggleOpen()}
                        />

                    </SelectTagedHeader>

                    {isOpen && <SelectDropdown>

                        <SelectDropdownList>
                            {resultExcept(filterBySearch(searchParam), chosenOptions)?.map(tag => (
                                <SelectDropdownItem 
                                    onClick={onSomethingClicked(tag, onItemSelected)}
                                    key={tag.id}
                                >
                                    {tag.name}
                                </SelectDropdownItem>
                            )) || <NoResults>Нет результатов</NoResults>}
                        </SelectDropdownList>
                        

                    </SelectDropdown>}

                </SelectWrapper>}
            </OutsideClickWrapper>
        </div>
    )
});

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const SelectTagedHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 20px;
    column-gap: 20px;
    padding: 0.3em 1em;
    align-items: center;
    border: 2px solid #6F80A5;
    background: #FFFFFF;
    border-radius: 15px;
    min-height: 42px;

    ${props => props.disabled && css`border-color:#b5c1db;`}
`;

const SelectTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 15px;
    row-gap: 10px;

    > * {
        max-width: 50%;
    }
`;

const tagStyles = css`
    display: flex;
    align-items: center;
    column-gap: 5px;
    padding: 0.1em 0.5em;
    border-radius: 15px;
    font-size: 0.8em;
`;

const InputTag = styled.input`
    ${tagStyles}

    border: 2px solid #6F80A5;
`;

const SelectTag = styled.div`
    ${tagStyles}

    cursor: pointer;
    transition: box-shadow 300ms;
    box-shadow: 2px 2px 10px #4C5E8B;

    :hover {
        box-shadow: 2px 2px 15px #4C5E8B;
    }

    & > div {
        height: 1em;
        width: 1em;

        :hover {
            > svg > path {
                fill: #a56c76;
            }    
        }
    }
`;

const SelectDropdown = styled.div`
    position: absolute;
    width: 100%;
    border: 2px solid #6F80A5;;
    border-top: none;
    border-radius: 15px;
    background: #FFFFFF;
    z-index: 10;
`;

const SelectDropdownList = styled.div`
    overflow-y: scroll;
    max-height: 200px;
    margin: 5px;
`;

const SelectDropdownItem = styled.div`
    transition: 300px;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    :hover {
        box-shadow: 1px 1px 10px #4C5E8B;
    }
`;

const NoResults = styled.div`
    padding: 5px 10px;
`;

const Message = styled.div`
    color: grey;
    font-size: .7em;
`;

import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { requestWithParams } from '../../api/exchangeLayer';
import Icon from '../../common/components/Icon';
import OutsideClickWrapper from '../../common/components/OutsideClickWrapper';

export const SearchableMultiSelect = observer(({ isCountry = false, onTagClick, onTagDelete,
    editableCountryID, chosenOptions, onItemSelected }) => {

    const disabled = !editableCountryID && !isCountry;
    
    function onSomethingClicked(data, callback) {
        return (e) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            callback(data);
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen(val) {
        if (disabled) {
            return;
        }

        if (val === true) {
            setIsOpen(true);
        } else if (val === false) {
            setIsOpen(false);
        } else {
            setIsOpen(preVal => !preVal);
        }
    }

    const [searchParam, setSearchParam] = useState('');
    const [apiResult, setApiResult] = useState(null);

    function resultExcept(initResult, chosen) {
        if (!chosen) return initResult || [];
        
        return initResult?.filter(el => !chosen.find(option => option.id === el.id))
    }

    function filterBySearch(search) {
        return apiResult?.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));
    }

    useEffect(() => {

        if (isCountry) {
            requestWithParams('getCountries')
                .then(res => setApiResult(res.countries))
        }

    }, [])

    useEffect(() => {

        if (!isCountry && searchParam.length >= 3) {
            setApiResult(null);

            requestWithParams('getCities', { value: searchParam, 'country_id[]': editableCountryID })
                .then(res => setApiResult(res.countries && res.countries[0]?.cities))
        }
        

    }, [searchParam, editableCountryID])

    return (
        <OutsideClickWrapper onOutsideClickHandler={() => toggleOpen(false)}>
            {elRef => <SelectWrapper ref={elRef}>

                <SelectTagedHeader
                    onClick={toggleOpen}
                    disabled={disabled}
                >

                    <SelectTagsContainer>
                        {chosenOptions?.map(tag => <SelectTag
                            active={tag.id === editableCountryID}
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
                    />

                </SelectTagedHeader>

                {isOpen && <SelectDropdown>

                    <SelectSearchField
                        onChange={e => setSearchParam(e.target.value)}
                        value={searchParam}
                    />

                    <SelectDropdownList>
                        {resultExcept(filterBySearch(searchParam), chosenOptions)?.map(tag => (
                            <SelectDropdownItem 
                                onClick={onSomethingClicked(tag, onItemSelected)}
                                key={tag.id}
                            >
                                {tag.name}
                            </SelectDropdownItem>
                        )) || <NoResults>Нет результатов. Для начала поиска выберите страну поиска и введите 3 или больше символов</NoResults>}
                    </SelectDropdownList>
                    

                </SelectDropdown>}

            </SelectWrapper>}
        </OutsideClickWrapper>
    )
})

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const SelectTagedHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 20px;
    padding: 11px 12px;
    align-items: center;
    border: 2px solid #6F80A5;
    background: #FFFFFF;
    border-radius: 15px;
    min-height: 43px;

    ${props => props.disabled && 'border-color:#b5c1db'}
`;

const SelectTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 10px;
`;

const SelectTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    padding: 0.5em;
    border-radius: 15px;
    cursor: pointer;
    transition: 300ms;
    padding: 6px 8px;
    font-size: 0.8em;
    box-shadow: 2px 2px 10px #4C5E8B;

    ${props => props.active && `
        box-shadow: 6px 6px 10px #4C5E8B;
        transform: scale(1.15);
    `}

    :hover {
        box-shadow: 6px 6px 10px #4C5E8B;
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

const SelectSearchField = styled.input`
    width: 100%;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    box-shadow: 4px 4px 10px #4C5E8B;
    padding: 5px 10px;
    margin-bottom: 10px;
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

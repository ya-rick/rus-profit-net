import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { requestWithParams } from '../../api/exchangeLayer';
import { useToggle } from '../hooks';
import OutsideClickWrapper from './OutsideClickWrapper';
import { ArrowDown } from './select';

export default function CurrencySelect({ onChange, current }) {
    const [currencies, setCurrencies] = useState([]);
    const [isOpen, toggleOpen] = useToggle(false);

    useEffect(() => {

        requestWithParams('getCurrencies')
            .then(data => {
                setCurrencies(data.currencies)
                if (!current) {
                    onChange(data.currencies[0]);
                }
            })

    }, []);

    function onItemClick(item) {
        return (e) => {
            e?.stopPropagation();

            onChange(item);
            toggleOpen(false);
        }
    }

    return <OutsideClickWrapper onOutsideClickHandler={() => toggleOpen(false)}>
        {elRef => <CurrencySelectWrapper ref={elRef}>
            <CurrencySelectHeader onClick={() => toggleOpen()}>
                {currencies.find(currency => currency.id === current)?.value}
                <ArrowDown isInverted={isOpen}/> 
            </CurrencySelectHeader>


            {isOpen && <CurrencySelectDropdown>
                {currencies.map(currency => <CurrencySelectDropdownItem 
                    key={currency.id}
                    onClick={onItemClick(currency)}
                >
                    {currency.value}
                </CurrencySelectDropdownItem>)}
            </CurrencySelectDropdown>}
            
        </CurrencySelectWrapper>}
    </OutsideClickWrapper>
}

const CurrencySelectWrapper = styled.div`
    position: relative;

    width: 50px;
    color: #6F80A5;
    padding: 0 0.5em;
    cursor: pointer;
`;

const CurrencySelectHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CurrencySelectDropdown = styled.div`
    position: absolute;
    z-index: 5;
    top: 160%;
    left: 50%;
    width: 100%;
    overflow-y: auto;
    max-height: 100px;
    transform: translateX(-50%);
    border: 2px solid #6F80A5;
    border-radius: 15px;
`;

const CurrencySelectDropdownItem = styled.div`
    background: #FFFFFF;
    text-align: center;
    font-size: 13px;
`;

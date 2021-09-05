import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { requestWithParams } from '../../api/exchangeLayer';
import { ArrowDown } from '../../components/select';

export default function CurrencySelect({ onChange, ...props }) {
    const [currencies, setCurrencies] = useState([]);
    const [currentCurrency, setCurrentCurrency] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        requestWithParams('getCurrencies')
            .then(data => {
                setCurrencies(data.currencies)
                setCurrentCurrency(data.currencies[0].symbol)
                onChange(data.currencies[0])
            })

    }, [])

    function toggleOpen (isOpen) {
        if (isOpen === true) {
            setIsOpen(true);
        } else if (isOpen === false) {
            setIsOpen(false);
        } else {
            setIsOpen(prevState => !prevState);
        }
    }

    function onItemClick(item) {
        return (e) => {
            e?.stopPropagation()

            setCurrentCurrency(item.symbol)
            onChange(item)
            toggleOpen(false)
        }
    }

    return <CurrencySelectWrapper>
        <CurrencySelectHeader onClick={toggleOpen}>
            {currentCurrency}
            <ArrowDown isInverted={isOpen}/> 
        </CurrencySelectHeader>

        {isOpen && <CurrencySelectDropdown>
            {currencies.map(currency => <CurrencySelectDropdownItem 
                key={currency.id}
                onClick={onItemClick(currency)}
            >
                {currency.symbol}
            </CurrencySelectDropdownItem>)}
        </CurrencySelectDropdown>}
        
    </CurrencySelectWrapper>
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
    top: 155%;
    left: 50%;
    width: 100%;
    overflow-y: auto;
    max-height: 100px;
    transform: translateX(-50%);
    border: 2px solid #6F80A5;
    border-top: none;
    border-radius: 15px;
`;

const CurrencySelectDropdownItem = styled.div`
    background: #FFFFFF;
    text-align: center;
    font-size: 13px;
    line-height: 23px;
`;

import { useState } from 'react';

import { SelectWrapper, SelectHeader, SelectDropdownList, SelectDropdownItem, ArrowWrapper } from './styles';
import { arrow_down } from '../../common/svgElements';

function ArrowDown ({ isInverted = false }) {
    return (
        <ArrowWrapper isInverted={isInverted}>
            {arrow_down}
        </ArrowWrapper>
    )
}

export default function Select ({ headerTitle = 'default', elements, children, onItemClickCallback = () => {} }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen (isOpen) {
        if (isOpen === true) {
            setIsOpen(true);
        } else if (isOpen === false) {
            setIsOpen(false);
        } else {
            setIsOpen(prevState => !prevState);
        }
    }
    
    function onItemClick (index, title) {
        return () => {
            toggleOpen(false);
            onItemClickCallback(index, title);
        }
    }

    function renderChildren () {
        let toBeRendered = elements || children;

        return toBeRendered?.map((element, index) => <SelectDropdownItem onClick={onItemClick(index, element)}>{element}</SelectDropdownItem>)
    }
    
    return (
        <SelectWrapper>
            <SelectHeader onClick={toggleOpen}>
                {headerTitle}
                <ArrowDown isInverted={isOpen}/>
            </SelectHeader>

            {isOpen && <SelectDropdownList>
                {renderChildren()}
            </SelectDropdownList>}
        </SelectWrapper>
    )
}
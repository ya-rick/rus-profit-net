import { useState } from 'react';

import { SelectWrapper, SelectHeader, SelectDropdownList, SelectDropdownItem,
    ArrowWrapper, SelectTitle, SelectedItem, SelectHeaderLayout } from './styles';
import { arrow_down } from '../../common/svgElements';

function ArrowDown ({ isInverted = false }) {
    return (
        <ArrowWrapper isInverted={isInverted}>
            {arrow_down}
        </ArrowWrapper>
    )
}

/**
 * @param {array} elements - Array of elements { value: <some value>, text: <some text> } 
 */

export default function Select ({ headerTitle, elements, children, onItemClickCallback = () => {}, leftHeaderItem }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, selectItem] = useState(null)

    function toggleOpen (isOpen) {
        if (isOpen === true) {
            setIsOpen(true);
        } else if (isOpen === false) {
            setIsOpen(false);
        } else {
            setIsOpen(prevState => !prevState);
        }
    }
    
    function onItemClick (element) {
        return () => {
            toggleOpen(false);
            selectItem(element)
            onItemClickCallback(element);
        }
    }

    function renderChildren () {
        let toBeRendered = elements || children;

        return toBeRendered?.map(element => <SelectDropdownItem onClick={onItemClick(element)}>{element.text}</SelectDropdownItem>)
    }
    
    return (
        <SelectWrapper>
            {headerTitle && <SelectTitle>
                {headerTitle}
            </SelectTitle>}

            <SelectHeaderLayout>
                {leftHeaderItem && leftHeaderItem}
                <SelectHeader onClick={toggleOpen}>
                    <SelectedItem>{selectedItem?.text}</SelectedItem>
                    <ArrowDown isInverted={isOpen}/>    
                </SelectHeader>
            </SelectHeaderLayout>
            
            {isOpen && <SelectDropdownList>
                {renderChildren()}
            </SelectDropdownList>}
        </SelectWrapper>
    )
}
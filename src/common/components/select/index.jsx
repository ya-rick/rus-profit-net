import { useEffect } from 'react';

import { SelectWrapper, SelectHeader, SelectDropdownList, SelectDropdownItem,
    ArrowWrapper, SelectLayout, SelectedItem } from './styles';
import { arrow_down } from '../../svgElements';
import OutsideClickWrapper from '../OutsideClickWrapper';
import { useToggle } from '../../hooks';


export function ArrowDown ({ isInverted = false }) {
    return (
        <ArrowWrapper isInverted={isInverted}>
            {arrow_down}
        </ArrowWrapper>
    )
}

export default function Select ({
    noHeaderBorders, elements, children, onItemClickCallback = () => {}, leftHeaderItem, current
}) {
    const [isOpen, toggleOpen] = useToggle(false);

    useEffect(() => {
        if (!current) {
            onItemClickCallback(children[0]);
        }
    }, []);
    
    function onItemClick (element) {
        return () => {
            toggleOpen(false);
            onItemClickCallback(element);
        }
    }

    function renderChildren () {
        let toBeRendered = elements || children;

        return toBeRendered?.map(element => <SelectDropdownItem onClick={onItemClick(element)}>{element.name}</SelectDropdownItem>)
    }
    
    return (
        <OutsideClickWrapper onOutsideClickHandler={() => toggleOpen(false)}>
            {(elRef) => <SelectWrapper ref={elRef}>

                {leftHeaderItem && leftHeaderItem}

                <SelectLayout>
                    <SelectHeader
                        onClick={() => toggleOpen()}
                        noBorders={noHeaderBorders}
                    >
                        <SelectedItem>{children.find(type => type.id === current)?.name}</SelectedItem>
                        <ArrowDown isInverted={isOpen}/>    
                    </SelectHeader>

                    {isOpen && <SelectDropdownList>
                        {renderChildren()}
                    </SelectDropdownList>}
                </SelectLayout>


            </SelectWrapper>}
        </OutsideClickWrapper>
    )
}
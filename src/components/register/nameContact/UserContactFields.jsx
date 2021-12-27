import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import Input from '../../../common/components/Input';
import { useToggle } from '../../../common/hooks';
import CheckBox from '../../../common/components/checkbox';
import { RegularTitle } from '../../../common/components/Typography';


export default observer(UserContactFields);

function UserContactFields({ onChangeField, contactFields = [], showMoreButton = false }) {
    const [isAllVisible, toggleVisibility] = useToggle(!showMoreButton);

    function togglePrefered(contact) {
        return newVal => onChangeField('contacts_info')({...contact, prefered: newVal})
    }

    function renderByConditions() {
        let transformedFields = toJS(contactFields);

        if (showMoreButton) {
            transformedFields.sort((fieldA, fieldB) => fieldB.prefered - fieldA.prefered);
        }

        if (!isAllVisible) {
            transformedFields = transformedFields.slice(0, 3);
        }

        return transformedFields;
    }

    return <>
        {renderByConditions().map(contact => (
            <ContactBlockContainer>
                <RegularTitle>{contact.name}</RegularTitle>
                    <ContactBlockLayout>
                        <CheckBox
                            isChecked={contact.prefered}
                            check={togglePrefered(contact)}
                        />
                        <Input
                            value={contact.value}
                            onChange={e => onChangeField('contacts_info')({...contact, value: e.target.value})}
                        />
                    </ContactBlockLayout>
            </ContactBlockContainer>
        ))}

        {showMoreButton && <ShowMoreButton onClick={() => toggleVisibility()}>{!isAllVisible ? 'Посмотреть все' : 'Свернуть'}</ShowMoreButton>}
    </>
}

const ContactBlockContainer = styled.div``;

const ContactBlockLayout = styled.div`
    display: grid;
    grid-template-columns: 2rem 1fr;
    align-items: center;
    column-gap: 1.5rem;
`;

const ShowMoreButton = styled.button`
    padding: .5rem 1rem;
    background-color: #F7FBFC;
    width: max-content;
    height: min-content;
    margin-block: auto 0;

    ${props => props.theme.smallBorderRadius}
`;

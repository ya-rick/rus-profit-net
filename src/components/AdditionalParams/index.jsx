import React, {Component} from 'react';
import styled, { css } from 'styled-components';

import AdditionalParamItem from './AdditionalParamItem';
import { RegularTitle } from '../../common/components/Typography';
import { forDevice } from '../../common/commonAdaptiveStyles';
import Icon from '../../common/components/Icon';


export default class MenuButtonsDocs extends Component {

    state = {
        visible: []
    }

    componentDidMount() {
        this.props.categories && this.setState({ visible: this.props.categories.map(() => false) });
    }

    onChangeCheck = (newID) => {
        let newChecked = [...this.props.selectedParameters];

        if (newChecked.includes(newID)) {
            newChecked = newChecked.filter( id => id !== newID );
        } else {
            newChecked.push(newID)
        }

        this.props.onCheckChanged(newChecked)
    }

    onVisibleChange(toggleID) {
        return () => {
            let newVisible = [...this.state.visible];
            newVisible[toggleID] = !newVisible[toggleID];

            this.setState({ visible: newVisible })
        }
    }

    showDocList = (list, visible) =>{
        if(visible){
            return list;
        } else {
            return [];
        }
    };

    render() {
        const { categories, selectedParameters, title, additionalInfo } = this.props;

        return <div>
            {title && (
                <Title>
                    {title}

                    <Icon
                        iconName={'info'}
                        title={additionalInfo}
                    />
                </Title>
            )}
            <ColumnsCenterer>
                {categories && categories.map((category, index) => (
                    <div>
                        <ComboButton
                            onClick={this.onVisibleChange(index)}
                        >
                            {category.name}
                        </ComboButton>
                        {this.state.visible[index] && <AdditionalParamItem listsData={category.parameters} selectedIDs={selectedParameters} chek={this.onChangeCheck}/>}
                    </div>
                ))}
            </ColumnsCenterer>
        </div>
    };
};

const ColumnsCenterer = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    ${forDevice.M(css`
        grid-template-columns: repeat(3, 1fr);
    `)}
`;

const ComboButton = styled.button`
    width: 100%;
    background: #F7FBFC;
    border: 1px solid #6F80A5;
    text-align: start;
    padding: .5rem 1rem;
    font-size: .9rem;

    ${props => props.theme.smallBorderRadius}
`;

const Title = styled(RegularTitle)`
    display: flex;
    align-items: center;
    column-gap: 5px;
`;

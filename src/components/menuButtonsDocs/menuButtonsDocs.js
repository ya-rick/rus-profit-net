import React, {Component} from "react";
import './menuButtonsDocs.css';
import MenuNannyItem from "../menuNannyItem";
import { Centerer } from "../../common/components/Layouts";
import styled from "styled-components";

export default class MenuButtonsDocs extends Component{

    state = {
        visible: []
    }

    componentDidMount() {
        this.props.categories && this.setState({ visible: this.props.categories.map(() => false) });
    }

    onChangeCheck = (newID) => {
        let newChecked = this.props.selectedParameters.includes(newID) ?
            this.props.selectedParameters.filter( id => id !== newID ) :
            (this.props.selectedParameters.push(newID), this.props.selectedParameters);
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
        const { categories, selectedParameters } = this.props;

        return (
            <ColumnsCenterer>
                {categories && categories.map((category, index) => (
                    <div>
                        <button className='combo-button' onClick={this.onVisibleChange(index)}>
                            {category.name}
                        </button>
                        {this.state.visible[index] && <MenuNannyItem listsData={category.parameters} selectedIDs={selectedParameters} chek={this.onChangeCheck}/>}
                    </div>
                ))}
            </ColumnsCenterer>
        );
    };
};

const ColumnsCenterer = styled(Centerer)`
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    margin-top: 30px;
    row-gap: 40px;

    > * {
        flex-basis: 30%;
    }

    @media (max-width: 650px) {
        > * {
            flex-basis: 100%;
        }
    }
`;

import React, {Component} from "react";
import { requestWithParams } from "../../api/exchangeLayer";
import './workCluster.css';

export default class WorkCluster extends Component{

    state = {
        professions: [],
        activeProfession: null
    }

    componentDidMount() {
        requestWithParams('getProfessions')
            .then(data => this.setState({ professions: data.options }));
    }

    onProfessionChanged(newProfessionID) {
        this.setState({ activeProfession: newProfessionID });

        this.props.onProfessionChanged(newProfessionID);
    }

    render() {

        return(
            <div className='work-cluster'>
                {this.state.professions && this.state.professions.map(profession => <button 
                    className={`col-xs-6 col-md-6 col-lg-4 button-work${(profession.id === this.state.activeProfession ? ' button-work-active' : '')}`}
                    onClick={() => this.onProfessionChanged(profession.id)}>
                    {profession.name}
                </button>)}
            </div>
        );
    };
}
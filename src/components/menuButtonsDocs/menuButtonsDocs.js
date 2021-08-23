import React, {Component} from "react";
import './menuButtonsDocs.css';
import MenuNannyItem from "../menuNannyItem";

export default class MenuButtonsDocs extends Component{

    maxId = 0;
    state = {
        docList: [
            this.createListItem('lorem ipsum', true),
            this.createListItem('lorem ipsum', false),
            this.createListItem('lorem ipsum', false),
            this.createListItem('lorem ipsum', false)
        ],
        docVisible : false
    }

    createListItem(label, checked) {
        return {
            id: this.maxId++,
            label,
            checked: checked
        }
    };

    onChangeCheck = (id)=>{
        const {docList} = this.state;
        const newList = docList;
        newList[id].checked = !docList[id].checked;
        this.setState({docList: newList});
    }

    onVisibleChange = ()=>{
        const {docVisible} = this.state;
        if(docVisible){
            this.setState(()=>{
                return{
                    docVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    docVisible: true
                };
            });
        }
    };

    showDocList = (list, visible) =>{
        if(visible){
            return list;
        }else {
            return [];
        }
    };

    render() {
        const {docList, docVisible} = this.state;
        const docElements = this.showDocList(docList, docVisible);
        return (
            <div>
                <div className='container wrap-box'>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Документы
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            График работы
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Родной язык
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Иностранные языки
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Образование
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Обязанности
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
                    </div>
                </div>
            </div>
        );
    };
};
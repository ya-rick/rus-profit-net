import React, {Component} from "react";
import './menuDoctor.css';
import MenuDoctorItem from "../menuDoctorItem";

export default class MenuDoctor extends Component{

    maxId = 100;

    state ={
        documentList:[
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')],
        directionList:[
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')
        ],
        documentationVisible: false,
        directionVisible: false
    };

    createListItem(label) {
        return {
            id: this.maxId++,
            label
        };
    };

    onDirectionChange = ()=>{
        const {directionVisible} = this.state;
        if(directionVisible){
            this.setState(()=>{
                return{
                    directionVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    directionVisible: true
                };
            });
        }
    };

    onVisibleChange = ()=>{
        const {documentationVisible} = this.state;
        if(documentationVisible){
            this.setState(()=>{
                return{
                    documentationVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    documentationVisible: true
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
        const {documentList, documentationVisible, directionList, directionVisible} = this.state;
        const docElements = this.showDocList(documentList, documentationVisible);
        const dirElement = this.showDocList(directionList, directionVisible);
        return(
            <div className='menu-nanny'>
                <div className='container wrap-box'>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Документы
                        </button>
                        <MenuDoctorItem listsData={docElements}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <button className='combo-button' onClick={this.onDirectionChange}>
                            График работы
                        </button>
                        <MenuDoctorItem listsData={dirElement}/>
                    </div>
                </div>
                <div className='container center margin-top-bottom'>
                    <button className='img-button'>
                        Подобрать анкеты
                    </button>
                </div>
            </div>
        );
    };
};

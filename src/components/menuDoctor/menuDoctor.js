import React, {Component} from "react";
import './menuDoctor.css';
import MenuDoctorItem from "../menuDoctorItem";
import MenuNannyItem from "../menuNannyItem";

export default class MenuDoctor extends Component{

    maxId = 100;

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
        return(
            <div className='menu-nanny'>
                <div className='container wrap-box'>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Документы
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Направление
                        </button>
                        <MenuNannyItem listsData={docElements} chek={this.onChangeCheck}/>
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

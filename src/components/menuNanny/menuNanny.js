import React, {Component} from "react";
import './menuNanny.css';
import MenuNannyItem from "../menuNannyItem";

export default class MenuNanny extends Component {
    maxId = 100;
    state = {
        docList: [
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')
        ],
        scheduleList: [
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')
        ],
        nativeLanguageList: [
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')
        ],
        languageList: [
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')
        ],
        educationList: [
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')
        ],
        responsibilitiesList: [
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum'),
            this.createListItem('lorem ipsum')
        ],
        docVisible : false,
        scheduleVisible: false,
        nativeVisible : false,
        languageVisible: false,
        educationVisible : false,
        responsibilitiesVisible: false
    }

    onEducationChange = ()=>{
        const {educationVisible} = this.state;
        if(educationVisible){
            this.setState(()=>{
                return{
                    educationVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    educationVisible: true
                };
            });
        }
    };

    onLanguageChange = ()=>{
        const {languageVisible} = this.state;
        if(languageVisible){
            this.setState(()=>{
                return{
                    languageVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    languageVisible: true
                };
            });
        }
    };

    onNativeChange = ()=>{
        const {nativeVisible} = this.state;
        if(nativeVisible){
            this.setState(()=>{
                return{
                    nativeVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    nativeVisible: true
                };
            });
        }
    };

    onScheduleChange = ()=>{
        const {scheduleVisible} = this.state;
        if(scheduleVisible){
            this.setState(()=>{
                return{
                    scheduleVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    scheduleVisible: true
                };
            });
        }
    };

    onResponsibilitiesChange = ()=>{
        const {responsibilitiesVisible} = this.state;
        if(responsibilitiesVisible){
            this.setState(()=>{
                return{
                    responsibilitiesVisible: false
                };
            });
        }else{
            this.setState(()=>{
                return{
                    responsibilitiesVisible: true
                };
            });
        }
    };

    createListItem(label) {
        return {
            id: this.maxId++,
            label
        }
    };

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
        const {docList, scheduleList, nativeLanguageList, languageList, educationList, responsibilitiesList, docVisible, scheduleVisible, nativeVisible, languageVisible, educationVisible, responsibilitiesVisible} = this.state;
        const docElements = this.showDocList(docList, docVisible);
        const scheduleElements = this.showDocList(scheduleList, scheduleVisible);
        const nativeElements = this.showDocList(nativeLanguageList, nativeVisible);
        const languageElements = this.showDocList(languageList, languageVisible);
        const educationElements = this.showDocList(educationList, educationVisible);
        const responsibilitiesElements = this.showDocList(responsibilitiesList, responsibilitiesVisible);
        return (
            <div className='menu-nanny'>
                <div className='container wrap-box'>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onVisibleChange}>
                            Документы
                        </button>
                        <MenuNannyItem listsData={docElements}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onScheduleChange}>
                            График работы
                        </button>
                        <MenuNannyItem listsData={scheduleElements}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onNativeChange}>
                            Родной язык
                        </button>
                        <MenuNannyItem listsData={nativeElements}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onLanguageChange}>
                            Иностранные языки
                        </button>
                        <MenuNannyItem listsData={languageElements}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onEducationChange}>
                            Образование
                        </button>
                        <MenuNannyItem listsData={educationElements}/>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4'>
                        <button className='combo-button' onClick={this.onResponsibilitiesChange}>
                            Обязанности
                        </button>
                        <MenuNannyItem listsData={responsibilitiesElements}/>
                    </div>
                </div>
                <div className='container center margin-top-15'>
                    <button className='img-button'>
                        Подобрать анкеты
                    </button>
                </div>
            </div>
        );
    };
};

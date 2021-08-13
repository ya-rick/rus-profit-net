import React, {Component} from "react";
import './menuNanny.css';
import MenuButtonsDocs from "../menuButtonsDocs";

export default class MenuNanny extends Component {
    render() {
        return (
            <div className='menu-nanny'>
                <MenuButtonsDocs/>
                <div className='container center margin-top-15'>
                    <button className='img-button'>
                        Подобрать анкеты
                    </button>
                </div>
            </div>
        );
    };
};

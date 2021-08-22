import React, {useState} from 'react';
import './myCalendar.css';
import Calendar from "react-calendar";
import './Calendar.css';

const MyCalendar = ({changeDate}) =>{

    const [date, setDate] = useState(new Date());

    const onChange = date =>{
        setDate(date);
        changeDate(date);
    };

    return(
        <>
            <Calendar onChange={onChange} value={date}/>
        </>
    );
};

export default MyCalendar;
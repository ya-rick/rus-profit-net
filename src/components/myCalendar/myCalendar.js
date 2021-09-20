import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import './Calendar.css';


const MyCalendar = ({ changeDate }) =>{

    const [date, setDate] = useState(new Date());

    const onChange = date =>{
        setDate(date);
        changeDate(date);
    };

    useEffect(() => {
        onChange(new Date(1990, 1, 1));
    }, [])

    return(<Calendar
        onChange={onChange}
        value={date}
    />);
};

export default MyCalendar;
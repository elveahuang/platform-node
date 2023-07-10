import React from 'react';
import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className={'text-center'}>
            <DatePicker />
            <br />
            <Link to={'/home'}>home</Link>
        </div>
    );
};

export default About;

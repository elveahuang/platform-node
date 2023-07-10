import React from 'react';
import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div className={'text-center'}>
            <DatePicker />
            <br />
            <Link to={'/about'}>about</Link>
        </div>
    );
};

export default Index;

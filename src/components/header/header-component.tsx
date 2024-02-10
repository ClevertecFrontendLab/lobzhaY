import React from 'react';

import './header-component.scss';
import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const HeaderComponent: React.FC = () => {
    return (
        <header className='header'>
            <div className='breadcrumb'>
                <p className='breadcrumb__item last-item'>Главная</p>
            </div>
            <div className='horizontal-container'>
                <div className='title-wrapper'>
                    <h1 className='title'>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </h1>
                </div>
                <div className='header__extra'>
                    <Button type='text' shape='default' size='middle' className='button-wrapper'>
                        <SettingOutlined className='extra__icon' />
                        <p>Настройки</p>
                    </Button>
                </div>
            </div>
        </header>
    );
};

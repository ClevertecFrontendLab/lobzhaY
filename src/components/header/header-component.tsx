import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { headerTitle } from '../../constants/main-page/main-page-text';

import './header-component.scss';

export const HeaderComponent: React.FC = () => {
    return (
        <header className='header'>
            <div className='breadcrumb'>
                <p className='breadcrumb__item last-item'>Главная</p>
            </div>
            <div className='horizontal-container'>
                <div className='title-wrapper'>
                    <h1 className='title'>
                        {headerTitle}
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

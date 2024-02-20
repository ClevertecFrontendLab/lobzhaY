import { Outlet } from 'react-router-dom';

import logo from '../../../assets/result-auth/logo.png';

import { Tabs, TabsProps } from 'antd';
import { authTabs } from '../../../constants/auth-pages/auth-pages-text';

import './auth-page.scss';

export const AuthPage: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: authTabs.label.login,
            children: authTabs.children.login,
        },
        {
            key: '2',
            label: authTabs.label.registration,
            children: authTabs.children.registration,
        },
    ];

    return (
        <section className='auth-wrapper'>
            <div className='logo'>
                <img src={logo} alt='Cleverfit logo' />
            </div>
            <div className='content'>
                <Tabs
                    className='tabs'
                    defaultActiveKey='1'
                    items={items}
                    onChange={onChange}
                    centered={true}
                    indicator={{ size: (origin) => origin, align: 'start' }}
                />
            </div>
        </section>
    );
};

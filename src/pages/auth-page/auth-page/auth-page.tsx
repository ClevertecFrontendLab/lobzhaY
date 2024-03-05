import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { Tabs, TabsProps } from 'antd';

import history from 'history/browser';

import { authTabs } from '../../../constants/auth-pages/auth-pages-text';

import logo from '../../../assets/result-auth/logo.png';

import { ROUTE_PATHS } from '../../../constants/route-paths/paths';

import './auth-page.scss';

export const AuthPage: React.FC = () => {
    const location = useLocation();

    const items: TabsProps['items'] = [
        {
            key: '',
            label: authTabs.label.login,
            children: authTabs.children.login,
        },
        {
            key: 'registration',
            label: authTabs.label.registration,
            children: authTabs.children.registration,
        },
    ];

    const [source, setSource] = useState('');

    useEffect(() => {
        changeLocation(location.pathname);
    }, [location]);

    const changeLocation = (path: string) => {
        if (path === ROUTE_PATHS.authOutlet.registration) {
            setSource('registration');
        } else {
            setSource('');
        }
    };

    return (
        <section className='auth-wrapper'>
            <div className='logo'>
                <img src={logo} alt='Cleverfit logo' />
            </div>
            <div className='content'>
                <Tabs
                    activeKey={source}
                    className='tabs'
                    items={items}
                    onChange={(path) => {
                        if (path) {
                            history.push(`../auth/${path}`);
                        } else {
                            history.push('../auth');
                        }
                        setSource(path);
                    }}
                    centered={true}
                    indicator={{ size: (origin) => origin, align: 'start' }}
                />
            </div>
        </section>
    );
};

import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import logo from '../../../assets/result-auth/logo.png';

import { Tabs, TabsProps } from 'antd';
import { authTabs } from '../../../constants/auth-pages/auth-pages-text';

import './auth-page.scss';
import { useEffect, useState } from 'react';

import history from 'history/browser';
import { pathPrefix } from '../../../constants/route-paths/paths';

export const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [source, setSource] = useState('');

    let location = history.location;

    useEffect(() => {
        changeLocation(location.pathname);
    }, [location]);

    const changeLocation = (path: string) => {
        if (path === pathPrefix.auth) {
            setSource('');
        } else {
            setSource('registration');
        }
    };

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
                            navigate(`../${path}`);
                        } else {
                            navigate('..');
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

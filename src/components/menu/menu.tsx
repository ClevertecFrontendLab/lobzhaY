import React from 'react';

import { CalendarTwoTone, HeartFilled, ProfileOutlined, TrophyFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

import logoPartFirst from '../../assets/sider/logo/clever.png';
import logoPartSecond from './../../assets/sider/logo/fit.png';
import exitIconSvg from './../../assets/sider/icons/exit-vector.svg';

import './menu.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Календарь', '1', <CalendarTwoTone className='menu-icon' />),
    getItem('Тренировки', '2', <HeartFilled className='menu-icon' />),
    getItem('Достижения', '3', <TrophyFilled className='menu-icon' />),
    getItem('Профиль', '4', <ProfileOutlined className='menu-icon' />),
];

type IMenu = {
    isCollapsed: boolean;
};
export const MenuComponent: React.FC<IMenu> = ({ isCollapsed }) => {
    return (
        <div className='menu-container'>
            <div className={isCollapsed ? 'collapsed-logo' : 'menu-logo'}>
                <img
                    src={logoPartFirst}
                    alt='Clever'
                    className={isCollapsed ? 'collapsed-logo-disabled' : 'collapsed-logo-clever'}
                />
                <img
                    src={logoPartSecond}
                    alt='fit'
                    className={isCollapsed ? 'collapsed-logo-active' : 'collapsed-logo-fit'}
                />
            </div>
            <Menu className='menu-content' items={items} />
            <Button type='text' className={isCollapsed ? 'collapsed-exit-active' : 'menu-exit'}>
                <img src={exitIconSvg} className='menu-exit__icon' alt='Exit' />
                <p>Выход</p>
            </Button>
        </div>
    );
};

import { CalendarTwoTone, HeartFilled, ProfileOutlined, TrophyFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

import logoPartFirst from '../../assets/sider/logo/clever.png';
import logoPartSecond from './../../assets/sider/logo/fit.png';
import exitIconSvg from './../../assets/sider/icons/exit-vector.svg';

import { history, store } from '../../redux';
import { removeAuthData } from '../../redux/slices/auth-slice';

import { ROUTE_PATHS } from '../../constants/route-paths/paths';
import { MenuItemsTypes } from '../../constants/main-page/menu-text';

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
    getItem(
        MenuItemsTypes.Calendar,
        MenuItemsTypes.Calendar,
        <CalendarTwoTone className='menu-icon' />,
    ),
    getItem(
        MenuItemsTypes.Exercise,
        MenuItemsTypes.Exercise,
        <HeartFilled className='menu-icon' />,
    ),
    getItem(
        MenuItemsTypes.Achievements,
        MenuItemsTypes.Achievements,
        <TrophyFilled className='menu-icon' />,
    ),
    getItem(
        MenuItemsTypes.Profile,
        MenuItemsTypes.Profile,
        <ProfileOutlined className='menu-icon' />,
    ),
];

type IMenu = {
    isCollapsed: boolean;
};

export const MenuComponent: React.FC<IMenu> = ({ isCollapsed }) => {
    const logout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        store.dispatch(removeAuthData());
        history.push(ROUTE_PATHS.routes.auth);
    };

    const handleGoMain = () => {
        history.push(ROUTE_PATHS.main);
    };

    const handleNavigate: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case MenuItemsTypes.Calendar:
                history.push(ROUTE_PATHS.calendar);
                break;
            default:
                break;
        }
    };

    return (
        <div className='menu-container'>
            <div className={isCollapsed ? 'collapsed-logo' : 'menu-logo'} onClick={handleGoMain}>
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
            <Menu className='menu-content' items={items} onClick={handleNavigate} />
            <Button
                type='text'
                className={isCollapsed ? 'collapsed-exit-active' : 'menu-exit'}
                onClick={logout}
            >
                <img src={exitIconSvg} className='menu-exit__icon' alt='Exit' />
                <p>Выход</p>
            </Button>
        </div>
    );
};

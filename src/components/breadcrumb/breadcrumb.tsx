import { ReactNode, useEffect, useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';

import { items } from '../../constants/breadcrumb/breadcrumb';

import './breadcrumb.scss';

export const BreadcrumbComponent: React.FC = () => {
    const location = useLocation();
    const [routerItems, setRouteItems] = useState<{ path: string; title: string }[]>();

    useEffect(() => {
        let indexRoute = 0;
        items.forEach((element, index) => {
            if (element.path === location.pathname) {
                indexRoute = index;
            }
        });
        const newItems = items.filter((_, index) => index <= indexRoute);
        setRouteItems(newItems);
    }, [location]);

    const itemRender = (
        route: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>,
        _: AnyObject,
        routes: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[],
    ): ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.title}</span>
        ) : (
            <NavLink to={route.path || ''}>{route.title}</NavLink>
        );
    };

    return (
        <div className='breadcrumb'>
            <Breadcrumb itemRender={itemRender} items={routerItems} />
        </div>
    );
};

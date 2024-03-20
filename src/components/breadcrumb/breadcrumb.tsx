import { ReactNode, useEffect, useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';

import { breadcrumbItems } from '../../constants/breadcrumb/breadcrumb';

import { ROUTE_PATHS } from '../../constants/route-paths/paths';

import './breadcrumb.scss';

type RouteItem = {
    path: string;
    title: string;
};

export const BreadcrumbComponent: React.FC = () => {
    const location = useLocation();
    const [routerItems, setRouteItems] = useState<RouteItem[]>();

    useEffect(() => {
        const newRoutes: RouteItem[] = breadcrumbItems.flatMap((elem) => {
            const child = elem.children?.find((child) => child.path === location.pathname);
            const parent = {
                path: elem.path,
                title: elem.title,
            };
            return child ? [parent, child] : parent;
        });
        setRouteItems(newRoutes);
    }, [location]);

    const itemRender = (
        route: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>,
        _params: Record<string, never>,
        routes: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[],
        paths: string[],
    ): ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.title}</span>
        ) : (
            <NavLink to={`/${paths.join('/')}`}>{route.title}</NavLink>
        );
    };

    const getPadding = (): { padding: string } => ({
        padding: `${location.pathname === ROUTE_PATHS.main ? '0px 24px 16px 0' : '16px 24px'}`,
    });

    return (
        <div className='breadcrumb' style={getPadding()}>
            <Breadcrumb itemRender={itemRender} items={routerItems} />
        </div>
    );
};

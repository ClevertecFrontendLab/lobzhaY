import { Breadcrumb } from 'antd';
import './breadcrumb.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { items } from '../../constants/breadcrumb/breadcrumb';

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

    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.title}</span> : <NavLink to={route.path}>{route.title}</NavLink>;
    }

    return (
        <div className='breadcrumb'>
            <Breadcrumb itemRender={itemRender} items={routerItems} />
        </div>
    );
};

import { useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { history } from '../../redux';

import { useAppSelector } from '../../hooks';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');

        if (accessToken) {
            localStorage.setItem('token', accessToken);
            history.push('/main');
        }
    }, []);

    const isAuthRedux = useAppSelector((state) => state.user.userToken);
    const isAuth = isAuthRedux || localStorage.getItem('token');

    return isAuth ? children : <Navigate to='/auth' replace />;
};

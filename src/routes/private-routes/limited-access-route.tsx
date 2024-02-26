import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

export const LimitAccessRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthRedux = useAppSelector((state) => state.user.userToken);
    const isAuth = isAuthRedux || localStorage.getItem('token');

    return !isAuth ? children : <Navigate to='/main' replace />; 
};

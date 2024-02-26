import { Navigate, redirect } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { DirectAccess } from './direct-access-route';

/* export */ const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
    const isAuthRedux = useAppSelector((state) => state.user.userToken);
    const isAuth = localStorage.getItem('token') || isAuthRedux;

    return isAuth ? <DirectAccess>{children}</DirectAccess> :  <Navigate to='/auth' replace />;
};

export default PrivateRoute;

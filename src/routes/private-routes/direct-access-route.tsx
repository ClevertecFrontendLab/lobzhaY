import { useEffect, useState } from 'react';
import { Navigate, redirect, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { replace } from 'redux-first-history';
import { history } from '../../redux';

export const DirectAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    //const history = useHistory();

    const [accessState, setAccessState] = useState<boolean>(false);

    useEffect(() => {
        // Проверяем, начинается ли текущий путь с '/result'
        if (location.pathname.startsWith('/result')) {
            // Если путь начинается с '/result', редиректим на страницу авторизации
           //history.replace('/auth');
            // dispatch(replace('/auth'))
            // redirect('/auth')
            setAccessState(true);
        }
    }, [location.pathname, history]);
     return children;

   // return <>{!accessState ? children : redirect('/auth') {/* <Navigate to='/auth' replace /> */}}</>;
};

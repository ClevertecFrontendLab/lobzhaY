import { Route, Routes } from 'react-router-dom';

import { MainLayout, ResultAuthLayout } from '../layout';
import { AuthPage, ChangePassword, ConfirmEmail, ErrorChangePassword, ErrorCheckEmail, ErrorCheckEmailNoExist, ErrorLogin, ErrorResult, ErrorUserExist, MainPage, SuccessChangePassword, SuccessResult } from '../pages';

import { ROUTE_PATHS } from '../constants/route-paths/paths';

export const routes = (
    <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route index={true} path={ROUTE_PATHS.main} element={<MainPage />} />
        </Route>
        <Route path={ROUTE_PATHS.routes.result} element={<ResultAuthLayout />}>
            <Route path={ROUTE_PATHS.resultOutlet.errorLogin} element={<ErrorLogin />} />
            <Route path={ROUTE_PATHS.resultOutlet.success} element={<SuccessResult />} />
            <Route path={ROUTE_PATHS.resultOutlet.errorUserExist} element={<ErrorUserExist />} />
            <Route path={ROUTE_PATHS.resultOutlet.error} element={<ErrorResult />} />
            <Route
                path={ROUTE_PATHS.resultOutlet.errorCheckEmailNoExist}
                element={<ErrorCheckEmailNoExist />}
            />
            <Route path={ROUTE_PATHS.resultOutlet.errorCheckEmail} element={<ErrorCheckEmail />} />
            <Route path={ROUTE_PATHS.resultOutlet.errorChangePassword} element={<ErrorChangePassword />} />
            <Route path={ROUTE_PATHS.resultOutlet.successChangePassword} element={<SuccessChangePassword />} />
        </Route>
        <Route path={ROUTE_PATHS.routes.auth} element={<ResultAuthLayout />}>
            <Route index element={<AuthPage />} >
               {/*  <Route path='/registration' element={<ConfirmEmail />} /> */}
            </Route>
            <Route path={ROUTE_PATHS.authOutlet.confirmEmail} element={<ConfirmEmail />} />
            <Route path={ROUTE_PATHS.authOutlet.changePassword} element={<ChangePassword />} />
        </Route>
    </Routes>
);

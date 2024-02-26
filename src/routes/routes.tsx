import React, { Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout, ResultAuthLayout } from '../layout';
import {
    AuthPage,
    ChangePassword,
    ConfirmEmail,
    ErrorChangePassword,
    ErrorCheckEmail,
    ErrorCheckEmailNoExist,
    ErrorLogin,
    ErrorResult,
    ErrorUserExist,
    SuccessChangePassword,
    SuccessResult,
} from '../pages';

import { DirectAccess, LimitAccessRoute, PrivateRoute } from './private-routes';

import { LoaderComponent, LoginComponent, RegistrationComponent } from '../components/index.ts';

import { ROUTE_PATHS } from '../constants/route-paths/paths';

const MainPage = React.lazy(() => import('../pages/main-page/main-page'));

export const routes = (
    <Suspense fallback={<LoaderComponent />}>
        <Routes>
            <Route
                element={
                    <PrivateRoute>
                        <MainLayout />
                    </PrivateRoute>
                }
            >
                <Route index={true} path={ROUTE_PATHS.main} element={<MainPage />} />
                <Route path='/' element={<Navigate to={ROUTE_PATHS.main} />} />
            </Route>
            <Route
                path={ROUTE_PATHS.routes.result}
                element={
                    <LimitAccessRoute>
                        <DirectAccess>
                            <ResultAuthLayout />
                        </DirectAccess>
                    </LimitAccessRoute>
                }
            >
                <Route path={ROUTE_PATHS.resultOutlet.errorLogin} element={<ErrorLogin />} />
                <Route path={ROUTE_PATHS.resultOutlet.success} element={<SuccessResult />} />
                <Route
                    path={ROUTE_PATHS.resultOutlet.errorUserExist}
                    element={<ErrorUserExist />}
                />
                <Route path={ROUTE_PATHS.resultOutlet.error} element={<ErrorResult />} />
                <Route
                    path={ROUTE_PATHS.resultOutlet.errorCheckEmailNoExist}
                    element={<ErrorCheckEmailNoExist />}
                />
                <Route
                    path={ROUTE_PATHS.resultOutlet.errorCheckEmail}
                    element={<ErrorCheckEmail />}
                />
                <Route
                    path={ROUTE_PATHS.resultOutlet.errorChangePassword}
                    element={<ErrorChangePassword />}
                />
                <Route
                    path={ROUTE_PATHS.resultOutlet.successChangePassword}
                    element={<SuccessChangePassword />}
                />
            </Route>

            <Route
                path={ROUTE_PATHS.routes.auth}
                element={
                    <LimitAccessRoute>
                        <ResultAuthLayout />
                    </LimitAccessRoute>
                }
            >
                <Route path='/auth' element={<AuthPage />}>
                    <Route index element={<LoginComponent />} />
                    <Route path='registration' element={<RegistrationComponent />} />
                </Route>
                <Route path={ROUTE_PATHS.authOutlet.confirmEmail} element={<ConfirmEmail />} />
                <Route path={ROUTE_PATHS.authOutlet.changePassword} element={<ChangePassword />} />
            </Route>
        </Routes>
    </Suspense>
);

import { Route, Routes } from 'react-router-dom';

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
    // MainPage,
    SuccessChangePassword,
    SuccessResult,
} from '../pages';

import { ROUTE_PATHS } from '../constants/route-paths/paths';
import { LoginComponent, RegistrationComponent } from '../components/auth';
import { LimitAccessRoute, /* PrivateRoute  */} from './private-routes';
import { Suspense } from 'react';
import { LoaderComponent } from '../components/loader/loader-component';
import React from 'react';

const MainPage = React.lazy(() => import('../pages/main-page/main-page'));
const PrivateRoute = React.lazy(() => import('./private-routes/private-route'));

export const routes = (
    <Routes>
        <Route
            path='/'
            element={
                <Suspense fallback={<LoaderComponent />}>
                    <PrivateRoute>
                    <Suspense fallback={<LoaderComponent />}>
                        <MainLayout />
                        </Suspense>
                    </PrivateRoute>
                </Suspense>
            }
        >
            <Route
                index={true}
                path={ROUTE_PATHS.main}
                element={
                    <Suspense fallback={<LoaderComponent />}>
                        <MainPage />
                    </Suspense>
                }
            />
        </Route>
        <Route
            path={ROUTE_PATHS.routes.result}
            element={
                <LimitAccessRoute>
                    <ResultAuthLayout />
                </LimitAccessRoute>
            }
        >
            <Route path={ROUTE_PATHS.resultOutlet.errorLogin} element={<ErrorLogin />} />
            <Route path={ROUTE_PATHS.resultOutlet.success} element={<SuccessResult />} />
            <Route path={ROUTE_PATHS.resultOutlet.errorUserExist} element={<ErrorUserExist />} />
            <Route path={ROUTE_PATHS.resultOutlet.error} element={<ErrorResult />} />
            <Route
                path={ROUTE_PATHS.resultOutlet.errorCheckEmailNoExist}
                element={<ErrorCheckEmailNoExist />}
            />
            <Route path={ROUTE_PATHS.resultOutlet.errorCheckEmail} element={<ErrorCheckEmail />} />
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
);

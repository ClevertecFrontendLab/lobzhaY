import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { fitApi } from './fit-api';
import { loaderReducer } from './redusers/loading-reduser';
import  userSlice from './slices/auth-slice';
import { feedbacksApi } from './feedbacks-api';
import { modalReducer } from './redusers/modal-reduser';
import modalSlice from './slices/modal-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        loader: loaderReducer,
        modal: modalSlice,
        user: userSlice,
        [fitApi.reducerPath]: fitApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware, fitApi.middleware, feedbacksApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

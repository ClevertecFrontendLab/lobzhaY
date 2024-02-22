import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { fitApi } from './fit-api';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [fitApi.reducerPath]: fitApi.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware, fitApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

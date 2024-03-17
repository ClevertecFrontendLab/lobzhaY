import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINT_TRAINING_LIST } from '../constants/api/api-constants';
import { RootState } from '.';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    tagTypes: ['Catalogs'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const isAuthRedux = (getState() as RootState).user.userToken;
            const token = localStorage.getItem('token') || isAuthRedux;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('accept', 'application/json');
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (build) => ({
        getTrainingList: build.query({
            query: () => ENDPOINT_TRAINING_LIST,
        }),
    }),
});

export const { useLazyGetTrainingListQuery } = catalogsApi;
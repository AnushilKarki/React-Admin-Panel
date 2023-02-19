import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { RootState } from './store';

import { resetStateAction } from './resetState';

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // const { accessToken } = (getState() as RootState).signInSlice;
        // if (accessToken) {
        //     headers.set('authorization', `Bearer ${accessToken}`);
        // }
        return headers;
    }
});

export const customFetchBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        credentials: 'include',
                        url: 'refresh-token',
                        method: 'POST'
                    },
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    const { user } = (api as any).getState()?.signInSlice;
                    const accessToken = (refreshResult?.data as any)
                        .accessToken;
                    // api.dispatch(
                    //     setCredentials({
                    //         user,
                    //         accessToken
                    //     })
                    // );
                    // Retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // api.dispatch(logOutUser());
                    api.dispatch(resetStateAction());
                    window.location.href = '/';
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

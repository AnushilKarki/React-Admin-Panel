import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers
} from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import { RESET_STATE_ACTION_TYPE } from './resetState';
// import { unauthenticatedMiddleware } from './middlewares/unauthenticatedMiddleware';

const reducers = {

};

const combinedReducer = combineReducers<typeof reducers>(reducers);
export const rootReducer: Reducer<RootState> = (state, action) => {
    if (action.type === RESET_STATE_ACTION_TYPE) {
        state = {} as RootState;
    }

    return combinedReducer(state, action);
};
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat([
          
        ])
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

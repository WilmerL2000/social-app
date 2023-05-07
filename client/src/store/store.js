import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './';

const persistConfig = { key: 'root', storage, version: 1 };
/* `const persistedReducer = persistReducer(persistConfig, authReducer);` is creating a new reducer
that wraps the `authReducer` with the `persistReducer` function from the `redux-persist` library.
This new reducer will persist the state using the configuration specified in `persistConfig`, which
includes the key to use for the persisted state, the storage engine to use, and the version of the
persisted state. The resulting `persistedReducer` can then be used as the reducer for the Redux
store. */
const persistedReducer = persistReducer(persistConfig, authReducer);

/* This code is creating a Redux store using the `configureStore` function from the `@reduxjs/toolkit`
library. The store is being configured with a persisted reducer, which is created by wrapping the
`authReducer` with `persistReducer` from the `redux-persist` library. The `persistConfig` object
specifies the key to use for the persisted state, the storage engine to use, and the version of the
persisted state. */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

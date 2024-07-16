import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedReducer from './persist';

//스토어 생성
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

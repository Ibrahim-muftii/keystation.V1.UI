import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer"
import localStorage from "redux-persist/lib/storage"
import userReducer from '@/slicer/user.slicer';

const rootReducer = combineReducers({
    user:userReducer
})

const persistConfig = {
    key:"root",
    storage:localStorage,

}

const persistedReducer = persistReducer(persistConfig, rootReducer);    

export const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
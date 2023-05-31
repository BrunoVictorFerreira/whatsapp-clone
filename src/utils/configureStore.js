import { createStore, applyMiddleware, combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import restMiddlewareCreator from './restMiddlewareCreator.js'
import thunk from 'redux-thunk'

import authentication from '../store/reducers/authentication'
import loadingAndError from '../store/reducers/loadingAndError'
import groups from '../store/reducers/groups'
import notifications from '../store/reducers/notifications.js'

const middlewares = [restMiddlewareCreator, thunk]

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
}

const coppyfy = combineReducers({ authentication, groups, notifications, loadingAndError })

const persistedReducer = persistReducer(persistConfig, coppyfy)

const store = createStore(persistedReducer, applyMiddleware(...middlewares))

const persistor = persistStore(store)

export { store, persistor }
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);
const initialStore: any = {};
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f: any) => f;
export const store = createStore(
    rootReducer,
    initialStore,
    compose(applyMiddleware(thunk), devTools)
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';

import { configureStore,applyMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

const store = configureStore({
    reducer : rootReducer,
    // devtools : process.env.REACT_APP_ENABLE_REDUX_DEVTOOLS === 'true'
});

export const useSelector = useReduxSelector;

export const useDispatch = () =>  useReduxDispatch();

export default store;
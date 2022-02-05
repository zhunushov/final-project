import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { hotelReducer } from './MyReducer'
const rootReducer = combineReducers({
    hotelReducer
})
export const store = createStore (rootReducer, applyMiddleware(thunk))
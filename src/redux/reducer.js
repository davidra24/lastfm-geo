import { createStore } from "redux";
import { LOADING, SET_GEO, SET_ONE_GEO, PAGE } from "./constants.redux";

const defaultState = {
    loading: false,
    geos: [],
    oneGeo: {},
    actualPage: 1
}

const store = (state = defaultState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.payload }
        case SET_GEO:
            return { ...state, geos: action.payload }
        case SET_ONE_GEO:
            return { ...state, oneGeo: action.payload }
        case PAGE: 
            return {...state, actualPage: action.payload}
        default:
            return state
    }
}

export default createStore(store)
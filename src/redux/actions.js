import { LOADING, PAGE, SET_GEO, SET_ONE_GEO } from "./constants.redux";

export const setLoading = payload => ({ type:LOADING, payload })

export const setGeo = payload => ({type: SET_GEO, payload})

export const setOneGeo = payload => ({type: SET_ONE_GEO, payload})

export const setPage = payload => ({type: PAGE, payload})
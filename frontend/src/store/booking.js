import {csrfFetch} from "./csrf"

export const GET_USERS_BOOKINGS = "bookings/GET_USERS_BOOKINGS"
export const GET_SPOTS_BOOKINGS = "bookings/GET_SPOTS_BOOKINGS"
export const CREATE_BOOKINGS = "bookings/CREATE_BOOKINGS"
export const EDIT_BOOKINGS = "bookings/EDIT_BOOKINGS"
export const DESTROY_BOOKINGS = "bookings/DESTROY_BOOKINGS"




export const usersBookings = (bookings) => {
    return {
        type: GET_USERS_BOOKINGS,
        bookings
    }
}
export const spotsBookings = (bookings) => {
    return {
        type: GET_SPOTS_BOOKINGS,
        bookings
    }
}


export const getUsersBookings = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings")

    if (res.ok) {
        const bookings = await res.json()
        dispatch(usersBookings(bookings))
        return bookings
    }
}
export const getSpotsBookings = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings")

    if (res.ok) {
        const bookings = await res.json()
        dispatch(spotsBookings(bookings))
        return bookings
    }
}




let initialState = {
    myBookings: {},
    spotsBookings: {}
}

export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_BOOKINGS:
            return
        case GET_SPOTS_BOOKINGS:
            return
        default:
            return state
    }
}

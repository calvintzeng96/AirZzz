import { csrfFetch } from "./csrf"

export const GET_USERS_BOOKINGS = "bookings/GET_USERS_BOOKINGS"
export const GET_SPOTS_BOOKINGS = "bookings/GET_SPOTS_BOOKINGS"
export const NEW_BOOKINGS = "bookings/NEW_BOOKINGS"
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
export const newBooking = (booking) => {
    return {
        type: NEW_BOOKINGS,
        booking
    }
}
export const editBooking = (booking) => {
    return {
        type: EDIT_BOOKINGS,
        booking
    }
}
export const destroyBooking = (booking) => {
    return {
        type: DESTROY_BOOKINGS,
        booking
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
export const createBooking = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings")

    if (res.ok) {
        const bookings = await res.json()
        dispatch(spotsBookings(bookings))
        return bookings
    }
}
export const updateBooking = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings")

    if (res.ok) {
        const bookings = await res.json()
        dispatch(newBooking(bookings))
        return bookings
    }
}
export const deleteBooking = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings")

    if (res.ok) {
        const bookings = await res.json()
        dispatch(updateBooking(bookings))
        return bookings
    }
}
export const getSpotsBookings = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings")

    if (res.ok) {
        const bookings = await res.json()
        dispatch(deleteBooking(bookings))
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
        case NEW_BOOKINGS:
            return
        case EDIT_BOOKINGS:
            return
        case DESTROY_BOOKINGS:
            return
        default:
            return state
    }
}

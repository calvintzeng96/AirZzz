

const LOGIN_ERROR = "/errors/LOGIN_ERROR"
const CLEAR_ERROR = "/errors/CLEAR_ERROR"

export const loginError = (data) => {
    return {
        type: LOGIN_ERROR,
        data
    }
}

export const clearErrorStore = () => {
    return {
        type: CLEAR_ERROR
    }
}





let initialState = {
    errors: {}
}

// let test = {
//     errors: {
//         message: 'Invalid credentials',
//         status: 401
//     }
// }

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            const loginError = {...state}
            loginError.errors = action.data
            return loginError
        case CLEAR_ERROR:
            const clearError = {...state}
            clearError.errors = {}
            return clearError

        default:
            return state
    }
}

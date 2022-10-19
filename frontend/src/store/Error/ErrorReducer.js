
const PROCESS_ERROR = "/errors/PROCESS_ERROR"
const CLEAR_ERROR = "/errors/CLEAR_ERROR"

export const processError = (data) => {
    return {
        type: PROCESS_ERROR,
        data
    }
}

// export const signupError = (data) => {
//     return {
//         type: SIGNUP_ERROR,
//         data
//     }
// }

export const clearErrorStore = () => {
    return {
        type: CLEAR_ERROR
    }
}





let initialState = {
    errors: {}
}

//ERROR STATE STRUCTURE AFTER PUTTING IN DATA
// let test = {
//     errors: {
//         message: 'Invalid credentials',
//         status: 401
//     }
// }

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROCESS_ERROR:
            const processError = {...state}
            processError.errors = action.data
            return processError
        case CLEAR_ERROR:
            const clearError = {...state}
            clearError.errors = {}
            return clearError

        default:
            return state
    }
}

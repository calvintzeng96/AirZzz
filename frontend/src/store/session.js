import { csrfFetch } from "./csrf";

const initialState = { user: null };


const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


//Sign Up
export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, username, email, password } = user;

    const res = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password
        })
    });

    const data = await res.json();
    dispatch(setUser(data));
    return res;
};

//Login User
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await res.json();
    console.log(data)
    dispatch(setUser(data));
    return res;
};

//Restore User
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

//Logout User
export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE",
    });
    dispatch(removeUser());
    return response;
};


//Reducer
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;

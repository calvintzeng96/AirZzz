import { DESTROY_SPOT, EDIT_SPOT, GET_ALL_SPOTS, GET_MY_SPOTS, GET_SINGLE_SPOT, NEW_SPOT } from "./SpotAction";


let initialState = {}

export const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            const spots = {}
            action.spots.spots.forEach(ele => {
                spots[ele.id] = ele
            })
            return {...spots}
        case GET_SINGLE_SPOT:
            const spot = {}
            spot[action.spot.id] = action.spot
            return spot

        case GET_MY_SPOTS:
            const currentSpots = {}
            action.spots.spots.forEach(ele => {
                currentSpots[ele.id] = ele
            })
            return {...currentSpots}

        case NEW_SPOT:
            const newSpot = {}
            newSpot[action.spot.id] = action.spot
            return {...newSpot}
        // case EDIT_SPOT:

        // case DESTROY_SPOT:

        // case NEW_SPOT_IMAGE:

        default:
            return state
    }
}

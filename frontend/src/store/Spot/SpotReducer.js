import { DESTROY_SPOT, EDIT_SPOT, GET_ALL_SPOTS, GET_MY_SPOTS, GET_SINGLE_SPOT, NEW_SPOT } from "./SpotAction";


let initialState = {
    allSpots: {},
    singleSpot: {}
}

export const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            const spots = { ...state, allSpots: { ...state.allSpots } }
            action.spots.spots.forEach(ele => {
                spots.allSpots[ele.id] = ele
            })
            return spots
        case GET_SINGLE_SPOT:
            const spot = { ...state, singleSpot: action.spot }
            return { ...spot }

        case GET_MY_SPOTS:
            const currentSpots = {...state, allSpots: {}}
            action.spots.spots.forEach(ele => {
                currentSpots.allSpots[ele.id] = ele
            })
            return {...currentSpots}

        case NEW_SPOT:
            const newSpot = {
                ...state, allSpots: { ...state.allSpots, [action.spot.id]: action.spot },
                singleSpot: { ...state.singleSpot }
            }
            newSpot.singleSpot = action.spot
            return newSpot

        case EDIT_SPOT:
            const result = action.spot
            const editedSpot = {...state}
            editedSpot.allSpots[result.id] = result
            editedSpot.singleSpot = result
            return editedSpot

        case DESTROY_SPOT:
            const deleteSpot = {allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot }}
            deleteSpot.singleSpot = {}
            delete deleteSpot.allSpots[action.spot.id]
            return deleteSpot

        // case NEW_SPOT_IMAGE:

        default:
            return state
    }
}

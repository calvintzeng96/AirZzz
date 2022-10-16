
export const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS"
export const GET_SINGLE_SPOT = "spots/GET_SINGLE_SPOT"
export const GET_MY_SPOTS = "spots/GET_MY_SPOTS"
export const NEW_SPOT = "spots/NEW_SPOT"
export const EDIT_SPOT = "spots/EDIT_SPOT"
export const DESTROY_SPOT = "spots/DESTROY_SPOT"
// export const NEW_SPOT_IMAGE = "spots/NEW_SPOT_IMAGE"



export const allSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

export const singleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}

export const mySpots = (spots) => {
    return {
        type: GET_MY_SPOTS,
        spots
    }
}

export const newSpot = (spot) => {
    return {
        type: NEW_SPOT,
        spot
    }
}

export const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}

export const destroySpot = (spot) => {
    return {
        type: DESTROY_SPOT,
        spot
    }
}

// export const newSpotImage = (image) => {
//     return {
//         type: NEW_SPOT_IMAGE,
//         image
//     }
// }

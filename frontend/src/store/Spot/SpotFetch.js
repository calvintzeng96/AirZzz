import { csrfFetch } from "../csrf"
import * as Actions from"./SpotAction"



export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots")

    if (res.ok) {
        const spots = await res.json()
        dispatch(Actions.allSpots(spots))
    }
}

export const getSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json()
        console.log("lllllllllllllll", spot)
        dispatch(Actions.singleSpot(spot))
    }
}

export const getMySpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots/current")

    if (res.ok) {
        const spots = await res.json()
        dispatch(Actions.mySpots(spots))
    }
}

export const createSpot = (data) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const spot = await res.json()
        dispatch(Actions.newSpot(spot))
    }
}

export const updateSpot = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${data.spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const spot = await res.json()
        dispatch(Actions.editSpot(spot))
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
    })

    if (res.ok) {
        const spot = await res.json()
        dispatch(Actions.destroySpot(spot))
    }
}

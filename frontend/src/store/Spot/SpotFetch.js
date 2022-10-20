import { csrfFetch } from "../csrf"
import * as Actions from"./SpotAction"



export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots")

    if (res.ok) {
        const spots = await res.json()
        dispatch(Actions.allSpots(spots))
        return spots
    }
}

export const getSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json()
        dispatch(Actions.singleSpot(spot))
        return spot
    }
}

export const getMySpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots/current")

    if (res.ok) {
        const spots = await res.json()
        dispatch(Actions.mySpots(spots))
        return spots
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
        return spot
    }
}

export const updateSpot = (spotId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const spot = await res.json()
        dispatch(Actions.editSpot(spot))
        return spot
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    })

    if (res.ok) {
        dispatch(Actions.destroySpot(spotId))
    }
}

export const addImage = (image, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(image)
    })

    if (res.ok) {
        const image = await res.json()
        dispatch(Actions.newSpotImage(spotId, image))
    }
}

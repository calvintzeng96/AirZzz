import { csrfFetch } from "../csrf"
import * as Actions from "./ReviewAction"



export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = await res.json()
        // console.log("pppppppp", reviews)
        dispatch(Actions.spotReviews(reviews))
        return reviews
    }
}

export const getMyReviews = () => async (dispatch) => {
    const res = await csrfFetch("/api/reviews/current")

    if (res.ok) {
        const reviews = await res.json()
        console.log("pppppppp", reviews)

        dispatch(Actions.myReviews(reviews))
        return reviews
    }
}

// export const createReview = (data) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json"},
//         body: JSON.stringify(data)
//     })

//     if (res.ok) {
//         const review = await res.json()
//         dispatch(Actions.newReview(review))
//         return review
//     }
// }

export const updateReview = (reviewId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const review = await res.json()
        dispatch(Actions.editReview(review))
        return review
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    })

    if (res.ok) {
        dispatch(Actions.destroyReview(reviewId))
    }
}

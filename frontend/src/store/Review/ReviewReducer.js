import { bindActionCreators } from "redux"
import { GET_SPOT_REVIEWS, GET_MY_REVIEWS, NEW_REVIEW, EDIT_REVIEW, DESTROY_REVIEW } from "./ReviewAction"

let initialState = {
    reviews: {},
    userReviews: {}
}

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            const spotReviews = {...state, reviews: {}}
            action.reviews.forEach(ele => {
                spotReviews.reviews[ele.id] = ele
            })
            return spotReviews
        case GET_MY_REVIEWS:
            const myReviews = {...state, userReviews: {}}
            action.reviews.reviews.forEach(ele => {
                myReviews.userReviews[ele.id] = ele
            })
            return myReviews
        case NEW_REVIEW:
            const newReview = {...state, reviews: {...state.reviews}}
            newReview.reviews[action.review.id] = action.review
            return newReview

        case EDIT_REVIEW:
            const editReview = {...state}
            editReview.currentReview = action.review
            return editReview

        case DESTROY_REVIEW:
            const deleteReview = {...state, userReviews: {...state.userReviews}}
            delete deleteReview.userReviews[action.reviewId]
            return {...deleteReview}

        default:
            return state
    }
}

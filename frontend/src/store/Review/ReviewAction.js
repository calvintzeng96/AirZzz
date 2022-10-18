
export const GET_SPOT_REVIEWS = "reviews/GET_SPOT_REVIEWS"
export const GET_MY_REVIEWS = "reviews/GET_MY_REVIEWS"
export const NEW_REVIEW = "reviews/NEW_REVIEW"
export const EDIT_REVIEW = "reviews/EDIT_REVIEW"
export const DESTROY_REVIEW = "reviews/DESTROY_REVIEW"



export const spotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

export const myReviews = (reviews) => {
    return {
        type: GET_MY_REVIEWS,
        reviews
    }
}

export const newReview = (user) => {
    return {
        type: NEW_REVIEW,
        user
    }
}

export const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

export const destroyReview = (reviewId) => {
    return {
        type: DESTROY_REVIEW,
        reviewId
    }
}

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getMyReviews } from "../../store/Review/ReviewFetch"
import { deleteReview } from "../../store/Review/ReviewFetch"

const MyReviews = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.userReviews)
    const reviewsArr = Object.values(reviews)
    const history = useHistory()
    useEffect(() => {
        dispatch(getMyReviews())
    }, [])


    const deleteReviewButton = (reviewId) => {
        if (window.confirm("you sure delete?")) {
            dispatch(deleteReview(reviewId))
        }
    }
    const editReviewButton = () => {
        alert("hello")
    }

    return (
        <div>
            <div>TEST</div>
            <ul>
                {
                    reviewsArr.map(ele => (
                        <li key={ele.id}>
                            {/* {console.log(ele)} */}
                            {/* <div>{ele.User.firstName}</div> */}
                            <div>Review on Spot: {ele.spotId}</div>
                            <div>Review: {ele.review}</div>
                            <div>Stars: {ele.stars}</div>
                            <button onClick={() => editReviewButton()}>Edit</button>
                            <button onClick={() => deleteReviewButton(ele.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
            <h1>REVIEWS PLACEHOLDER</h1>
        </div>
    )
}

export default MyReviews

import { useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getMyReviews } from "../../store/Review/ReviewFetch"
import { deleteReview } from "../../store/Review/ReviewFetch"
import { ModalContext } from "../../context/Modal"
import { editReview } from "../../store/Review/ReviewAction"

const MyReviews = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.userReviews)
    const reviewsArr = Object.values(reviews)
    const { setModalType } = useContext(ModalContext)
    const history = useHistory()
    useEffect(() => {
        dispatch(getMyReviews())
    }, [])


    const deleteReviewButton = (reviewId) => {
        if (window.confirm("you sure delete?")) {
            dispatch(deleteReview(reviewId))
        }
    }

    return (
        <div>
            <div>TEST</div>
            <ul>
                {
                    reviewsArr.map(ele => (
                        <div key={ele.id}>
                            <div>{ele.User.firstName}</div>
                            <div>Review on Spot: {ele.spotId}</div>
                            <div>Review: {ele.review}</div>
                            <div>Stars: {ele.stars}</div>
                            <button onClick={() => {
                                setModalType("EditReview")
                                dispatch(editReview(ele))
                            }}>Edit</button>
                            <button onClick={() => deleteReviewButton(ele.id)}>Delete</button>
                        </div>
                    ))
                }
            </ul>
            <h1>REVIEWS PLACEHOLDER</h1>
        </div>
    )
}

export default MyReviews

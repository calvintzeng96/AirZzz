import { useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getMyReviews } from "../../store/Review/ReviewFetch"
import { deleteReview } from "../../store/Review/ReviewFetch"
import { ModalContext } from "../../context/Modal"
import { editReview } from "../../store/Review/ReviewAction"
import "./MyReviews.css"

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
        <div id="review-outer-container" className="margin-bottom">
            <div id="review-header" className="h2 bold">My Reviews</div>
            <div id="review-container">
                {
                    reviewsArr.map(ele => (
                        <div id="single-review" key={ele.id}>
                            <div id="review-profile">
                                <i id="review-icon" className="fas fa-user-circle" />
                                {ele.User && (
                                    <div id="review-name" className="bold">{ele?.User?.firstName} {(ele?.User?.lastName)[0]}.</div>
                                )}
                                <div id="review-date">{(ele.createdAt).slice(0,10)}</div>
                                <div id="review-star">{ele.stars} ⭐</div>
                            </div>
                            <br></br>
                            <div className="review-content">{ele.review}</div>
                            <button className="buttons" onClick={() => {
                                setModalType("EditReview")
                                dispatch(editReview(ele))
                            }}>Edit</button>
                            <button className="buttons" onClick={() => deleteReviewButton(ele.id)}>Delete</button>
                        </div>
                    ))
                }

            </div >
        </div>
    )
}

export default MyReviews

// <div key={ele.id}>
//     <div>{ele.User.firstName}</div>
//     <div>Review on Spot: {ele.spotId}</div>
//     <div>Review: {ele.review}</div>
//     <div>Stars: {ele.stars}</div>
//     <button onClick={() => {
//         setModalType("EditReview")
//         dispatch(editReview(ele))
//     }}>Edit</button>
//     <button onClick={() => deleteReviewButton(ele.id)}>Delete</button>
// </div>

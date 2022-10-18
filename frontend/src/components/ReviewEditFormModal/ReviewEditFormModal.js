import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/Modal";
import { getMyReviews, updateReview } from "../../store/Review/ReviewFetch";
import { useSelector } from "react-redux";

function ReviewEditFormModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([]);
    const { setModalType } = useContext(ModalContext)
    const reviewState = useSelector(state => state.review.currentReview)

    useEffect(() => {
        setReview(reviewState.review)
        setStars(reviewState.stars)
    }, [])

    const reset = () => {
        setReview("")
        setStars("")
    }

    const submit = (e) => {
        e.preventDefault();
        const data = { review, stars }
        if (!errors.length) {
            dispatch(updateReview(reviewState.id, data))
                .then(() => {
                    alert("Review Updated")
                    dispatch(getMyReviews())
                })
                .catch(() => {
                    alert("error")
                })
            setModalType(null)
        };
    }
    return (
        <div>

            <form className="modal-content" onSubmit={submit}>
            <div>Edit this spot</div>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div>
                    <input className="create-form-elements"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        // required
                        placeholder="Review"
                    />

                    <input className="create-form-elements"
                        type="number"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        // required
                        placeholder="Stars"
                    />
                    <button type="reset" onClick={() => reset()}>Reset</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );

}

export default ReviewEditFormModal;

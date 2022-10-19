import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/Modal";
import { getMyReviews, updateReview } from "../../store/Review/ReviewFetch";
import { useSelector } from "react-redux";
import { clearErrorStore } from "../../store/Error/ErrorReducer";
import { processError } from "../../store/Error/ErrorReducer";

function ReviewEditFormModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([]);
    const { setModalType } = useContext(ModalContext)
    const reviewState = useSelector(state => state.review.currentReview)
    const errorStore = useSelector(state => state.error.errors)

    useEffect(() => {
        setReview(reviewState.review)
        setStars(reviewState.stars)
    }, [])

    const reset = () => {
        setReview("")
        setStars("")
    }

    useEffect(() => {
        if (Object.keys(errorStore).length) {
            let errMsg = ""
            if (errorStore.statusCode === 400) {
                for (let i = 0; i < errorStore.errors.length; i++) {
                    errMsg += errorStore.errors[i] + "\n"
                }
            } else {
                errMsg = errorStore.message
            }
            alert(errMsg)
            dispatch(clearErrorStore())
        }
    }, [errorStore])


    const submit = (e) => {
        e.preventDefault();
        const data = { review, stars }
        if (!errors.length) {
            return dispatch(updateReview(reviewState.id, data))
                .then(() => {
                    alert("Review Updated")
                    dispatch(getMyReviews())
                    setModalType(null)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data) {
                        dispatch(processError(data))
                    }
                })
        };
    }
    return (
        // <div>

            <form className="modal-content" onSubmit={submit}>
                <div className="modal-content-2 modal-header">Edit Your Review</div>
                <input className="create-form-elements modal-content-2"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    // required
                    placeholder="Review"
                />

                <input className="create-form-elements modal-content-2"
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    // required
                    placeholder="Stars"
                />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button className="modal-content-2 button-style" type="reset" onClick={() => reset()}>Reset</button>
                <button className="modal-content-2 button-style" type="submit">Submit</button>
                {/* </div> */}
            </form>
        // </div>
    );

}

export default ReviewEditFormModal;

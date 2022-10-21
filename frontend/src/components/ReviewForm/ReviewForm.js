import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useContext, useState } from "react"
import { createReview, getSpotReviews } from "../../store/Review/ReviewFetch"
import { ModalContext } from "../../context/Modal"
import { getSingleSpot } from "../../store/Spot/SpotFetch"
import { processError } from "../../store/Error/ErrorReducer";
import { clearErrorStore } from "../../store/Error/ErrorReducer";
import { useEffect } from "react"

const ReviewForm = () => {
    const spot = useSelector(state => state.spot.singleSpot)
    const spotId = spot.id
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([]);

    const { setModalType } = useContext(ModalContext)
    const errorStore = useSelector(state => state.error.errors)

    useEffect(() => {
        if (Object.keys(errorStore).length) {
            let err = []
            if (errorStore.statusCode === 400) {
                for (let i = 0; i < errorStore.errors.length; i++) {
                    err.push(errorStore.errors[i])
                }
            } else {
                err.push(errorStore.message)
            }
            // alert(err)
            setErrors(err)
            dispatch(clearErrorStore())
        }
    }, [errorStore])


    const submit = (e) => {

        e.preventDefault()
        const data = { review, stars }
        return dispatch(createReview(spotId, data))
            .then(() => {
                alert("Review Created")
                dispatch(getSingleSpot(spotId))
                setModalType(null)
                // window.location.reload(false)
            }).then(() => {
                dispatch(getSpotReviews(spotId))
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data) {
                    dispatch(processError(data))
                }
            })
        // //test
        // history.push(`/spots/${spot.id}`)
    }

    return (
        <form className="modal-content" onSubmit={submit}>
            <div className="modal-content-2 modal-header">Leave a Review</div>
            {errors.length > 0 && (
                errors.map(ele => <div className="error-list">{ele}</div>)
            )}

            <textarea className="modal-content-2 text-area" style={{ width: "300px", height: "150px", resize: "none" }}
                // type="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="Review :)"
            />
            <input className="modal-content-2"
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
                placeholder="Stars"
            />
            <button className="modal-content-2 button-style" type="submit">Submit</button>

        </form>
    )

}


export default ReviewForm

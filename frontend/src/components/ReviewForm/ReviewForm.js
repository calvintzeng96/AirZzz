import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useContext, useState } from "react"
import { createReview, getSpotReviews } from "../../store/Review/ReviewFetch"
import { ModalContext } from "../../context/Modal"
import { getSingleSpot } from "../../store/Spot/SpotFetch"

const ReviewForm = () => {
    const spot = useSelector(state => state.spot.singleSpot)
    const spotId = spot.id
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const { setModalType } = useContext(ModalContext)


    const submit = (e) => {

        e.preventDefault()
        const data = { review, stars }
        return dispatch(createReview(spotId, data))
        .then(() => {
            alert("Review Created")
            dispatch(getSingleSpot(spotId))
            setModalType(null)
            // window.location.reload(false)
        })
        .catch(() => {
            alert("You already created a review for this spot")
            setModalType(null)
        })
        // //test
        // history.push(`/spots/${spot.id}`)
    }

    return (
        <form className="modal-content" onSubmit={submit}>
            <textarea className="modal-content-2" style={{ width: "300px", height: "150px", resize: "none" }}
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
                placeholder="0"
            />
            <button className="modal-content-2" type="submit">Submit</button>

        </form>
    )

}


export default ReviewForm

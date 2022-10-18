import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useContext, useState } from "react"
import { createReview, getSpotReviews } from "../../store/Review/ReviewFetch"
import { ModalContext } from "../../context/Modal"

const ReviewForm = () => {
    const spot = useSelector(state => state.spot.singleSpot)
    const spotId = spot.id
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const {setModalType} = useContext(ModalContext)


    const submit = (e) => {
        e.preventDefault()
        const data = { review, stars }
        let done = dispatch(createReview(spotId, data))
        if (done) {
            alert("Review Created")
            dispatch(getSpotReviews(spotId))
            setModalType(null)
        } else {
            alert("error")
        }

    }

    return (
        <form className="modal-content" onSubmit={submit}>
            <textarea style={{ width: "300px", height: "150px", resize: "none" }}
                // type="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="Review :)"
            />
            <input
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
                placeholder="0"
            />
            <button type="submit">Submit</button>

        </form>
    )

}


export default ReviewForm

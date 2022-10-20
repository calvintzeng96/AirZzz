import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotReviews } from "../../store/Review/ReviewFetch"
import "./index.css"

const SpotReviews = (props) => {
    // const sessionUser = useSelector(state => state.session.User)
    const { spotId } = props
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.reviews)
    const reviewsArr = Object.values(reviews)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [])


    return (
        <div id="spot-review-container">
            {
                reviewsArr.map(ele => {
                    return (
                        <div id="single-review" key={ele.id}>
                            <div id="review-profile">
                                <i id="review-icon" className="fas fa-user-circle" />
                                {ele.User && (
                                    // <div id="review-name">{ele?.User?.firstName}</div>
                                    <div id="review-name">{ele?.User?.firstName}</div>
                                )}
                                <div id="review-date">Sample Date</div>
                                <div id="review-star">{ele.stars} ⭐</div>
                            </div>
                            <br></br>
                            <div>{ele.review}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SpotReviews

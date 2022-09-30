const express = require("express")
const { Review, ReviewImage, Booking } = require("../../db/models")
const { checkUser, notAuthorized } = require("../../utils/auth")
const { notFoundErr  } = require("../../utils/helper");

const router = express.Router();

//Delete a Review Image
router.delete("/:imageId", checkUser, async (req, res) => {
    const currentUser = req.user
    const reviewImg = await ReviewImage.findByPk(req.params.imageId)

    if (!reviewImg) notFoundErr("Review Image", res)

    const review = await Review.findByPk(reviewImg.reviewId)

    notAuthorized(currentUser.id, review.userId, res)

    reviewImg.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})









module.exports = router;

const express = require("express")
const { User, Spot, Review, ReviewImage } = require("../../db/models")
const { checkUser, notAuthorized } = require("../../utils/auth")
const { checkReviewStar } = require("../../utils/validation");
const { notFoundErr, checkCount10 } = require("../../utils/helper");

const router = express.Router();

//Get all Reviews from Current User
router.get("/current", checkUser, async (req, res) => {
    const currentUser = req.user
    const reviews = await Review.findAll({
        where: {
            userId: currentUser.id
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            {
                model: ReviewImage
            }
        ]
    })

    res.json({ reviews })
})

//Create Image for Review
router.post("/:reviewId/images", checkUser, async (req, res) => {
    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId)
    const currentUser = req.user
    if (!review) notFoundErr("Review", res)
    notAuthorized(currentUser.id, review.userId, res)
    checkCount10(review, res)

    const reviewImg = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })
    const test = await ReviewImage.scope("createImg").findByPk(reviewImg.id)

    res.json(test)
})

//Edit a Review
router.put("/:reviewId", checkUser, checkReviewStar, async (req, res) => {
    const { review, stars } = req.body
    const currentUser = req.user
    const editReview = await Review.findByPk(req.params.reviewId)

    if (!editReview) notFoundErr("Review", res)
    notAuthorized(currentUser.id, editReview.userId, res)

    editReview.update({
        review,
        stars
    })

    res.json(editReview)
})

//Delete a Review
router.delete("/:reviewId", checkUser, async (req, res) => {
    const currentUser = req.user
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) notFoundErr("Review", res)
    notAuthorized(currentUser.id, review.userId, res)

    review.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})



module.exports = router;

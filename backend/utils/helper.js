const { SpotImage, Review, Booking, ReviewImage } = require("../db/models")
const { Op } = require("sequelize");


//returns 404 Error if "item" NOT Found
const notFoundErr = function (item, res) {
    res.status(404)
    return res.json({
        statusCode: 404,
        message: `${item} couldn't be found`
    })
}

//Adds AvgRating to Spot Object
const addRating = async function (spots) {
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]
        let obj = spot.dataValues

        let sum = await Review.sum("stars", { where: { spotId: spot.id } })
        let count = await Review.count({ where: { spotId: spot.id } })

        obj.avgRating = sum / count
    }
    return spots
}

//Checks Image for Review Count
const checkCount10 = async function (review, res) {
    let count = await ReviewImage.count({ where: { reviewId: review.id } })

    if (count == 10) {
        res.status(403)
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }
    return
}

//Adds Preview to Spot Object
const addPreview = async function (spots) {
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]
        let obj = spot.dataValues
        let url = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ["url"]
        })
        !url ? obj.previewImage = null : obj.previewImage = url.url
    }
    return spots
}

//test
const addPreviewNested = async function (spots) {
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]
        let obj = spot.dataValues.Spot.dataValues
        let url = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ["url"]
        })

        !url ? obj.previewImage = null : obj.previewImage = url.url
        delete (obj.description)
    }
    return spots
}

const addNumReviews = async function (spots) {
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]
        let obj = spot.dataValues

        let count = await Review.count({ where: { spotId: spot.id } })

        obj.numReviews = count
    }
    return spots
}

const checkReviewDuplicate = async function (spotId, userId, res) {
    const check = await Review.findOne({
        where: {
            [Op.and]: {
                spotId: spotId,
                userId: userId
            }
        }
    })
    if (check) {
        res.status(403)
        res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }
    return
}

const checkBookingOverlap = async function (start, end, spot, res) {
    let startB = new Date(start)
    let endB = new Date(end)
    const bookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    })

    for (let i = 0; i < bookings.length; i++) {
        let bookingStart = new Date(bookings[i].dataValues.startDate)
        let bookingEnd = new Date(bookings[i].dataValues.endDate)
        if ((startB <= bookingEnd && startB >= bookingStart) ||
            (endB <= bookingEnd && endB >= bookingStart) ||
            startB < bookingStart && endB > bookingEnd
        ) {
            res.status(403)
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }
    return
}

const paginationQueryErr = function (problem, res) {
    res.status(400)
    return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
            size: `${problem} must be a number greater than or equal to 1`
        }
    })
}

module.exports = {
    notFoundErr,
    checkCount10,
    addPreview,
    addPreviewNested,
    addRating,
    addNumReviews,
    checkReviewDuplicate,
    checkBookingOverlap,
    paginationQueryErr
}

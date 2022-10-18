const express = require("express")
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require("../../db/models")
const { checkUser, notAuthorized } = require("../../utils/auth")
const { validateCreateSpot, checkReviewStar, checkEndBeforeStart, checkQuery } = require("../../utils/validation");
const { notFoundErr, addPreview, addRating, addNumReviews, checkReviewDuplicate, checkBookingOverlap, paginationQueryErr } = require("../../utils/helper");


const router = express.Router();



//Get all Spots
router.get("/", async (req, res, next) => {
    if (Object.keys(req.query).length) return next()

    const spots = await Spot.findAll()

    await addPreview(spots)
    await addRating(spots)

    return res.json({ spots })
})

router.get("/", checkQuery, async (req, res) => {
    const { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    const pagination = {}

    if (!page) page = 1
    if (!size || parseInt(size) > 20) size = 20
    if (parseInt(page) > 10) page = 10
    if (!(parseInt(page) > 0)) paginationQueryErr("Page", res)
    if (!(parseInt(size) > 0)) paginationQueryErr("Size", res)
    if (page > 0 && size > 0) {
        pagination.offset = size * (page - 1)
        pagination.limit = size
    }

    const Spots = await Spot.findAll({
        ...pagination
    })

    await addPreview(Spots)

    return res.json({
        Spots,
        page,
        size
    })
})

//Get Spots of Current User
router.get("/current", checkUser, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })

    await addPreview(spots)
    await addRating(spots)

    return res.json({ spots })
})


//Get Reviews by SpotId
router.get("/:spotId/reviews", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) notFoundErr("Spot", res)

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: ReviewImage
            }
        ]
    })

    res.json(reviews)
})

//Get All Bookings by Spot Id
router.get("/:spotId/bookings", checkUser, async (req, res) => {
    const currentUser = req.user
    const spot = await Spot.findByPk(req.params.spotId)
    let bookings;

    if (!spot) notFoundErr("Spot", res)

    if (currentUser.id == spot.ownerId) {
        bookings = await Booking.findAll({
            where: {
                userId: spot.ownerId
            },
            include: {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }
        })
    } else {
        bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ["spotId", "startDate", "endDate"]
        })
    }

    res.json({ bookings })
})

//Get Details of Spot by Id
router.get("/:spotId", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }
        ]
    })

    if (!spot) notFoundErr("Spot", res)

    await addRating([spot]),
        await addNumReviews([spot])

    res.json(spot)
})

//Create a Spot
router.post("/", checkUser, validateCreateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    return res.json(newSpot)
})

//Create/Add Image to Spot based on Spot Id
router.post("/:spotId/images", async (req, res) => {
    const { url, preview } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    const currentUser = req.user

    if (!spot) notFoundErr("Spot", res)
    notAuthorized(currentUser.id, spot.ownerId, res)

    const spotImg = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })
    const test = await SpotImage.scope("createImg").findByPk(spotImg.id)

    return res.json(test)
})

//Create Booking
router.post("/:spotId/bookings", checkUser, checkEndBeforeStart, async (req, res) => {
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    const currentUser = req.user

    if (!spot) notFoundErr("Spot", res)

    await checkBookingOverlap(startDate, endDate, spot, res)

    const booking = await Booking.create({
        spotId: req.params.spotId,
        userId: currentUser.id,
        startDate,
        endDate
    })

    res.json(booking)
})

//Edit a Spot
router.put("/:spotId", checkUser, validateCreateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const currentUser = req.user
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) notFoundErr("Spot", res)
    notAuthorized(currentUser.id, spot.ownerId, res)

    spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(spot)
})

//Create Review for Spot based on Spot Id
router.post("/:spotId/reviews", checkUser, checkReviewStar, async (req, res) => {
    const { review, stars } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    let spotId = req.params.spotId
    let userId = req.user.id
    console.log("----------", req.user)

    if (!spot) notFoundErr("Spot", res)
    await checkReviewDuplicate(spotId, userId, res)

    const test = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars
    })

    res.status(201)
    res.json(test)
})

//Delete a Spot
router.delete("/:spotId", checkUser, async (req, res) => {
    const currentUser = req.user
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) notFoundErr("Spot", res)
    notAuthorized(currentUser.id, spot.ownerId, res)

    spot.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200,
    })
})


module.exports = router;

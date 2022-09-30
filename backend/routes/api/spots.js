const express = require("express")
const { User, Spot, SpotImage, Review } = require("../../db/models")
const { checkUser, notAuthorized } = require("../../utils/auth")
const { check } = require("express-validator");
const { handleValidationErrors, validateCreateSpot } = require("../../utils/validation");
const { notFoundErr, addPreview, addRating, addNumReviews } = require("../../utils/helper");
const { where } = require("sequelize");

const router = express.Router();



//Get all Spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll()

    await addPreview(spots)
    await addRating(spots)

    return res.json({ spots })
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

    return res.json({spots})
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
router.post("/:spotId/images", async (req,res) => {
    const { url, preview } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    const currentUser = req.user

    if (!spot) notFoundErr("Spot", res)
    notAuthorized(currentUser.id, spot.ownerId, res)

    await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })
    const test = await SpotImage.findOne({where: {url:url}})

    return res.json(test)
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



module.exports = router;

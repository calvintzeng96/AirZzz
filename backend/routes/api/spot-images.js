const express = require("express")
const { Spot, SpotImage } = require("../../db/models")
const { checkUser, notAuthorized } = require("../../utils/auth")


const { notFoundErr } = require("../../utils/helper");


const router = express.Router();


//Delete Spot Image
router.delete("/:imageId", checkUser, async (req, res) => {
    const currentUser = req.user
    const spotImg = await SpotImage.findByPk(req.params.imageId)

    if (!spotImg) notFoundErr("Spot Image", res)

    const spot = await Spot.findByPk(spotImg.spotId)

    notAuthorized(currentUser.id, spot.ownerId, res)

    spotImg.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})









module.exports = router;

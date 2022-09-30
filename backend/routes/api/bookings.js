const express = require("express")
const { Spot, Booking } = require("../../db/models")
const { checkUser, notAuthorized } = require("../../utils/auth")
const { notFoundErr, checkBookingOverlap, addPreviewNested } = require("../../utils/helper");

const router = express.Router();


//Get All Current User's Bookings
router.get("/current", checkUser, async (req, res) => {
    const currentUser = req.user
    const bookings = await Booking.findAll({
        where: {
            userId: currentUser.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        }
    })

    await addPreviewNested(bookings)

    res.json({bookings})
})

//Edit a Booking
router.put("/:bookingId", checkUser, async (req, res) => {
    const { startDate, endDate } = req.body
    const currentUser = req.user
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) notFoundErr("Booking", res)
    const spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    })
    notAuthorized(currentUser.id, booking.userId, res)
    await checkBookingOverlap(startDate, endDate, spot, res)

    booking.update({
        startDate, endDate
    })
    res.json(booking)
})

//Delete a Booking
router.delete("/:bookingId", checkUser, async (req, res) => {
    const currentUser = req.user
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) notFoundErr("Booking", res)
    notAuthorized(currentUser.id, booking.userId, res)

    booking.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})








module.exports = router;

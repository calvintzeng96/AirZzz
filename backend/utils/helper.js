const { Spot, SpotImage, Review } = require("../db/models")


//returns 404 Error if "item" NOT Found
const notFoundErr = function (item, res) {
    res.status(404)
    return res.json({
        statusCode: 404,
        message: `${item} couldn't be found`
    })
}

//Adds AvgRating/PreviewImage to Spot Object
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

const addNumReviews = async function (spots) {
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]
        let obj = spot.dataValues

        let count = await Review.count({ where: { spotId: spot.id } })

        obj.numReviews = count
    }
    return spots
}

module.exports = {
    notFoundErr,
    // ratingPreview
    addPreview,
    addRating,
    addNumReviews
}

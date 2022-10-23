reduxStore = {
    session: {
        user: {
            email: { info },
            username: { info },
            firstName: { info },
            lastName: { info },
            id: { info },
            token: { info },
        }
    },

    spot: {
        allSpots: {
            spotId: [
                {
                    id: { info },
                    address: { info },
                    city: { info },
                    state: { info },
                    country: { info },
                    lat: { info },
                    lng: { info },
                    name: { info },
                    description: { info },
                    price: { info },
                    ownerId: { info },
                    previewImage: { info },
                    avgRating: { info },
                    createdAt: { info },
                    updatedAt: { info }
                }
            ]
        },
        singleSpot: {
            id: { info },
            address: { info },
            city: { info },
            state: { info },
            country: { info },
            lat: { info },
            lng: { info },
            name: { info },
            description: { info },
            price: { info },
            ownerId: { info },
            numReviews: { info },
            avgRating: { info },
            createdAt: { info },
            updatedAt: { info },
            Owner: {
                id: { info },
                firstName: { info },
                lastName: { info }
            },
            SpotImages: [
                {
                    spotImageId: {
                        id: { info },
                        url: { info },
                        preview: { info },
                    }
                }
            ]
        }
    },

    review: {
        reviews: {
            reviewId: {
                id:  { info },
                spotId:  { info },
                userId:  { info },
                review:  { info },
                stars:  { info },
                createdAt:  { info },
                updatedAt:  { info },
                User: {
                    id:  { info },
                    firstName: { info },
                    lastName: { info }
                },
                ReviewImages: [
                    { info }
                ]
            }
        },
        userReviews: {
            reviewId: {
                id:  { info },
                spotId:  { info },
                userId:  { info },
                review:  { info },
                stars:  { info },
                createdAt: { info },
                updatedAt: { info },
                User: {
                    id:  { info },
                    firstName: { info },
                    lastName: { info }
                },
                ReviewImages: [
                    { info }
                ],
                Spot: {
                    id: { info },
                    ownerId: {info},
                    address: { info },
                    city: { info },
                    state: { info },
                    country: { info },
                    lat: { info },
                    lng: { info },
                    name: { info },
                    description: { info },
                    price: { info }
                }
            }
        }
    },

    error: {
        errors: {
            errors: [
                "info"
            ]
        },
        messages: "info",
        stack: "info",
        statusCode: Number
    }
}

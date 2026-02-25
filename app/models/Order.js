const { default: mongoose } = require("mongoose")

const OrderModel = new mongoose.Schema({
    user: {
        name: String,
        email: String,
        city: String,
        address: String,
        postalCode: Number,
    },

    cart: [
        {
            title: String,
            price: Number,
            number: Number,
            image: String,
        }
    ],
    totalPrice: Number,
    status: {type:Boolean, default: false},
    time: {type:String, default: Date.now}
})

export default mongoose.models.Order || mongoose.model("Order", OrderModel)
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ture
    },
    address: {
        type: String,
        required: ture
    },
    contect: {
        type: String,
        required: ture
    },
    owners: {
        type: String,
        required: ture,
        ref: "User"
    },
    city: {
        type: String,
        required: ture
    },
}, { timestamps: true });


const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;

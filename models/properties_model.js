const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const propertiesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    propertyImgName: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "UserModel"
    },
    address: {
        type: ObjectId,
        ref: "AddressModel"
    },
    intrested: [{ type: ObjectId, ref: "IntrestedModel" }],
    isRented: { type: Boolean, default: false }
});

mongoose.model("PropertiesModel", (propertiesSchema));
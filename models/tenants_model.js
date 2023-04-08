const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const tenantsSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "UserModel"
    },
    property: { type: ObjectId, ref: "PropertiesModel" },
    startDate: {
        type: Date
    },
    advanceAmount: {
        type: Number
    },
    rentPaidDate: {
        type: Date
    },
    rentAmount: {
        type: Number
    },
    rentNextDate: {
        type: Date
    },
    rentPaidFor: {
        type: Date
    }
});

mongoose.model("TenantsModel", (tenantsSchema));
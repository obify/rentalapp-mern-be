const mongoose = require('mongoose');
//const { ObjectId } = mongoose.Schema.Types;

const adddressSchema = new mongoose.Schema({
    addressLineOne: {
        type: String,
        required: true
    },
    addressLineTwo: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

mongoose.model("AddressModel",(adddressSchema));


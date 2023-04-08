// keep userid Ref
// keep propId Ref

const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const intrestedSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "UserModel"
    },
    property: {type: ObjectId, ref: "PropertiesModel"}
});

mongoose.model("IntrestedModel",(intrestedSchema));
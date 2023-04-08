const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AddressModel = mongoose.model("AddressModel");

const {authMiddleware, authRole} = require('../middlewere/protected_routes');

router.post('/addAddress', authMiddleware, (request, response) => {
    const {addressLineOne, addressLineTwo, city, state, zipCode, country} = request.body

        if(!addressLineOne || !city || !state || !zipCode || !country) {
            return response.status(400).json({ error: "One or more fields are empty" });
        }

        const addressModel = new AddressModel({
            addressLineOne,
            addressLineTwo,
            city,
            state,
            zipCode,
            country
        })
        addressModel.save()
            .then((savedAddress) => {
                response.status(201).json({ "savedAddress": savedAddress })
            })
            .catch((error)=> {
                return response.status(400).json({ error: "error occured"})
            })
});

router.get('/viewAddress/:addressId', (req, res) => {
    AddressModel.findOne({_id: req.params.addressId})
    .populate("user", "_id fname lname email phone")
    .then((addressFound) => {
        return res.json({ address: addressFound })
    })
    .catch((err) => {
        return res.status(400).json({ err: "Address was not found!" })
     })
})

router.put('/editAddress/:addressId', authMiddleware, (req, res) => {
    console.log(req.body)
    AddressModel.findByIdAndUpdate(req.params.addressId, {
        addressLineOne: req.body.addressLineOne, addressLineTwo: req.body.addressLineTwo, city: req.body.city, state: req.body.state,  zipCode: req.body.zipCode, country: req.body.country 
    }, {new: true}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Original Doc : ", docs);
            return res.json({ savedAddress: docs })
        }
    })
})

router.delete('/deleteAddress/:addressId', authMiddleware, async (req, res) => {
    const result = await AddressModel.findByIdAndDelete(req.params.addressId)
    if(result){
     res.send("deleted successfully")
    }
    else{
     res.status(404).send("cannot find property with id "+ req.params.propertyId)
    }
 })

module.exports = router ;
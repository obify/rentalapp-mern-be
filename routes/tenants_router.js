const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const momentjs = require('moment');

const PropertiesModel = mongoose.model("PropertiesModel");
const TenantsModel = mongoose.model("TenantsModel");
const { authMiddleware, authRole } = require('../middlewere/protected_routes');


router.get('/myTenants', authMiddleware, async (req, res) => {
    const user = req.dbUser;
    let tenantList = new Array()
    //console.log(user)
    const myProps = await PropertiesModel.find({ user: { $in: user._id } });

    for (let i = 0; i < myProps.length; i++) {
        const tenantData = await TenantsModel.find({ property: { $in: myProps[i]._id } })
            .populate("user", "_id fname lname email phone profileImgName")
            .populate("property");
        if (tenantData[0] != null) {
            tenantList.push(tenantData[0])
        }
    }

    return res.json({ allTenants: tenantList })
})

router.get('/myTenants/:userId', authMiddleware, (req, res) => {
    TenantsModel.findOne({ _id: req.params.userId })
        .populate("user", "_id fname lname email phone profileImgName")
        .populate("property")
        .then((tenantFound) => {
            return res.json({ tenant: tenantFound })
        })
        .catch((err) => {
            return res.status(400).json({ err: "Tenant was not found!" })
        })
})

router.post('/addTenant', authMiddleware, (req, res) => {

    const { userId, propertyId } = req.body
    const tenantsModel = new TenantsModel({
        user: userId,
        property: propertyId
    })
    tenantsModel.save()
        .then((savedTenant) => {
            res.status(201).json({ "savedTenant": savedTenant })
        })
        .catch((error) => {
            console.log(error)
            return res.status(400).json({ error: "Tenant not added" })
        })
}
)

router.put('/editRentalDetails/:userId', (req, res) => {
    const { startDate, advanceAmount, rentPaidDate, rentAmount, rentPaidFor } = req.body;
    TenantsModel.findByIdAndUpdate(req.params.userId, { startDate, advanceAmount, rentPaidDate, rentAmount, rentPaidFor },
        { new: true }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                return res.json({ savedTenant: docs })
            }
        }
    )
});

router.delete('/deleteTenant/:tenantId', async (req, res) => {
    const result = await TenantsModel.deleteMany({ _id: { $in: req.params.tenantId } })
    if (result.deletedCount > 0) {
        res.status(200).send(`deleted ${result.deletedCount} tenant successfully`)
    }
    else {
        res.status(404).send("cannot find tenant with id ")
    }
})



module.exports = router;
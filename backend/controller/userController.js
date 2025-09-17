const userModel = require('../models/userModel')

const createUser = async(req,res,next) => {
    try {
          const {
            fullname,
            password,
            email,
            phoneno,
            address,
            gender
        } = req.body

        await userModel.create(fullname,email,password,gender,address.line1,address.line2,address.city,address.state,address.country,address.postalCode,phoneno);

        res.status(201).json({message:'Registeration sucessfully',status:true})
    } catch (error) {
        next(error)
    }
}

const getUser = async(req,res,next) => {
    try {
        const result = await userModel.getAll()

        res.status(200).json({data:result,status:true})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    getUser
}
const User = require('../models/User')

module.exports = async (req, res, next) => {
    console.log("REQ do Attach")
    console.log(req)
    const decodedTokenData = req.tokenData
    const user = await User.findOne({ _id: decodedTokenData._id })

    req.currentUser = user

    if(!user){
        return res.status(401).send('User not found')
    }else {
        return next();
      }
}
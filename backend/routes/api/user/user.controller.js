const User = require('../../../models/user')

/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an employer
    if(!req.decoded.isEmployer) {
        return res.status(403).json({
            message: 'you are not an employer'
        })
    }

    User.find({}, '-password').exec()
    .then(
        users=> {
            res.json({users})
        }
    )

    // User.aggregate([
    //     {

    //     }
    // ])

}


/*
    POST /api/user/assign-employer/:username
*/
exports.assignEmployer = (req, res) => {
    // refuse if not an employer
    if(!req.decoded.isEmployer) {
        return res.status(403).json({
            message: 'you are not an employer'
        })
    }

    User.findOneByUsername(req.params.username)
    .then(
        user => {
            if(!user) throw new Error('user not found')
            user.assignEmployer()
        }
    ).then(
        res.json({
            success: true
        })
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
}
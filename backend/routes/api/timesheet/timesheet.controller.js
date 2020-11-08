const timesheet = require('../../../models/timesheet')
const Timesheet = require('../../../models/timesheet')
const User = require('../../../models/user')

exports.list = (req, res) => {
    // refuse if not an employer
    // if(!req.decoded.isEmployer) {
    //     return res.status(403).json({
    //         message: 'you are not an employer'
    //     })
    // }

   
    Timesheet.find({}).populate({
        path: "userId",
        select: {
          _id:0,
          username: 1,
          email: 1,
          phone: 1
        },
      }).exec().then(timesheet=>{
        res.json(timesheet)
    })

}

exports.submitHours = (req, res) => {
    // refuse if not an employer
   
    User.findOneByUsername(req.params.username)
    .then(
        user => {
            if(!user) throw new Error('user not found')
            let newTimeSheet = new Timesheet({
                userId:user._id,
                workingHours: req.body.workingHours,
                idleHours: req.body.idleHours,
                date: new Date(),

            })
            newTimeSheet.save()
        }
    ).then(
        res.json({
            success: true
        })
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Timesheet = new Schema({
    
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    workingHours: Number,
    idleHours: Number,
    date: String,
   
})

Timesheet.statics.findOneByUsername = function(username) {
    return this.findOne({
        username
    }).exec()
}

module.exports = mongoose.model('Timesheet', Timesheet)
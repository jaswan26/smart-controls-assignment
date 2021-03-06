const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const User = new Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
    isEmployer: { type: Boolean, default: false }
})

// create new User document
User.statics.create = function(username, password,email,phone) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')

    const user = new this({
        username,
        email,
        phone,
        password: encrypted
        
    })
    
    return user.save()
}

User.statics.findOneByUsername = function(username) {
    return this.findOne({
        username
    }).exec()
}

User.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')
    console.log(this.password === encrypted)

    return this.password === encrypted
}

User.methods.assignEmployer = function() {
    this.isEmployer = true
    return this.save()
}

module.exports = mongoose.model('User', User)
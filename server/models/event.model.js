import mongoose from 'mongoose'
//import crypto from 'crypto'
const EventSchema = new mongoose.Schema({

    event_type: {
        type: String,
        required: 'Event type is required'
    },

    service_type: {
        type: String,
        required: 'Service type is required'
    },

    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    address: {
        type: String,
        required: 'Address is required'
    },

    zip: {
        type: Number,
        required: 'Zip is required'
    },

    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },

    longitude: {
        type: String
    },

    latitude: {
        type: String
    },

    updated: Date,

    created: {
        type: Date,
        default: Date.now
    }
});

/*
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
*/

export default mongoose.model('Event', EventSchema)
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 6,
        maxlength: 50,
        validate: [
        (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    refreshToken: String,
  },
  {
    virtuals: {
        fullName: {
            get: function() {
                return `${this.firstName} ${this.lastName}`;
            }
        },

        id: {
            get: function() {
                return this._id
            }
        },

    }
  },
  { collection: 'user' }
);

module.exports = mongoose.model('User', UserSchema);
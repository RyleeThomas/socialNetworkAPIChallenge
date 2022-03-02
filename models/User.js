const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Provide a username',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Provide a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
}

);

UserSchema.virtual('friendcount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);
model.exports = User;
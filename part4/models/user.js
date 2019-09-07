const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: String,
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: "Blog"}]
    
  })

userSchema.pre('validate', async function(next) {
    try{
        const saltRounds = 8;
        const password = await bcrypt.hash(this.password, saltRounds)
        this.password = password
    }
    catch(err){
        next(err)
    }
});
userSchema.plugin(uniqueValidator)



userSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
}
})
const User = mongoose.model('User', userSchema)

module.exports = User
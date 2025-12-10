const mongoose=require ('mongoose')
const userSchema = new mongoose.Schema({
    uname:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
          enum: ["student", "faculty", "staff", "management"],
        required: true,
    },

});
 
module.exports= mongoose.model('User', userSchema);
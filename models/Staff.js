const mongoose=require ('mongoose')
const staffSchema = new mongoose.Schema({
    sname:{
        type:String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
     technology: {
        type: String,
        required: true,
    },
     skills: {
        type: String,
        required: true,
    },

});
 
module.exports= mongoose.model('Staff', staffSchema);
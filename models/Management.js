const mongoose=require ('mongoose')
const managementSchema = new mongoose.Schema({
    mname:{
        type:String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
     department: {
        type: String,
        required: true,
    },
     skills: {
        type: String,
        required: true,
    },

});
 
module.exports= mongoose.model('Management', managementSchema);
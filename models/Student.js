const mongoose=require ('mongoose')
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
    },
    CGPA: {
        type: Number,
        required: true,
    },

});
 
module.exports= mongoose.model('Student', studentSchema);

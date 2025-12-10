const mongoose=require ('mongoose')
const facultySchema = new mongoose.Schema({
    fname:{
        type:String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
    },
    Salary: {
        type: Number,
        required: true,
    },
     designation: {
        type: String,
        required: true,
    },
     qualification: {
        type: String,
        required: true,
    },

});
 
module.exports= mongoose.model('Faculty', facultySchema);
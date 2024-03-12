const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please fill the field']
    },
    email:{
        type:String,
        required:[true,'please add an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please add a password']
    },
    

},{
    timestamps:true // to update the created and updated time
})

module.exports=mongoose.model('user',userSchema)
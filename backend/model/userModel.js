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
    isAdmin: {
        type: Boolean,
        default: false, 
      },
    profileUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
    }
    
    

},{
    timestamps:true // to update the created and updated time
})

module.exports=mongoose.model('user',userSchema)
const mongoose=require('mongoose')


const connectDB=async ()=>{
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mernapp';
        const conn = await mongoose.connect(uri);
        console.log(`mongodb connected ${conn.connection.host}`.cyan.underline); 
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

module.exports=connectDB
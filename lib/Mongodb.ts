import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        if(mongoose.connection.readyState === 1) return

        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: 'FashionBuz',
        })

       console.log("✅ MongoDB Connected")

    }catch(error){
        console.error('Mongodb Error', error)
    }
}
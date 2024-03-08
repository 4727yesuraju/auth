import mongoose from 'mongoose';

export async function connectToMongoDB (){
   try {
      await mongoose.connect(process.env.CONN_STR);
      console.log("connected to MongoDB");
   } catch (error) {
      console.log("error while connecting to MongoDB",error.message);
   }
}
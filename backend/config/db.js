import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export async function connectToDB() {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected: ", conn.connection.host);
    }
    catch(error){
        console.log('Error connecting to DB ', error.message);
        process.exit(1);
    }
    
}
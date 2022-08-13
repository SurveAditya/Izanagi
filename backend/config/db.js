import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn= await mongoose.connect('mongodb+srv://admin:admin@cluster0.7yifhdr.mongodb.net/izanagi?retryWrites=true&w=majority',{
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected:${conn.connection.host}`)
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit(1)
    }
}

export default connectDB

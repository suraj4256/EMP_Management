require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://surajdey2k1:${process.env.MONGO_PASSWORD}@cluster.nw2ow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`


const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

connectToMongoDB();
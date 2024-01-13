import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://FilmFlix:filmflix@filmflix-cluster0.3ytke6h.mongodb.net/`;

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
});
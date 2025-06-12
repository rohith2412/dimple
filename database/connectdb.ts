import mongoose from "mongoose"

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectdb
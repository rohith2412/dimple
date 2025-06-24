import mongoose from "mongoose"

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)

    } catch (error) {
        console.log(error)
    }
}

export default connectdb
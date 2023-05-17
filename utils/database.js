import mongoose from 'monogose'

let isConnected = false

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('mongo db connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
        console.log('mongodb connected')
    } catch(err) {
        console.log('Error: >', err)
    }

}
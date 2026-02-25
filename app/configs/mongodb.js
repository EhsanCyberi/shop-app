import mongoose from "mongoose"

const uri = process.env.MONGODB_URI

if (!uri) {
    throw new Error("تنظیمات دیتابیس را وارد کنید")
}

let isConnected = false

export async function connToDb() {
    if (isConnected) {
        return console.log("database connected!") 
    }

    try {
        await mongoose.connect(uri, {dbName: "techno"})
        isConnected = true
        console.log("اتصال موفق به دیتابیس");
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
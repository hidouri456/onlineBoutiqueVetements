import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import User from './models/userModel.js'

const run = async () => {
  try {
    await connectDB()
    const exists = await User.findOne({ email: 'admin@boutique.com' })
    if (exists) {
      console.log('Admin already exists')
      process.exit()
    }
    const user = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@boutique.com',
      password: 'Admin123!',
      role: 'admin',
    })
    console.log('Created admin:', user.email)
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()

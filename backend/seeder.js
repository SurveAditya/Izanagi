import users from './data/users.js'
import products from './data/products.js'
import User from './Models/Usermodel.js'
import Product from './Models/Productmodel.js'
import Order from './Models/Ordermodel.js'
import connectDB from './config/db.js'

connectDB();

const importData = async () => {
        try {
                await Order.deleteMany()
                await Product.deleteMany()
                await User.deleteMany()

                const createdUser = await User.insertMany(users)
                const adminUser = createdUser[0]._id

                const sampleProduts = products.map(product =>{
                    return { ...product , user:adminUser}
                })
                await Product.insertMany(sampleProduts)
                console.log("Data imported");
                process.exit()
        } catch (error) {
                console.log(`Error=${error}`)
                process.exit(1)            
        }
}

const destroyData = async () => {
    try {
            await Order.deleteMany()
            await Product.deleteMany()
            await User.deleteMany()
            console.log("Data deleted");
            process.exit()
    } catch (error) {
            console.log(`Error=${error}`)
            process.exit(1)            
    }
}

if(process.argv[2] == '-d'){
    destroyData()
}
else{
        importData()
}
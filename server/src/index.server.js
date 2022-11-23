const express = require("express")
const env = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const addressRoutes = require("./routes/address")
const initialDataRoutes = require('./routes/admin/initialData')
const pageRoutes = require('./routes/admin/page')
const orderRoutes = require("./routes/order")
const adminOrderRoute = require("./routes/admin/order.routes");


env.config()

//mongo connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.huwjhrb.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true
    }
).then(() => {
    console.log('database connected')
})

app.use(cors())
app.use(bodyParser.json())

app.use('/public', express.static( path.join(__dirname, 'uploads')))

app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', initialDataRoutes)
app.use('/api', pageRoutes)
app.use("/api", addressRoutes)
app.use("/api", orderRoutes)
app.use("/api", adminOrderRoute);

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})
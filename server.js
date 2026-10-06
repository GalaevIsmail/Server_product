const express = require ("express")
const mongoose = require ("mongoose")

const Product = require("./models/Produst")

const PORT = 5000;

const app = express()
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/products").then(()=>{
    console.log("Успешно подключение к БД");
    
}).catch((error)=>{
    console.error("Ошибка при подключении к БД:" + error);
    
})

app.post('/addproducts',async (req ,res )=>{
    const{title, description, price} = req.body
    try{
        const newProduct = await Product.create({
            title, description, price
        })
        await newProduct.save()
    }catch (error){
    
    }
})


app.listen(PORT , ()=>{
    console.log("Успешно подключение порт:" + PORT);
    
})

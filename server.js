// Подключаем библиотеку Express для создания веб-сервера
const express = require ("express")
// Подключаем библиотеку Mongoose для работы с MongoDB
const mongoose = require ("mongoose")

// Импортируем модель Product из файла models/Produst
const Product = require("./models/Produst")

// Задаем порт, на котором будет работать сервер
const PORT = 5000;

// Создаем приложение Express
const app = express()
// Подключаем middleware для автоматического парсинга JSON в теле запросов
app.use(express.json())


// Подключаемся к базе данных MongoDB по указанному адресу
mongoose.connect("mongodb://localhost:27017/products").then(()=>{
    // Если подключение успешно — выводим сообщение в консоль
    console.log("Успешно подключение к БД");
    
}).catch((error)=>{
    // Если произошла ошибка — выводим её в консоль
    console.error("Ошибка при подключении к БД:" + error);
    
})


// Обработчик GET-запроса на путь /products — получение всех товаров
app.get("/products", async (req, res)=>{
    try{
        // Ищем все документы Product в базе данных
        const products = await Product.find()
    // Отправляем найденные товары в формате JSON
    res.json(products)
    }catch(error){
        // При ошибке отправляем текст ошибки
        res.send("Ошибка при получении товара " + error)
    }
    
    
})


// Обработчик POST-запроса на путь /addproducts — добавление нового товара
app.post('/addproducts',async (req ,res )=>{
    // Деструктуризацией достаем поля из тела запроса
    const{title, description, price} = req.body
    try{
        // Создаем новый товар в базе данных с полученными данными
        const newProduct = await Product.create({
            title, description, price
        })
        // Сохраняем новый товар (избыточно, т.к. create уже сохраняет)
        await newProduct.save()
        // Отправляем сообщение об успехе
        res.send("Товар добавлен успешно")
    }catch (error){
        // Логируем ошибку в консоль
        console.log("Ошибка при давлениии товара: " + error);
        // Отправляем сообщение об ошибке клиенту
        res.send("Ошибка при добалении товара ")
    }
})



// Обработчик DELETE-запроса на путь /products/:id — удаление товара по id
app.delete('/products/:id', async (req , res)=>{
 try{
     
    // Извлекаем id из параметров URL
    const {id} = req.params
    // Ищем и удаляем товар по id
    const product = await Product.findByIdAndDelete(id)

    // Если товар не найден — сообщаем об этом
    if(!product){
        res.send("Такого товара не существует")
    }
    // Отправляем сообщение об успешном удалении
    res.send("Товар удален успешно")
 }catch(error){

    // При ошибке отправляем текст ошибки
    res.send("Ошибка при удалении товара: " + error)
 }
})


// Запускаем сервер на указанном порту
app.listen(PORT , ()=>{
    // Выводим сообщение о запуске сервера
    console.log("Успешно подключение порт:" + PORT);
    
})
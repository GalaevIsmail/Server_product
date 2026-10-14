


import express from"express"
import  mongoose from "mongoose";
import  router from "./router.js";

// Задаем порт, на котором будет работать сервер
const PORT = 5000;

// Создаем приложение Express
const app = express()
// Подключаем middleware для автоматического парсинга JSON в теле запросов
app.use(express.json())
app.use(router)

// Подключаемся к базе данных MongoDB по указанному адресу
mongoose.connect("mongodb://localhost:27017/products").then(()=>{
    // Если подключение успешно — выводим сообщение в консоль
    console.log("Успешно подключение к БД");
    
}).catch((error)=>{
    // Если произошла ошибка — выводим её в консоль
    console.error("Ошибка при подключении к БД:" + error);
    
})

// Запускаем сервер на указанном порту
app.listen(PORT , ()=>{
    // Выводим сообщение о запуске сервера
    console.log("Успешно подключение порт:" + PORT);
    
})
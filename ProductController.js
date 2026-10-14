import   Product from "./models/Produst.js";


class ProductController{
    async getProducts(req ,res){
        try{
            // Ищем все документы Product в базе данных
            const products = await Product.find()
        // Отправляем найденные товары в формате JSON
        res.json(products)
        }catch(error){
            // При ошибке отправляем текст ошибки
            res.send("Ошибка при получении товара " + error)
        }
    }

    async  addProduct(req ,res){
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
    }

    async editProduct(req , res){
        try{
            const {id} = req.params
    
            const productUpdate = await Product.findByIdAndUpdate(id , {$set: req.body}, {new: true})
            if(!productUpdate){
                res.send("Токого товара нету ")
            }
            res.json(productUpdate)
        }catch(error){
            res.send("Ошибка при измменении товара")
        }
    }
    
    async updateProduct( req ,res){
        try{
            const {id}= req.params
         
            const {title , description, price} = req.body
            console.log(id);
            
        
            const updeteProduct = await Product.findByIdAndUpdate(id ,{
                title , description, price
            }, {new: true})
            if(!updeteProduct){
                res.send("Такого товара не сушествует")
            }
        
            res.json(updeteProduct , "Товар обновлен успешно")
        }catch(error){
        console.log("Ошибка при обновлении  товара: " + error);
        
        }
    }

    async deletProduct(req ,res){
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
    }
}


export default  new ProductController();
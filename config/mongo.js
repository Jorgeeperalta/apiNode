const mongoose = require('mongoose')

const dbConnection = () => {
    const DB_URI = process.env.DB_URI 
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },(error,res) => {
          if (!error){
                  console.log("coneccion exitosa!!"+ res)
          }else{
              console.log("error de coneccion")
          }
    });
};

module.exports = dbConnection
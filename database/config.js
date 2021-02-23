
const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');

    }catch(error){
        console.log(error);
        throw Error('Error en la bdd - Hable con el admin');
    }
}

module.exports = {
    dbConnection
}
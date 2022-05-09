require("dotenv").config()
const express = require('express');
const cors = require('cors')
const app = express()
const morganBody = require('morgan-body')
const ENGINE_DB = process.env.ENGINE_DB
const dbConnectionNosql = require('./config/mongo')
const  {dbConnectionMysql} = require('./config/mysql')
const loggerStream = require('./utils/handleLogger')
app.use(cors())
app.use(express.json())
app.use(express.static("storage"))




morganBody(app,{
    noColor: false,
    stream: loggerStream,
    skip: function(req, res) {
        return res.statusCode < 400 
    }
})

const port = process.env.PORT || 3000
// aqui se llaman a las rutas las





app.use("/api",require("./routes"))

app.listen(port, () =>{
    console.log('listening on port '+ port)
});

(ENGINE_DB === 'nosql') ? dbConnectionNosql() : dbConnectionMysql()

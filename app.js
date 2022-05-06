require("dotenv").config()
const express = require('express');
const cors = require('cors')
const app = express()
const morganBody = require('morgan-body')
const {IncomingWebhook} = require('@slack/webhook')
const dbConnection = require('./config/mongo')
app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStream = {
    write: message => {
        webhook.send({ 
            text: message
        })
        console.log("capturando el log", message)
      // do anything - emit to websocket? send message somewhere? log to cloud?
    },
  };
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
})

dbConnection()
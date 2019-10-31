const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const morgan = require('morgan')

class App{
    constructor(){
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.database()
        this.middlewares()
        this.routes()
    }

    database() {
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(morgan('combined'))
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

module.exports = new App().express
const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')

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
        this.express.use(helmet())
        this.express.use(compression())
        this.express.use(cors())
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

module.exports = new App().express
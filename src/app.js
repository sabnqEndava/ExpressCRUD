const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./db')
const { database , userDB, passDB } = require('./config/index')
const usersRoutes = require('./routes/users')
const loginRoutes = require('./routes/login')

class App {
    constructor() {
        this.initApp()
        this.routes()
        this.initDatabase()
    }

    initApp() {
        app.use(cors())
        app.use(express.json()); 
    }

    routes() {
        // Routes
        app.use(usersRoutes)
        app.use(loginRoutes)
        app.use( (req, res) => {
            res.status(400).json({
                message: 'not found'
            })
        })
    }

    initDatabase() {
        connect(`mongodb+srv://${userDB}:${passDB}@endava.yyroa.mongodb.net/${database}?retryWrites=true&w=majority`)
    }

    initServer(port) {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`);
        });
    }
}

module.exports = App

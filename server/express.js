import express from 'express'
//import path from 'path'
import bodyParser from 'body-parser'
//import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import eventRoutes from './routes/event.routes.js'
//import authRoutes from './routes/auth.routes'

const app = express()

//comment out before building for production
// devBundle.compile(app)

// parse body params and attach them to req.body -- bodyParser is deprecated
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cookieParser())  
// compression - compression middleware will attempt to compress response bodies 
// for all requests that pass through middleware
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/', eventRoutes)

//app.use('/', authRoutes)


app.get('/', (req, res) => {
    res.status(200).send(Template())
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app
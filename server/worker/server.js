import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import consolidate from 'consolidate'
import { search, download } from './tools'

dotenv.config()

const numCPUs = os.cpus().length
const app = express()
app.use([
    morgan('dev'),
    cors()
])

app.use((req, res, next) => {
    res.render = (file, params) => {
        let filePath = path.resolve(__dirname, '../client', file)
        
        consolidate.mustache(filePath, params || {}, (error, html) => {
            if (error) return next(error)

            res.set('Content-Type', 'text/html')
            res.status(200).send(html)
        })
    }

    next()
})

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker %d died (%s). restarting...`, worker.process.pid, signal || code)

        cluster.fork()
    })
} else {
    console.log(`Worker ${process.pid} is running`)

    const args = process.argv.splice(2)
    const port = args[0] || process.env.PORT

    app.get('/', (req, res) => {
        res.render('index.html')
    })

    app.get('/search', (req, res) => {
        let q = req.param('q')
        let p = req.param('p')
    
        return search(q.replace(/ /g, '+'), p, res)
    })
    
    app.get('/download', (req, res) => {
        let link = req.param('link')
    
        if (link.indexOf('_download.html') === -1) link = link.replace('.html', '_download.html')
        
        return download(link, res)
    })
    
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server is running on port ${port}.`)
    })
}
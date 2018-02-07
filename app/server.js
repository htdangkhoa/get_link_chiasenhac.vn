import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { search, download } from './tools'

dotenv.config()

const numCPUs = os.cpus().length
const app = express()
app.use([
    morgan('dev')
])

if (cluster.isMaster) {
    console.log(`Server is running on port ${process.env.PORT}`)
    console.log(`Master ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker %d died (%s). restarting...`, worker.process.pid, signal || code)

        cluster.fork()
    })
} else {
    app.get('/search', (req, res) => {
        let q = req.param('q')
    
        return search(q.replace(/ /g, '+'), res)
    })
    
    app.get('/download', (req, res) => {
        let link = req.param('link')
    
        if (link.indexOf('_download.html') === -1) link = link.replace('.html', '_download.html')
        
        return download(link, res)
    })
    
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}.`)
    })   
}
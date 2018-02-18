import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'
import express from 'express'
import httpProxy from 'http-proxy'

dotenv.config()

const numCPUs = os.cpus().length
const app = express()
const proxy = httpProxy.createProxyServer({})

const addresses = [
    {
        host: '192.168.1.11',
        port: 9001
    },
    {
        host: '192.168.1.11',
        port: 9002
    },
    {
        host: '192.168.1.11',
        port: 9003
    }
]

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

    app.use((req, res) => {
        addresses.forEach(a => {
            proxy.web(req, res, {
                target: `http://${a.host}:${a.port}`
            })
        })
    })
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`)
    })
}
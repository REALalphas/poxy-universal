import Fastify from 'fastify'
import websocket from '@fastify/websocket'

const fastify = Fastify()
await fastify.register(websocket)

const webSocketsHandler = (conn, req) => {
    conn.socket.on('message', (raw) => {
        const message = JSON.parse(raw)
        console.log(message)
        // conn.socket.send(JSON.stringify({
        //     message: 'Hello from server'
        // }))
    })
}

await fastify.register(async () => {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: (req, res) => {
            res.send('Waiting for web panel')
        },
        wsHandler: webSocketsHandler
    })
})

await fastify.listen({ port: 8080 })

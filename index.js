import { select } from '@inquirer/prompts'
import * as cp from 'child_process'

const fork = (js) => {
    const child = cp.fork(js)
    child.on('message', (msg) => {
        console.log(msg)
    })
    return child
}

const forkWithMessages = (js, msg, onmessage) => {
    const child = cp.fork(js)
    child.on('message', onmessage)
    child.send(msg)
    return child
}

select({
    message: '[poxy]',
    choices: [
        {
            name: 'Client',
            value: 'client',
            description: ' '
        },
        {
            name: 'Server',
            value: 'server',
            description: ' '
        }
    ]
}).then((answer) => {
    switch (answer) {
        case 'client':
            fork('./client/index.js')
            break
        case 'server':
            fork('./server/index.js')
            break
    }
    
}).catch((err) => {
    console.error(err)
})

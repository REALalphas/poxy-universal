// manager for udp connection
import dgram from 'node:dgram'

// creating new class ConnectionUDP
class ConnectionUDP {
  constructor(host, port) {
    this.host = host
    this.port = port
    this.socket = dgram.createSocket('udp4')
  }

  // send message
  send(message) {
    this.socket.send(message, this.port, this.host)
  }

  // close connection
  close() {
    this.socket.close()
  }
}
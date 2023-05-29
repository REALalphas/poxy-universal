// make ws connection as clientSocket


function handleClient(clientSocket, serverSocket) {

	clientSocket.on('data', (data) => {
		// Forward client data to the server
		serverSocket.write(data)
	})
	
	serverSocket.on('data', (data) => {
		// Forward server data to the client
		clientSocket.write(data)
	})
	
	clientSocket.on('end', () => {
		// Close the client and server sockets
		clientSocket.end()
		serverSocket.end()
	})
	
	serverSocket.on('end', () => {
		// Close the client and server sockets
		clientSocket.end()
		serverSocket.end()
	})
}

function startProxy(proxyHost, proxyPort, serverHost, serverPort) {

	// Create a proxy server
	const proxyServer = net.createServer();
	
	proxyServer.on('connection', (clientSocket) => {
		// const serverSocket = SERVER SOCKET
		
		// Handle client-server communication
		handleClient(clientSocket, serverSocket);
	});
	
	proxyServer.listen(proxyPort, proxyHost, () => {
		console.log(`Proxy server started on ${proxyHost}:${proxyPort}`);
	});
}
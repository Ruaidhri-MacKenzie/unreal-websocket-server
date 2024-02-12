import { randomUUID } from "crypto";
import WebSocket, { WebSocketServer } from "ws";
import { PORT } from "./config.js";

const wss = new WebSocketServer({ port: PORT });

const serverBroadcast = (message) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};

const onConnection = (ws) => {
	const id = randomUUID();

	ws.on("close", () => {
		console.log(`Client Disconnect: ${id}`);
	});
	
	ws.on("message", (data) => {
		console.log(`Received Message: ${data}`);
		serverBroadcast(`Client ${id} ${data}`);
	});
	
	console.log(`Client Connect: ${id}`);
	ws.send(`Connected: ${id}`);
};

wss.on("connection", onConnection);
console.log(`Server listening on port ${PORT}...`);

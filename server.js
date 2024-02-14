import { randomUUID } from "crypto";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import { HTTP_PORT, WS_PORT } from "./config.js";
const __dirname = import.meta.dirname;
const publicPath = `${__dirname}/public`;

const app = express();
app.use(express.static(publicPath));
app.get("/", (req, res) => res.sendFile(`${publicPath}/index.html`));
app.listen(HTTP_PORT, () => console.log(`HTTP server listening on port ${HTTP_PORT}...`));

const wss = new WebSocketServer({ port: WS_PORT });

const serverBroadcast = (message) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};

const onConnection = (ws) => {
	ws.on("close", () => {
		console.log(`Disconnection: ${ws._socket.remoteAddress}`);
	});
	
	ws.on("message", (data) => {
		// console.log(JSON.stringify(JSON.parse(data)));
		serverBroadcast(JSON.stringify(JSON.parse(data)));
	});
	
	console.log(`Connection: ${ws._socket.remoteAddress}`);
};

wss.on("connection", onConnection);
console.log(`WebSocket server listening on port ${WS_PORT}...`);

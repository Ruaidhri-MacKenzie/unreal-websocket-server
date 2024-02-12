const HOST = "127.0.0.1";
const PORT = 8080;
const socket = new WebSocket(`ws://${HOST}:${PORT}`);

socket.addEventListener("open", (event) => {
	console.log("Connected");
});

socket.addEventListener("error", (error) => {
	console.log(error);
});

socket.addEventListener("close", (event) => {
	console.log("Disconnected");
});

socket.addEventListener("message", (event) => {
	console.log(event.data);
});

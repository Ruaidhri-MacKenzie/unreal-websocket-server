const HOST = "127.0.0.1";
const PORT = 8080;
const socket = new WebSocket(`ws://${HOST}:${PORT}`);

const nameText = document.getElementById("name");
const categoryText = document.getElementById("category");
const postcodeText = document.getElementById("postcode");

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
	const data = JSON.parse(event.data);
	console.log(data);

	if (data.name) nameText.innerText = data.name;
	if (data.category) categoryText.innerText = data.category;
	if (data.postcode) postcodeText.innerText = data.postcode;
});

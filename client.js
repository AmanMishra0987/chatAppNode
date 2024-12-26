const socket = io("http://localhost:8000");

const mname = prompt("Enter Your Name : ");
socket.emit("user-joined", mname);
socket.on("new-user-joined", (mname) => {
  if (mname) genrateMsg("center", `${mname} joined the chat`);
});
const first = document.querySelector(".first");
function genrateMsg(side, message) {
  var div = document.createElement("div");
  div.classList.add("alert");
  div.innerHTML = message;

  if (side == "left") {
    div.classList.add("alert-primary");
  } else if (side == "right") {
    div.classList.add("alert-secondary");
  } else {
    div.classList.add("alert-danger");
  }
  first.appendChild(div);
}

function sendMessage() {
  let input = document.getElementById("message");
  genrateMsg("right", `${input.value} : You`);
  socket.emit("send", input.value);
  input.value = "";
}

socket.on("receive", ({ name, message }) => {
  genrateMsg("left", `${name}:${message}`);
});

socket.on("user-left", (name) => {
  if (name) genrateMsg("center", `${name} left the chat`);
});

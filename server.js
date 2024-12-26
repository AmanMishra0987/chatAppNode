const io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

let users = {};

io.on("connection", (socket) => {
  socket.on("user-joined", (mname) => {
    users[socket.id] = mname;
    socket.broadcast.emit("new-user-joined",mname)
  });
  socket.on('send',(message)=>{
    socket.broadcast.emit('receive',{name:users[socket.id],message:message  })
  })
  socket.on('disconnect',()=>{
    socket.broadcast.emit('user-left',users[socket.id])
    delete users[socket.id]
  })
});


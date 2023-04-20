const io = require("socket.io")(5000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[name] = socket; 
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", ({ message, to }) => {
    if (to in users) {
      users[to].emit("receive", {
        message: message,
        name: users[socket.id],
      });
    }
  });
});
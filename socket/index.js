const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

//adding a user
const addUser = (userId, socketId) => {
  !users.some((user) => {
    return user.userId === userId;
  }) && users.push({userId, socketId});
};

//removing a user
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId != socketId);
};

//get a user
const getUser = (userId) => {
  return users.find((user) => {
    user.userId == userId;
  });
};

io.on("connection", (socket) => {
  console.log("user is connected");
  //take userId and socketId
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send message to a user
  socket.on("sendMessage", ({senderId, recieverId, text}) => {
    console.log("socket message sending");
    const user = getUser(recieverId);
    io.to(user?.socketId).emit("getMessage", {senderId, text});
  });

  //disconnecting  a user
  socket.on("disconnect", () => {
    console.log("a user is disconnectd");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

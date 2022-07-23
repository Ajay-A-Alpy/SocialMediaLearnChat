const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];
let usercount = 1;

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
const getUser = (Id) => {
  console.log(users);
  return users.find((user) => user.userId === Id);
};

io.on("connection", (socket) => {
  console.log("user is connected" + usercount);
  usercount++;
  //take userId and socketId
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send message to a user
  socket.on("sendMessage", ({senderId, recieverId, text}) => {
    console.log("socket sendMessage recieved  from client 1" + senderId);
    const user = getUser(recieverId);
    console.log("hello", user);
    io.to(user?.socketId).emit("getMessage", {senderId, text});
    console.log("send messge emmitted to client 2" + recieverId);
  });

  //disconnecting  a user
  socket.on("disconnect", () => {
    console.log("a user is disconnectd");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  //VIDEO CALL
  socket.emit("me", socket.id);
  //CALL USER
  socket.on("callUser", ({userToCall, signalData, from, name}) => {
    io.to(userToCall).emit("callUser", {signal: signalData, from, name});
  });

  //AMSWER CALL
  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

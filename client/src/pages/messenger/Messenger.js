import {Box, Button, Stack} from "@mui/material";
import React, {useRef} from "react";
import Navbar from "../../components/imports/Navbar";
import "../messenger/Messenger.css";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Conversation from "../../components/imports/conversations/Conversation";
import Message from "../../components/imports/messages/Message";
import SendIcon from "@mui/icons-material/Send";
import ChatOnline from "../../components/imports/chatOnline/ChatOnline";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getConversation} from "../../redux/features/chatSlice";
import * as api from "../../redux/api";
import {io} from "socket.io-client";

function Messenger() {
  const {user} = useSelector((state) => ({...state.auth}));
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  const [newMessage, setNewMessage] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const dispatch = useDispatch();
  const {conversations} = useSelector((state) => ({...state.chat}));
  const {friends} = useSelector((state) => ({...state.auth}));
  const scrollRef = useRef();

  const socket = useRef();

  let currentUser = user;

  useEffect(() => {
    console.log("new message reached ");
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("new message arrived ");
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    console.log("set arrival messages");
    arrivalMessage &&
      currentChat.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //adding user to socket
  useEffect(() => {
    socket.current.emit("addUser", currentUser?.result._id);
    socket.current.on("getUsers", (users) => {
      console.log(users, "iiiiiiiiiii");
      console.log(currentUser, "mmmmm");
      setOnlineUsers(
        currentUser?.result.friends.filter((f) =>
          users.some((u) => u.userId === f)
        )
      );
    });
  }, [user]);

  useEffect(() => {
    dispatch(getConversation(user?.result._id));
  }, [user?.result._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendChat = {
      conversationId: currentChat._id,
      senderId: user.result._id,
      text: newMessage,
    };

    const recieverId = currentChat.members.find(
      (member) => member !== currentUser?.result._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser?.result._id,
      recieverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        const res = await api.createMessage(sendChat);
        setMessage([...message, res.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        let response = await api.getMessage(currentChat?._id);
        console.log(response);
        setMessage(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  }, [message]);

  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" className="messenger">
        <Box className="chatMenu" sx={{display: {xs: "none", sm: "block"}}}>
          <Box className="chatMenu_wrapper">
            <Typography>Menu</Typography>

            <TextField
              placeholder="Search friends"
              variant="standard"
              name="subject"
              sx={{padding: "", width: "100%"}}
            />

            {conversations.map((item) => {
              return (
                <Box
                  onClick={() => {
                    setCurrentChat(item);
                  }}
                  sx={{cursor: "pointer"}}
                >
                  <Conversation
                    key={item._id}
                    conversation={item}
                  ></Conversation>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Stack className="chatBox" direction="column">
          <Box className="chatBox_wrapper">
            <Typography> Chat Box</Typography>
            {currentChat ? (
              <>
                {message?.map((m) => {
                  return (
                    <Box ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.senderId === user?.result._id}
                        key={m._id}
                        name={currentUser?.result.name}
                      />
                    </Box>
                  );
                })}
              </>
            ) : (
              <Typography className="chatBox_conversationText">
                Open a conversation
              </Typography>
            )}
          </Box>

          <Box className="chatBox_bottom">
            <TextField
              placeholder="Send message"
              variant="outlined"
              name="subject"
              sx={{padding: "", width: "100%"}}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              value={newMessage}
            />

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              className="chatBox_bottom_submit"
              onClick={handleSubmit}
            >
              Send
            </Button>
          </Box>
        </Stack>

        <Box className="chatOnline" sx={{display: {xs: "none", sm: "block"}}}>
          <Box className="chatOnline_wrapper">
            <Typography>Menu</Typography>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUser={currentUser?.result._id}
              setCurrentChat={setCurrentChat}
              myfriends={friends}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Messenger;

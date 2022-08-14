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
import {useNavigate} from "react-router-dom";
import {
  createConversation,
  getConversation,
} from "../../redux/features/chatSlice";
import * as api from "../../redux/api";
import {io} from "socket.io-client";
import InputEmoji from "react-input-emoji";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

import Picker from "emoji-picker-react";

function Messenger() {
  const {user} = useSelector((state) => ({...state.auth}));
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState();
  const [followers, setFollowers] = useState([]);
  const [next, setNext] = useState(false);
  const [change, setChange] = useState(false);
  const [checked, setChecked] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const dispatch = useDispatch();
  const {conversations} = useSelector((state) => ({...state.chat}));
  const {friends} = useSelector((state) => ({...state.auth}));
  const scrollRef = useRef();
  const navigate = useNavigate();

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
    const getFollowers = async () => {
      let id = user.result._id;
      let result = await api.getFollowers(id);
      setFollowers(result.data);
    };
    getFollowers();
  }, [followers]);

  useEffect(() => {
    dispatch(getConversation(user?.result._id));
  }, [user?.result._id, change]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendChat = {
      conversationId: currentChat._id,
      senderId: user.result._id,
      text: newMessage,
    };

    const recieverId = currentChat.members.filter((id) => {
      return id != currentUser.result._id;
    });

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

  const handleNext = () => {
    setOpen(false);
    setNext(true);
  };

  const handleToggle = (value) => (e) => {
    const currentIndex = checked?.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (groupName) {
      if (checked.includes(user.result._id) == false) {
        setChecked(checked.push(user.result._id));
      }

      let conversation = {
        member: checked,
        groupName,
      };

      dispatch(createConversation({conversation, navigate}));
      setNext(false);
      setChange(!change);
      setGroupName(" ");
      navigate("/messenger");
    }
  };

  return (
    <>
      <Box>
        <Navbar chatStatus={true}></Navbar>
        <Stack direction="row" className="messenger">
          <Box className="chatMenu" sx={{display: {xs: "none", sm: "block"}}}>
            <Box className="chatMenu_wrapper">
              <Tooltip title="Create">
                <Fab
                  color="primary"
                  aria-label="add"
                  sx={{margin: "1rem"}}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Typography variant="h6" color="white">
                Create a group
              </Typography>
              {/* <TextField
                placeholder="Search friends"
                variant="standard"
                name="subject"
                sx={{padding: "", width: "100%"}}
              /> */}

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
                <Typography className="chatBox_conversationText" variant="h3">
                  Open a conversation
                </Typography>
              )}
            </Box>

            <Box className="chatBox_bottom">
              <InputEmoji
                cleanOnEnter
                placeholder="write message"
                onChange={setNewMessage}
                value={newMessage}
                className="send_btn"
                name="subject"
                onEnter={(e) => {
                  console.log(e.target.value);
                }}
              ></InputEmoji>

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

      <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent sx={{minHeight: "300px", minWidth: "300px"}}>
          <DialogContentText>Select members</DialogContentText>
          <List dense sx={{width: "100%", bgcolor: "background.paper"}}>
            {followers?.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.person._id}`;
              return (
                <ListItem
                  key={value.person._id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value.person._id)}
                      // checked={checked?.indexOf(value.person._id) !== -1}
                      inputProps={{"aria-labelledby": labelId}}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${1}`}
                        src={`http://localhost:5000/profile.jpg`}
                      >
                        {value.person.name}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.person.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={next}>
        <DialogTitle>Group Name</DialogTitle>
        <DialogContent>
          <DialogContentText>choose a name for group</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="group"
            name="groupname"
            type="text"
            fullWidth
            variant="standard"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setNext(false);
            }}
          >
            close
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleCreateGroup}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Messenger;

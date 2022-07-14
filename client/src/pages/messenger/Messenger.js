import {Box, Button, Stack} from "@mui/material";
import React from "react";
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

function Messenger() {
  const {user} = useSelector((state) => ({...state.auth}));
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const {conversations} = useSelector((state) => ({...state.chat}));
  console.log(currentChat);
  useEffect(() => {
    dispatch(getConversation(user.result._id));
  }, [user.result._id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        let response = await api.getMessage(currentChat?._id);
        setMessage(response.data);
        console.log(message);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" className="messenger">
        <Box className="chatMenu">
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
        <Box className="chatBox">
          <Box className="chatBox_wrapper">
            <Typography> Chat Box</Typography>
            {currentChat ? (
              <>
                {message.map((m) => {
                  return (
                    <Message message={m} own={m.senderId === user.result._id} />
                  );
                })}
              </>
            ) : (
              <Typography className="chatBox_conversationText">
                Open a conversation
              </Typography>
            )}

            <Box className="chatBox_bottom">
              <TextField
                placeholder="Search friends"
                variant="outlined"
                name="subject"
                sx={{padding: "", width: "100%"}}
              />

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                className="chatBox_bottom_submit"
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="chatOnline">
          <Box className="chatOnline_wrapper">
            <Typography>Menu</Typography>
            <ChatOnline></ChatOnline>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Messenger;

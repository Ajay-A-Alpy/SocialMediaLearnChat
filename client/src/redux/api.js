import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
  console.log("headerssssss");
  if (localStorage.getItem("userToken")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
  }

  if (localStorage.getItem("expertToken")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("expertToken")
    )}`;
  }

  console.log("returnnnnn");

  return req;
});

//student login
export const logIn = async (formData) => {
  return await API.post("/student/login", formData);
};

// student signup
export const SignUp = async (formData) => {
  return await API.post("/student/signup", formData);
};

//student profile update
export const UpdateProfile = async (formData, id) => {
  return await API.put(`/student/profile/${id}`, formData);
};

//student profile update
export const UpdateProfilePic = async (formData) => {
  return await API.post(`/student/profilePic`, formData);
};

//follow one
export const followOne = async (userid, id) => {
  return await API.post(`/student/follow/${id}`, userid);
};

//get  followers data
export const getFollowers = async (id) => {
  return await API.get(`/student/getFollowers/${id}`);
};

//get  followings data
export const getFollowings = async (id) => {
  return await API.get(`/student/getFollowings/${id}`);
};

//get  friends data
export const getFriends = async (id) => {
  return await API.get(`/student/getFriends/${id}`);
};

//unfollow one
export const unFollowsOne = async (userid, id) => {
  return await API.post(`/student/unfollow/${id}`, userid);
};

//view  user profile
export const getStudentProfile = async (userid) => {
  return await API.get(`/student/viewProfile/${userid}`);
};

//expert login
export const expertLogIn = async (formData) => {
  return await API.post("/expert/login", formData);
};

// expert signup
export const expertSignUp = async (formData) => {
  return await API.post("/expert/signup", formData);
};

//expert profile update
export const expertUpdateProfile = async (formData, id) => {
  return await API.put(`/expert/profile/${id}`, formData);
};

//add new article
export const AddArticle = async (articleData) => {
  return await API.post("/article", articleData);
};

//get all article
export const GetArticles = async () => {
  return await API.get("/article");
};

//update article
export const UpdateArticle = async (data, id) => {
  return await API.put(`/article/${id}`, data);
};

//delete article
export const DeleteArticle = async (id) => {
  return await API.delete(`/article/${id}`);
};

//like an article
export const likeArticle = async (data) => {
  return await API.post("/article/like", data);
};

//dislike an article
export const unlikeArticle = async (data) => {
  return await API.post("/article/unlike", data);
};

//verify an article
export const verifyArticle = async (data) => {
  return await API.post("/article/verify", data);
};

//unverify an article
export const unverifyArticle = async (data) => {
  return await API.post("/article/unverify", data);
};

//add new comment
export const commentArticle = async (data) => {
  return await API.post("/article/comment", data);
};

//get conversation
export const getConversation = async (id) => {
  return await API.get(`/conversation/${id}`);
};

//get chat status
export const getChatStatus = async (data) => {
  return await API.post("/conversation/chat", data);
};

//create conversation
export const createConversation = async (data) => {
  return await API.post("/conversation", data);
};

//get message
export const getMessage = async (id) => {
  return await API.get(`/message/${id}`);
};

//create message
export const createMessage = async (data) => {
  return await API.post(`/message`, data);
};

//view  chat friend profile
export const getChatFriends = async (userid) => {
  return await API.get(`/student/viewProfile/${userid}`);
};

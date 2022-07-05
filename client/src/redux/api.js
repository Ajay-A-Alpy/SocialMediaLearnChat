import axios from 'axios';

const API= axios.create({baseURL:"http://localhost:5000"})

//student login
export const logIn= async  (formData)=>  await API.post("/student/login",formData);

// student signup
export const SignUp= async  (formData)=>  await API.post("/student/signup",formData);

//student profile update
export const UpdateProfile= async  (formData)=> await API.put("/student/profile",formData);

export const AddArticle=async (articleData)=> await API.post('/article',articleData);
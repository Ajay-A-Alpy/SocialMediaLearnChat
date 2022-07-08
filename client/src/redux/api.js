import axios from 'axios';

const API= axios.create({baseURL:"http://localhost:5000"})

//student login
export const logIn= async  (formData)=>  await API.post("/student/login",formData);

// student signup
export const SignUp= async  (formData)=>  await API.post("/student/signup",formData);

//student profile update
export const UpdateProfile= async  (formData,id)=> await API.put(`/student/profile/${id}`,formData);

//follow one
export const followOne= async  (userid,id)=>  await API.post(`/student/follow/${id}`,userid);


//expert login
export const expertLogIn= async  (formData)=>  await API.post("/expert/login",formData);

// expert signup
export const expertSignUp= async  (formData)=>  await API.post("/expert/signup",formData);

//expert profile update
export const expertUpdateProfile= async  (formData,id)=> await API.put(`/expert/profile/${id}`,formData);






//add new article
export const AddArticle=async (articleData)=> await API.post('/article',articleData);

//get all article
export const  GetArticles= async ()=>await API.get('/article')

//update article
export const  UpdateArticle= async (data,id)=>await API.put(`/article/${id}`,data)

//delete article
export const  DeleteArticle= async (id)=>await API.delete(`/article/${id}`)



// export const  GetMyArticles= async (id)=>await API.get(`/article/${id}`)
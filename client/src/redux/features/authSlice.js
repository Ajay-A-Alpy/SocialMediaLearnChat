import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'



export const login= createAsyncThunk("auth/login",async ({formValue,navigate,toast},{rejectWithValue})=>{
    try{
        const response= await api.logIn(formValue);
       toast.success("Login successfully");
        navigate("/student"); 
        return response.data
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
})
export const register= createAsyncThunk("auth/register",async ({formValue,navigate,toast},{rejectWithValue})=>{
    try{
        const response= await api.SignUp(formValue);
       toast.success("Account created successfully");
        navigate("/student"); 
        return response.data
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const updateProfile= createAsyncThunk("auth/updateProfile",async ({profileData,Id,navigate,toast},{rejectWithValue})=>{
    try{
        console.log("111111111111")
        const response= await api.UpdateProfile(profileData,Id);
       toast.success("Profile updated successfully");
        navigate("/student/profile"); 
        return response.data
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
})


export const followOne= createAsyncThunk("auth/follow",async ({userData,Id,navigate,toast},{rejectWithValue})=>{
    try{
        console.log("111111111111")
        console.log(userData)
        const response= await api.followOne(userData,Id);
       toast.success("started following");
        navigate("/student"); 
        return response.data
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
})



const authSlice=createSlice({
    name:"auth", // the name used in the useSelector,also in store
    initialState:{
        user:null,
        error:"",
        loading:false
    },

    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            console.log("user setting");
        },

        setLogout:(state,action)=>{
            localStorage.clear();
            state.user=null;
           
            
        }

    },

    extraReducers:{
        [login.pending]:(state,action)=>{
            state.loading=true;
        },
        [login.fulfilled]:(state,action)=>{
            state.loading=false;
           
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user=action.payload;
        },
        [login.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },

        [register.pending]:(state,action)=>{
            state.loading=true;
        },
        [register.fulfilled]:(state,action)=>{
            state.loading=false;
            
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user=action.payload;
        },
        [register.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },


        [updateProfile.pending]:(state,action)=>{
            state.loading=true;
        },
        [updateProfile.fulfilled]:(state,action)=>{
            state.loading=false;
            
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
             state.user.result=action.payload;
        },
        [updateProfile.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        }

    }

})
export  const {setUser,setLogout}=authSlice.actions;

export default authSlice.reducer;
import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function useGetUserPost() {
    const [loading,setLoading] = useState(false);
    const {setPosts,authUser} = useAuthContext();
   const getUserPosts = async ()=>{
     setLoading(true);
     try {
         const res = await fetch(`/api/post/user/${authUser.username}`);
         const data = await res.json();
         if(data.error)  throw new Error(data.error);
         setPosts(data);
     } catch (error) {
         toast.error(error.message);
     }finally{
         setLoading(false);
     }
   }
   return {loading,getUserPosts};
}

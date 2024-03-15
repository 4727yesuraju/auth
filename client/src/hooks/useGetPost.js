import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

export default function useGetPost(postId) {
    const [loading,setLoading] = useState(false);
     const {setPost} = useAuthContext();
    const getPost = async (postId)=>{
      setLoading(true);
      try {
          const res = await fetch(`/api/post/getpost/${postId}`);
          const data = await res.json();
          if(data.error)  throw new Error(data.error);
          setPost(data);
      } catch (error) {
          toast.error(error.message);
      }finally{
          setLoading(false);
      }
    }
    return {loading,getPost};
}

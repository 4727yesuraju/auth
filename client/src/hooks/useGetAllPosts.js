import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

export default function useGetAllPosts() {
    const [loading,setLoading] = useState(false);
     const {setPosts} = useAuthContext();
    const getAllPosts = async ()=>{
      setLoading(true);
      try {
          const res = await fetch('/api/post/getall');
          const data = await res.json();
          if(data.error)  throw new Error(data.error);
          setPosts(data);
      } catch (error) {
          toast.error(error.message);
      }finally{
          setLoading(false);
      }
    }
    return {loading,getAllPosts};
}

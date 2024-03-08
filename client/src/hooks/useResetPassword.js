import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useResetPassword() {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async (password,token)=>{
    if(!password) return ;
    setLoading(true);
    try {
        const res = await fetch(`/api/auth/reset-password/${token}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({password})
        })
        const data = await res.json();
        if(data.error)  throw new Error(data.error);
        toast.success("password reset success");
        navigate('/login');
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }
  return {loading,resetPassword};
}


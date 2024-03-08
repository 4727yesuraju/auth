import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useForgotPassword() {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const forgotPassword = async (email)=>{
    if(!email) return ;
    setLoading(true);
    try {
        const res = await fetch('/api/auth/forgot-password',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email})
        })
        const data = await res.json();
        if(data.error)  throw new Error(data.error);
        toast.success("check email..");
        navigate('/login');
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }
  return {loading,forgotPassword};
}

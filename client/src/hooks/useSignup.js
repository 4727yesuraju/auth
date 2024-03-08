import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {

    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();


    const signup = async ({username,email,password})  =>{
        const success = handleInputErrors({username,email,password});
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch(" /api/auth/signup",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body:JSON.stringify({username,email,password})
            })
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,signup}
}

function handleInputErrors({username,email,password,}){
    if(!username || !email || !password){
        toast.error("please fill in all fields");
        return false;
    }
    return true;
}

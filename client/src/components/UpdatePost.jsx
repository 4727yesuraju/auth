import React, { useState } from 'react';
import ReactTimeAgo from "react-time-ago";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useAuthContext } from '../context/AuthContext';
import { TfiComments } from "react-icons/tfi";
import useGetAllPosts from '../hooks/useGetAllPosts';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import useGetUserPost from '../hooks/useGetUserPost';
import { MdDelete } from "react-icons/md";

export default function UpdatePost({post}) {
    const [show,setShow] = useState(false);
    const {authUser} = useAuthContext();
    const [liked,setLiked] = useState(post?.likes.includes(authUser._id));
    const {loading,getUserPosts} =  useGetUserPost();

    async function handlePost(id){
        console.log("hia")
        const res = await fetch(`api/post/like/${id}`,{
            method:"PUT"
        });
        const data = await res.json();
        setLiked(data.state);
        getUserPosts();
        
    }

    async function handleEditPost(id){
        const text = prompt("enter a new description");
        if(!text || !text.length){
            alert("enter description");
            return
        }
        try {
            const res = await fetch(`api/post/update/${id}`,{
                method:"PUT",
                headers : {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({text})
            });
            const data = await res.json();
            console.log(data);
            getUserPosts();
        } catch (error) {
            console.log(error.message);
        }
        console.log(text);
    }

    async function handleDeletePost(id){    
        if(!confirm("ok to delete")) return ;
        try {
            const res = await fetch(`api/post/delete/${id}`,{
                method:"DELETE"});
            getUserPosts();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleComment(id){
        const comment = prompt("enter a new description");
        if(!comment || !comment.length){
            alert("enter description");
            return
        }
        try {
            const res = await fetch(`/api/post/comment/${id}`,{
                method:"put",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({text:comment})
            });
            const data = await res.json();
            console.log(data);
            getUserPosts();
        } catch (error) {
            console.log(error.message);
        }        
    }
    
  return (
    <div className="border-black border-[1px] p-2 rounded-lg mb-2 flex flex-col justify-center items-center">
            <div className="text-xs w-[90%] flex justify-between">
                <div>
                    <pre>created by : {post.username}</pre>
                    <ReactTimeAgo date={post.createdAt} locale='en-US' />
                </div>
                <div className="flex gap-3">
                    <div onClick={()=>handleEditPost(post._id)}><FaEdit /> </div>
                    <div onClick={()=>handleDeletePost(post._id)}><MdDelete /></div>
                </div>
            </div>
            <div className="w-[90%] mb-1">
                <p>{post.text}</p>
            </div>
           
            <div className="w-[90%] p-2 flex gap-3 items-center">
                <button onClick={()=>{handlePost(post._id)}} className="flex items-center gap-2">
                    {liked ? <FcLike /> :<FcLikePlaceholder />}
                    {post.likes.length}
                </button>
                <button onClick={()=>{handleComment(post._id)}}>
                   <TfiComments />
                </button>
                <p>{post.replies.length} {post.replies.length ===1 ? "comment" : "comments"}</p>
                <button onClick={()=>setShow(!show)}>{!show ? "show comments" : "hide comments "}</button>
            </div>
            <div className="w-[90%]">
                {show && <div className="w=[100%]">
                    {
                        post?.replies?.map((comment)=>{
                            return <div className="w-[100%]">
                                     <span className="text-[10px]">{comment.username}</span>
                                     <p className="pl-1 text-[20px]">{comment.text}</p>
                                </div>
                        })
                    }
                    </div>}
            </div>
    </div>
  )
}

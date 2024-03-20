import React, { useState } from 'react';
import ReactTimeAgo from "react-time-ago";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useAuthContext } from '../context/AuthContext';
import { TfiComments } from "react-icons/tfi";
import useGetAllPosts from '../hooks/useGetAllPosts';
import { Link } from 'react-router-dom';

export default function Post({post}) {
    const {authUser} = useAuthContext();
    const {getAllPosts} = useGetAllPosts();
    const [liked,setLiked] = useState(post.likes.includes(authUser._id));
    const [show,setShow] = useState(false);
    async function handlePost(id){
        try {
            const res = await fetch(`api/post/like/${id}`,{
                method:"PUT"
            });
            const data = await res.json();
            setLiked(data.state);
            getAllPosts();
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
            getAllPosts();
        } catch (error) {
            console.log(error.message);
        }        
    }
  return (
    <div className="border-black border-[1px] p-2 rounded-lg mb-2 flex flex-col justify-center items-center">
        
            <div className="text-xs w-[90%]">
                <pre>created by : {post.username}</pre>
                <ReactTimeAgo date={post.createdAt} locale='en-US' />
            </div>
            <Link className="w-[90%] mb-1" to={`/${post._id}`}>
                <p>{post.text}</p>
            </Link>
            
            <div className="w-[90%] p-2 flex gap-5 items-center">
                <button  onClick={()=>{handlePost(post._id)}} className="flex items-center gap-2">
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
                        post?.replies?.map((comment,id)=>{
                            return <div className="w-[100%]" key={id}>
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

import React, { useEffect, useState } from 'react';
import ReactTimeAgo from "react-time-ago";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useAuthContext } from '../context/AuthContext';
import { TfiComments } from "react-icons/tfi";
import useGetAllPosts from '../hooks/useGetAllPosts';
import { Link, useParams } from 'react-router-dom';
import useGetPost from '../hooks/useGetPost';

export default function PostPage() {
    const [show,setShow] = useState(false);
    const {authUser,post} = useAuthContext();
    const {getAllPosts} = useGetAllPosts();
    const {postId} = useParams()
    const {loading,getPost} = useGetPost();
    const [liked,setLiked] = useState(post?.likes?.includes(authUser._id));
    useEffect(()=>{
        getPost(postId);
        setLiked(post?.likes?.includes(authUser._id))
    },[post,liked,setLiked])

    async function handlePost(id){
        const res = await fetch(`api/post/like/${id}`,{
            method:"PUT"
        });
        const data = await res.json();
        setLiked(data.state);
        getAllPosts();  
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
            getPost(postId);
        } catch (error) {
            console.log(error.message);
        }        
    }

  return (
    <div className="border-black border-[1px] p-2 rounded-lg mb-2 mt-2 flex flex-col justify-center items-center">
        
            <div className="text-xs w-[90%] flex justify-between pr-4">
                <div className="">
                    <pre>created by : {post.username}</pre>
                    <ReactTimeAgo date={post.createdAt || Date.now()} locale='en-US' />
                </div>
                <Link to="/" className="text-lg text-blue-400 underline">move to posts</Link>
            </div>
            <div className="w-[90%] mb-1">
                <p>{post.text}</p>
            </div>
            <div className="w-[90%] p-2 flex gap-3 items-center">
                <button onClick={()=>{handlePost(post._id)}}  className="flex items-center gap-2">
                    {liked ? <FcLike /> :<FcLikePlaceholder />}
                    {post?.likes?.length}
                </button>
                <button onClick={()=>{handleComment(post._id)}}>
                   <TfiComments />
                </button>
                <p>{post?.replies?.length} {post?.replies?.length ===1 ? "comment" : "comments"}</p>
                <button onClick={()=>setShow(!show)}>{!show ? "show comments" : "hide comments "}</button>
            </div>
            <div className="w-[90%]">
                {show && <div className="w=[100%] overflow-scroll h-[500px] border-2 p-3">
                    {console.log(post.replies)}
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

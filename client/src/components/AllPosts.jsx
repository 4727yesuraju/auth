import React, { useEffect } from 'react'
import useGetAllPosts from '../hooks/useGetAllPosts';
import { useAuthContext } from '../context/AuthContext';
import Post from './Post';
import { Link } from 'react-router-dom';

export default function AllPosts() {
    const {loading,getAllPosts} = useGetAllPosts();
    const {posts,setPosts} = useAuthContext();
    const {setGetUserPosts} = useAuthContext();

    useEffect(()=>{
         getAllPosts();
    },[])
  return (
    <div className="w-[90%] p-2 overflow-scroll">
        <div className="flex justify-between p-2 pb-4">
            <h1>posts</h1>
            <button onClick={()=>setGetUserPosts(true)}>get user posts</button>
        </div>
        {
            posts.map((post)=>{
                return <Post post={post} key={post._id}/>
            })
        }
    </div>
  )
}

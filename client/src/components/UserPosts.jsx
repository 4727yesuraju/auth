import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import useGetUserPost from '../hooks/useGetUserPost';
import UpdatePost from './UpdatePost';

export default function UserPosts() {
    const {setGetUserPosts,posts,authUser} = useAuthContext();
    const {loading,getUserPosts} =  useGetUserPost();
    useEffect(()=>{
        getUserPosts();
    },[]);

    async function handleCreatePost(){
      const text = prompt("enter a new description");
      if(!text || !text.length){
          alert("enter description");
          return
      }
       try {
        const res = await fetch(`/api/post/create`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({text,postedBy:authUser._id})
        });
        const data = await res.json();
        getUserPosts();
       } catch (error) {
         console.log(error.message);
       }

    }
  return (
    <div className="w-[90%] p-2 overflow-scroll">
         <div className="flex justify-between p-2 pb-4 items-center">
            <h1>User posts</h1>
            <button className="border-2 p-2 pl-5 pr-5 rounded-lg bg-[aqua] hover:opacity-65" onClick={handleCreatePost}>create post</button>
            <button onClick={()=>setGetUserPosts(false)}>get all posts</button>

        </div>
        {
          posts.map((post)=>{
            return <UpdatePost post = {post} key={post._id}/>
          })
        }
    </div>
  )
}

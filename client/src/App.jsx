import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/Signup"

import {Navigate, Route, Routes} from 'react-router-dom'
import {useAuthContext } from "./context/AuthContext"
import { ForgotPassword } from "./pages/ForgotPassword"
import { ResetPassword } from "./pages/ResetPassword"
import AllPosts from "./components/AllPosts"
import UserPosts from "./components/UserPosts"
import PostPage from "./pages/PostPage"

function App() {
  const {authUser,getUserPosts} = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div><Toaster/></div>
      <Routes>
        <Route path='/' element={<Home />} >
           <Route path="/" element={getUserPosts ? <UserPosts /> : <AllPosts />} />
           <Route path='/:postId' element={<PostPage />} />
        </Route>
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/forgot-password' element={authUser ? <Navigate to='/' /> : <ForgotPassword />} />
        <Route path='/reset-password/:token' element={authUser ? <Navigate to='/' /> : <ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App

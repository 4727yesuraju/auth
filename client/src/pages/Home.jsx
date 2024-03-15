import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AllPosts from "../components/AllPosts";
import UserPosts from "../components/UserPosts";
import { useAuthContext } from "../context/AuthContext";
import { Logout } from "./Logout";


const Home = () => {
	const {authUser,getUserPosts} = useAuthContext();
	return (
		authUser ? 
		<div className=' h-[100%] w-[800px]'>
			<div className="flex justify-between items-center p-4  border-b-2 border-black">
				<h2>hello {authUser.username}</h2>
				<Logout />
			</div>
			<Outlet />
			{/*  */}
		</div> : 
		<Navigate to="/login" />
		
	);
};
export default Home;
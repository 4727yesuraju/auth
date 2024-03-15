import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("auth-user")) || null);
	const [posts,setPosts] = useState([]);
	const [post,setPost] = useState({});
	const [getUserPosts,setGetUserPosts] = useState(false);

	return <AuthContext.Provider value={{ authUser, setAuthUser,posts,setPosts,getUserPosts,setGetUserPosts,post,setPost }}>{children}</AuthContext.Provider>;
};
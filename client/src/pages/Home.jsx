import { useAuthContext } from "../context/AuthContext";
import { Logout } from "./Logout";


const Home = () => {
	const {authUser} = useAuthContext();
	console.log(authUser);
	return (
		<div className=''>
			<h2>hello {authUser.username}</h2>
			<Logout />
		</div>
	);
};
export default Home;
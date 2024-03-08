import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

export const SignUp = () => {
	const [inputs,setInputs] = useState({
		username:"",
		email:"",
		password:""
	})

	const {loading,signup} = useSignup();



	async function handleSubmit(e){
      e.preventDefault();
	  console.log(inputs);
	  await signup(inputs);
	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto text-white bg-[#fff]'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up 
				</h1>

				<form className="text-white" onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>User Name</span>
						</label>
						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' value={inputs.username} 
						onChange = {e=>setInputs({...inputs,username : e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text '>Email</span>
						</label>
						<input type='email' placeholder='johndoe' className='w-full input input-bordered h-10' 
						value={inputs.email} 
						onChange = {e=>setInputs({...inputs,email : e.target.value })}/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text '>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password} 
							onChange = {e=>setInputs({...inputs,password : e.target.value })}
						/>
					</div>


					<Link to="/login" className='text-black text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
						Already have an account?
					</Link>

					<div>
						<button disabled={loading} className='btn btn-block btn-sm mt-2 border border-slate-700'>
							{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};





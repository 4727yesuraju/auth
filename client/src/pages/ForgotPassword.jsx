import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import useForgotPassword from '../hooks/useForgotPassword';

 export const ForgotPassword = () => {
	const [email,setEmail] = useState("");

	const {loading,forgotPassword} = useForgotPassword()

	async function handleSubmit(e){
         e.preventDefault();
		 await forgotPassword(email);
	}
  	return (
  		<div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-white'>
  			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
  				<h1 className='text-3xl font-semibold text-center text-gray-300'>
  					Forgot Password
  				</h1>
  
  				<form onSubmit={handleSubmit}>

  
  					<div>
  						<label className='label'>
  							<span className='text-base label-text'>email</span>
  						</label>
  						<input
  							type='email'
  							placeholder='Enter Email'
  							className='w-full input input-bordered h-10'
							value={email}
							onChange={e=>setEmail(e.target.value)}
  						/>
  					</div>

  
  					<div>
  						<button disabled={loading} className='btn btn-block btn-sm mt-2 '>
							{loading ? <span className="loading loading-spinner"></span> : "send" }
						</button>
  					</div>
  				</form>
  			</div>
  		</div>
  	);
  };
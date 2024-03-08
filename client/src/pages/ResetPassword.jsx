import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useResetPassword from '../hooks/useResetPassword';

 export const ResetPassword = () => {
    const {token} = useParams();
	const [password,setPassword] = useState("");

	const {loading,resetPassword} = useResetPassword()
	async function handleSubmit(e){
         e.preventDefault();
		 await resetPassword(password,token);
	}
  	return (
  		<div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-white'>
  			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
  				<h1 className='text-3xl font-semibold text-center text-gray-300'>
  					reset password
  				</h1>
  
  				<form onSubmit={handleSubmit}>
  					<div>
  						<label className='label'>
  							<span className='text-base label-text'>Password</span>
  						</label>
  						<input
  							type='password'
  							placeholder='Enter Password'
  							className='w-full input input-bordered h-10'
							value={password}
							onChange={e=>setPassword(e.target.value)}
  						/>
  					</div>
  					
  
  					<div>
  						<button disabled={loading} className='btn btn-block btn-sm mt-2 '>
							{loading ? <span className="loading loading-spinner"></span> : "reset   " }
						</button>
  					</div>
  				</form>
  			</div>
  		</div>
  	);
  };
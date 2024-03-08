import React from 'react'
import useLogout from '../hooks/useLogout';

export const Logout = () => {
    const {loading,logout} = useLogout()
	async function handleClick(){
		 await logout();
	}
  return (
    <div>
        <button onClick={handleClick} disabled={loading} className='btn btn-block btn-sm mt-2 '>
            {loading ? <span className="loading loading-spinner"></span> : "Logout" }
        </button>
  	</div>
  )
}

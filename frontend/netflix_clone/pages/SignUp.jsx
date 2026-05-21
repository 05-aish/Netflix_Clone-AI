import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import { useAuthStore } from '../stores/authStore';
const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp, loading, error} = useAuthStore();

  

  const handleSignUp = async (e) => {
    e.preventDefault(); 

    try {
      await signUp(username, email, password);
      // navigate to homepage
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div 
        className='min-h-screen bg-cover bg-center bg-no-repeat md:px-8 py-2'
        style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/background_banner.jpg')"
      }}>

      <nav className='w-full flex justify-between items-center border-b border-gray-500'>
        <Link to={"/"}>
            <img src="/logo.png" alt="Netflix Logo" className='w-[100px] h-[50px] md:w-[120px] md:h-[80] cursor-pointer shrink-0 brightness-125 mb-2'/>
        </Link>
      </nav>
      

        <div className='max-w-[450px] bg-black/75 rounded-xl w-full px-8 py-10 mx-auto mt-8'>

          <h1 className='text-3xl font-semibold text-white mb-2'>Enter your info to sign in</h1>
          <p className='text-xl text-gray-400 mb-4'>Or get started with a new account.</p>

          <form className='flex flex-col' onSubmit={handleSignUp}>
            <input 
              className="w-full h-[50px] bg-[#141414] text-white border-[0.25px] border-gray-400 rounded px-5 mb-3" 
              type="text" 
              placeholder="John Doe" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              
            />

            <input 
              className="w-full h-[50px] bg-[#141414] text-white border-[0.25px] border-gray-400 rounded px-5 mb-3" 
              type="email" 
              placeholder="johndoe@gmail.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}               
            />

            <input 
              className="w-full h-[50px] bg-[#141414] border-[0.25px] border-gray-400 text-white rounded px-5 mb-3" type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}  
            />

            {error && <p className='text-red-500 text-sm'>{error}</p>}
            
            <button type="submit" disabled={loading} className='font-semibold text-white text-xl bg-red-600 px-2 py-2 rounded hover:opacity-90 cursor-pointer mb-4'>
              Sign Up
            </button>
          </form>
          <p>
            <span className='text-gray-400 font-light text-sm'>Already have an account? </span>
            <span className='text-white font-light cursor-pointer text-sm ml-2 hover:underline' onClick={() => {navigate("/signin")}}>Sign In!</span>
          </p>  
        </div>
    </div>
    </div>
  );
}

export default SignUp;
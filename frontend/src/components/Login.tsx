import { useState } from 'react';
import { AuthService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    authService:AuthService,
    setUserNameCallbackFunc: (username:string) => void

}
const Login: React.FC<LoginProps> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit =  async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here
    const loginResponse= await props.authService.login(username, password);
    if(loginResponse){
        const name= props.authService.getProfileName()
        if (name){
            props.setUserNameCallbackFunc(name);
        }
        navigate('/profile');
    }
    console.log('Login submitted:', username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-64 p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;

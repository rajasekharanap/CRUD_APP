import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";


const Login = ( )=> {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');
    
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
  
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
            console.log(response.data);

            const { user, accessToken, email, is_staff } = response.data;
            login ( user, accessToken, email );

            alert('Login Successful');
            setMessage('Login Successful');
            if (is_staff === true) {
                navigate('/admin')
            } else {
                navigate('/home');
            }
        } catch (error) {
            setMessage('Invalid Credentials');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <div className="login-input-group">
                    <label>Username</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div className="login-input-group">
                    <label>Password</label>
                    <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
            {message && <p className="login-message">{message}</p>}
        </div>
        
    );
};

export default Login;
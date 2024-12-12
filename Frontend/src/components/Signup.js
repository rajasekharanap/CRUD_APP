import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();
    
    const handleSignup = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/register/',{
                username,
                password,
                email,
            });
            setMessage('Registration Successful');
            alert('Success')
            
            useEffect(() => {
                const timeoutId = setTimeout(() => {
                    navigate('/')
                }, 2000);

                return () => {
                    clearTimeout(timeoutId);
                };
            }, []);
            
        } catch (error) {
            if (error.response && error.response.data) {
                const backendErrors = error.response.data;
                let formattedErrors = [];
                for (let field in backendErrors) {
                    const fieldErrors = backendErrors[field].join(', '); 
                    formattedErrors.push(`${field}: ${fieldErrors}`);
                }
                const errorMessage = formattedErrors.join(' | ');
                setMessage(errorMessage); 
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup} className="signup-form">
                <div className="signup-element">
                    <label>Username:</label>
                    <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div className="signup-element">
                    <label>Email:</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="signup-element">
                    <label>PassWord:</label>
                    <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button 
                type="submit"
                className="signup-button">
                    Register
                </button>
            </form>
            { message && <p className="singup-message">{message }</p>}
        </div>
    );
};

export default Signup;
import { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";


const Create = () => {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ status ] = useState('Active');

    const handleCreate = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("accessToken"); 
        if (!token) {
            alert("User is not authenticated");
            return;
        }
    
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/create/",
                { username, password, email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (res.status === 201) {
                setUsername('');
                setPassword('');
                setEmail('');
                navigate('/admin');
            } else {
                alert(res.data.message || "An error occurred");
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Ensure you are logged in and try again.");
        }
    };
    
    
    return (
        <div className="create-user-container">
            <h1>Create New User</h1>
            <form onSubmit={handleCreate} className="create-user-form">
                <label>Username:</label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <label>Password:</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <label>email:</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button type="submit" className="create-user-button">Create User</button>
            </form>
            <p>Status: {status}</p>
        </div>
    );
};

export default Create;
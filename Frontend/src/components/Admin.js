import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem('accessToken');
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const Admin = () => {
    const navigate = useNavigate();
    const [ users, setUsers ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        async function fetchdata() {
            try {
                const userList = await axiosInstance.get('users-list/');
                setUsers(userList.data);
        } catch(error) {
            console.log(error);
        }
        }
        fetchdata()
    }, []);

    const toggleActiveStatus = async (userId) => {
        try {
            await axiosInstance.get(`block/${userId}/`);
            const userList = await axiosInstance.get('users-list/');
            setUsers(userList.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`delete-user/${userId}/`);
            const userList = await axiosInstance.get('users-list/');
            setUsers(userList.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        axiosInstance.post(`logout/`);
        localStorage.removeItem('accessToken');
        navigate('/'); 
    };

    const filteredUsers = users.filter(
        (user) => 
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    return (
        <div className="admin-container">
            <h1>Admin Management</h1>
            <div className="admin-header">
                <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
                />
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
                <button className="add-user-button" onClick={() => navigate('/create')}>Create User</button>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => toggleActiveStatus(user.id)}
                                    className={user.is_active ? 'active-button' : 'inactive button'}>
                                    { user.is_active ? 'Active' : 'Inactive'}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deleteUser(user.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="logo"><Link to="/">CRUD</Link></div>
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </div>
    );
};

export default Header;
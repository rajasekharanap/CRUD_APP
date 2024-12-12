import { useContext } from "react";
import { UserContext } from "../UserContext";


const Home = () => {
    const { user } = useContext(UserContext);
    const { email } = useContext(UserContext);

    if (!user) {
        return <p>No user allocated</p>
    }

    return (
        <div>
            <h2>Welcome {user}</h2>
            <p>Email: {email}</p>
        </div>
    );
};

export default Home;
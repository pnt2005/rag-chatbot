import { Link, useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login"); 
    };

    return (
        <>
            <button onClick={handleLogout}>Log out</button>
        </>
    )
}

export default Logout
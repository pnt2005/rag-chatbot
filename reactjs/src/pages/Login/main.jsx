import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/request";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fetchApi = async () => {
            const user = {
                email: email,
                password: password
            }
            const result = await login("login", user)
            localStorage.setItem("token", result.token)
        }

        await fetchApi()
        navigate("/chat")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-96 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Login
                    </button>
                </form>
                <Link to="/signup">Don't have account yet, sign up</Link>
            </div>
        </div>
    );
}

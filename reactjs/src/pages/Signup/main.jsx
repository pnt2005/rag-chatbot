import { useState } from "react";
import { signup } from "../../utils/request";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const fetchApi = async () => {
            const user = {
                email: email,
                name: name,
                password: password
            }
            const result = await signup("signup", user)
            console.log(result)
        }

        fetchApi()
        navigate(-1)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-96 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
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
                        type="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

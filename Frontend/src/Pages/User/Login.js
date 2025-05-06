import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LGIN(navigate) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const link = "http://localhost:5278/api/auth/login";

    axios.post(link, { username, password })
    .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/items");
    })
    .catch((error) => {
        console.error('Error during login:', error);
    });
}

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => { LGIN(navigate) };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 w-[300px] bg-white shadow-md p-4 rounded-2">
                <div className="flex flex-row gap-2 justify-between items-center">
                    <h2>Login</h2>
                    <a href="/" className="text-black hover:text-blue/60">Back to Home</a>
                </div>
                <input id="username" type="text" placeholder="Username" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required />
                <input id="password" type="password" placeholder="Password" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required />
                <button type="submit" className="p-2 bg-black/20 hover:bg-blue/60 rounded-2" onClick={handleLogin}>Login</button>
                <p className="text-center text-black/50">Don't have an account? <a href="/register" className="text-black hover:text-blue/60">Register</a></p>
            </div>
        </div>
    )
}

export default Login;

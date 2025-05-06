import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RG(navigate) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const link = "http://localhost:5278/api/auth/register";

    axios.post(link, { username, password, confirmPassword })
    .then((response) => {
        console.log('Registration successful:', response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/items");
    })
    .catch((error) => {
        console.error('Error during registering:', error);
    });
}

function Register() {
    const navigate = useNavigate();

    const handleRegister = async () => { RG(navigate) };

    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 w-[300px] bg-white shadow-md p-4 rounded-2">
                <div className="flex flex-row gap-2 justify-between items-center">
                    <h2>Register</h2>
                    <a href="/" className="text-black hover:text-blue/60">Back to Home</a>
                </div>
                <input id="username" type="text" placeholder="Username" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required/>
                <input id="password" type="password" placeholder="Password" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required/>
                <input id="confirmPassword" type="password" placeholder="Confirm Password" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required/>
                <button type="submit" className="p-2 bg-black/20 hover:bg-blue/60 rounded-2" onClick={{handleRegister}}>Register</button>
                <p className="text-center text-black/50">Already have an account? <a href="/login" className="text-black hover:text-blue/60">Login</a></p>
            </div>
        </div>
    )
}

export default Register;

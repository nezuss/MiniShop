import React from 'react';
import axios from 'axios';

function CheckIsAdm() {
    const [isAdmin, setIsAdmin] = React.useState(false);
    const link = "http://localhost:5278/api/check-admin";

    React.useEffect(() => {
        axios.get(link, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (response.data) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch((error) => {
                console.error('Error during checking access:', error);
            });
    }, []);

    return isAdmin;
}

function Navbar() {
    return (
        <div className="bg-black/50 p-2 flex flex-wrap justify-center items-center gap-4">
            <a className="text-white py-2 px-6 hover:bg-blue/60 rounded-2" href="/">Home</a>
            <a className="text-white py-2 px-6 hover:bg-blue/60 rounded-2" href="/items">Items</a>
            <a className="text-white py-2 px-6 hover:bg-blue/60 rounded-2" href="/cart">Cart</a>
            <a className="text-white py-2 px-6 hover:bg-blue/60 rounded-2" href="/login">Login</a>
            <a className="text-white py-2 px-6 hover:bg-blue/60 rounded-2" href="/register">Register</a>
            {CheckIsAdm() && <a className="text-white py-2 px-6 hover:bg-blue/60 rounded-2" href="/admin/dashboard">Dashboard</a>}
        </div>
    )
}

export default Navbar;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

//? Components
import Navbar from './Components/Navbar';

//? Loading pages - lazy loading
//!User
const Home = React.lazy(() => import('./Pages/User/Home'));
const Items = React.lazy(() => import('./Pages/User/Items'));
const Item = React.lazy(() => import('./Pages/User/Item'));
const Cart = React.lazy(() => import('./Pages/User/Cart'));
const Login = React.lazy(() => import('./Pages/User/Login'));
const Register = React.lazy(() => import('./Pages/User/Register'));
//!Admin
const Dashboard = React.lazy(() => import('./Pages/Admin/Dashboard'));

function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="bg-gray-100 min-h-screen">
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {/* User Routes */}
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/items" element={<Layout><Items /></Layout>} />
                        <Route path="/item/:id" element={<Layout><Item /></Layout>} />
                        <Route path="/cart" element={<Layout><Cart /></Layout>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Admin Routes */}
                        <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
                    </Routes>
                </React.Suspense>
            </div>
        </BrowserRouter>
    </React.StrictMode>
);

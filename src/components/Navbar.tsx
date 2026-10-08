import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.jpg" alt="MediSlot Logo" className="h-10 w-10 object-contain rounded-full bg-white" />
                            <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">MediSlot</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/hospitals" className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium transition-colors">Hospitals</Link>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
                            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                        {user ? (
                            <>
                                <span className="text-slate-600 dark:text-slate-300 font-medium hidden md:inline">Hello, {user.name}</span>
                                {user.role === 'Patient' && (
                                    <Link to="/patient-dashboard" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Dashboard</Link>
                                )}
                                {user.role === 'Doctor' && (
                                    <Link to="/doctor-dashboard" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Dashboard</Link>
                                )}
                                {user.role === 'Admin' && (
                                    <Link to="/admin-dashboard" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Admin</Link>
                                )}
                                <button onClick={handleLogout} className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

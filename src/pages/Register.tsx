import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'Patient' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/register', formData);
            localStorage.setItem('user', JSON.stringify(data));
            if (data.role === 'Patient') navigate('/patient-dashboard');
            else if (data.role === 'Doctor') navigate('/doctor-dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center py-12">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">Create Account</h2>
                {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Full Name</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:primary outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Email</label>
                        <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:primary outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Phone</label>
                        <input type="tel" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:primary outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Password</label>
                        <input type="password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:primary outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Role</label>
                        <select className="w-full px-4 py-2 border rounded-lg outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition mt-2">Sign Up</button>
                </form>
                <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-300">
                    Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

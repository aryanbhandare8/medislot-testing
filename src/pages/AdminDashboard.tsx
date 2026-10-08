import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Building2, Calendar as CalIcon } from 'lucide-react';
import API from '../services/api';

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        API.get('/doctors').then(res => setDoctors(res.data)).catch(console.error);
        API.get('/hospitals').then(res => setHospitals(res.data)).catch(console.error);
        
        setChartData([
            { name: 'Mon', appointments: 12 },
            { name: 'Tue', appointments: 19 },
            { name: 'Wed', appointments: 15 },
            { name: 'Thu', appointments: 22 },
            { name: 'Fri', appointments: 30 },
            { name: 'Sat', appointments: 10 },
            { name: 'Sun', appointments: 5 },
        ]);
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Admin & Analysis Dashboard</h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                    <div className="p-3 bg-blue-50 dark:bg-slate-700 text-primary dark:text-blue-400 rounded-lg"><Users /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Registered Doctors</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{doctors.length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                    <div className="p-3 bg-green-50 dark:bg-slate-700 text-green-600 dark:text-green-400 rounded-lg"><Building2 /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Active Hospitals</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{hospitals.length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                    <div className="p-3 bg-purple-50 dark:bg-slate-700 text-purple-600 dark:text-purple-400 rounded-lg"><CalIcon /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Weekly Appointments</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">113</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Doctor Management</h2>
                    <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                        {doctors.map(d => (
                            <li key={d.id} className="py-3 text-slate-600 dark:text-slate-300">
                                <strong>Dr. {d.name}</strong> - {d.specialty}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Hospital Management</h2>
                    <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                        {hospitals.map(h => (
                            <li key={h.id} className="py-3 text-slate-600 dark:text-slate-300">
                                <strong>{h.name}</strong> - {h.address}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Weekly Appointment Analysis</h2>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} />
                            <Bar dataKey="appointments" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

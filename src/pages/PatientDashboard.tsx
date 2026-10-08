import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Calendar, Clock, Activity, FileText } from 'lucide-react';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    useEffect(() => {
        if (user) {
            API.get('/appointments/patient').then(res => setAppointments(res.data)).catch(console.error);
        }
    }, [user]);

    const upcoming = appointments.filter(a => a.status === 'Scheduled' || a.status === 'Delayed');

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Patient Dashboard & Profile</h1>
            
            {/* Patient Profile Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 transition-colors">
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
                    {user?.name?.charAt(0) || 'P'}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{user?.name}</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-1">{user?.email}</p>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Patient Account</span>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Registered</p>
                    <p className="font-medium text-slate-800 dark:text-white">Oct 2026</p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Dashboard Overview</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                    <div className="p-3 bg-blue-50 dark:bg-slate-700 text-primary dark:text-blue-400 rounded-lg"><Calendar /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Upcoming</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{upcoming.length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                    <div className="p-3 bg-green-50 dark:bg-slate-700 text-green-600 dark:text-green-400 rounded-lg"><FileText /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Appointments</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{appointments.length}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <Link to="/book-appointment" className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                    Book New Appointment
                </Link>
            </div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Your Appointments</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                {appointments.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">No appointments found.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {appointments.map(app => (
                            <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-slate-50 dark:bg-slate-900">
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">Dr. {app.doctor_name}</h3>
                                    <p className="text-slate-600 dark:text-slate-300">{app.specialty} • {app.hospital_name}</p>
                                    <div className="flex gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {app.appointment_date.split('T')[0]}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {app.appointment_time}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${app.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : app.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700 dark:text-slate-200'}`}>
                                        {app.status}
                                    </span>
                                    <p className="font-bold text-slate-700 dark:text-slate-200">Token: {app.token_number}</p>
                                    {app.status === 'Scheduled' && (
                                        <Link to="/queue-tracking" className="text-sm text-primary font-medium hover:underline">Track Live Queue</Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;

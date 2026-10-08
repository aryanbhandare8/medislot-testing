import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Users, CheckCircle, Activity } from 'lucide-react';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState<any[]>([]);

    const fetchAppointments = () => {
        API.get('/appointments/doctor').then(res => setAppointments(res.data)).catch(console.error);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCallNext = async (id: number) => {
        try {
            await API.put(`/appointments/queue/${id}`, { status: 'In Consultation' });
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    const handleComplete = async (id: number) => {
        try {
            await API.put(`/appointments/queue/${id}`, { status: 'Completed' });
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    const waiting = appointments.filter(a => a.status !== 'Completed');

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Doctor Dashboard</h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-primary rounded-lg"><Users /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Today</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{appointments.length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Completed</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{appointments.length - waiting.length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><Activity /></div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Waiting</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{waiting.length}</p>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Today's Queue</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {appointments.map(app => (
                        <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-lg">{app.patient_name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Token: {app.token_number} | Time: {app.appointment_time}</p>
                                <p className="text-sm mt-1">Status: <span className="font-medium text-primary">{app.live_queue_status || app.status}</span></p>
                            </div>
                            <div className="flex gap-3">
                                {app.status !== 'Completed' && app.live_queue_status !== 'In Consultation' && (
                                    <button onClick={() => handleCallNext(app.id)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Call Patient</button>
                                )}
                                {app.live_queue_status === 'In Consultation' && (
                                    <button onClick={() => handleComplete(app.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">Mark Completed</button>
                                )}
                            </div>
                        </div>
                    ))}
                    {appointments.length === 0 && <div className="p-8 text-center text-slate-500 dark:text-slate-400">No appointments today.</div>}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;

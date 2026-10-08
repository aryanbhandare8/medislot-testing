import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Activity } from 'lucide-react';

const QueueTracking = () => {
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const fetchAppointments = () => {
            API.get('/appointments/patient').then(res => setAppointments(res.data)).catch(console.error);
        };
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 5000); // poll every 5s
        return () => clearInterval(interval);
    }, []);

    const activeApp = appointments.find(a => a.status === 'Scheduled' || a.status === 'Delayed');

    if (!activeApp) {
        return <div className="p-8 text-center text-slate-500 dark:text-slate-400">No active queue to track.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2"><Activity className="text-primary"/> Live Queue Tracker</h1>
            
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-8 text-center">
                <div className="inline-block bg-blue-50 text-primary font-bold text-5xl px-8 py-4 rounded-2xl mb-4">
                    {activeApp.token_number}
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Your Token Number</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Queue Status</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{activeApp.live_queue_status || 'Waiting'}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Your Position</p>
                    <p className="text-2xl font-bold text-primary">#{activeApp.live_queue_position || activeApp.queue_position}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Est. Consultation</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{activeApp.estimated_time}</p>
                </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <div className="mt-1"><Activity className="w-5 h-5 text-primary" /></div>
                <p className="text-sm text-slate-700 dark:text-slate-200">Please remain in the waiting area. You will be notified when the doctor is ready to see you. The queue updates in real-time.</p>
            </div>
        </div>
    );
};

export default QueueTracking;

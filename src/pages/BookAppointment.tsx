import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const BookAppointment = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [selectedDoc, setSelectedDoc] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/doctors').then(res => setDoctors(res.data)).catch(console.error);
    }, []);

    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const doc = doctors.find(d => d.id === parseInt(selectedDoc));
            await API.post('/appointments', {
                doctor_id: doc.id,
                hospital_id: doc.hospital_id,
                appointment_date: date,
                appointment_time: time
            });
            navigate('/patient-dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to book appointment');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Book an Appointment</h1>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <form onSubmit={handleBook} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Select Doctor</label>
                        <select required className="w-full px-4 py-2 border rounded-lg" value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}>
                            <option value="">-- Choose a Doctor --</option>
                            {doctors.map(d => (
                                <option key={d.id} value={d.id}>Dr. {d.name} ({d.specialty}) - {d.hospital_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Appointment Date</label>
                        <input type="date" required className="w-full px-4 py-2 border rounded-lg" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Time Slot</label>
                        <select required className="w-full px-4 py-2 border rounded-lg" value={time} onChange={e => setTime(e.target.value)}>
                            <option value="">-- Choose Time --</option>
                            <option value="09:00:00">09:00 AM</option>
                            <option value="10:00:00">10:00 AM</option>
                            <option value="11:00:00">11:00 AM</option>
                            <option value="14:00:00">02:00 PM</option>
                            <option value="16:00:00">04:00 PM</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;

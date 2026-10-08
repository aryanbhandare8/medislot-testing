import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CalendarCheck, Bell, Activity } from 'lucide-react';

const Landing = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-blue-50 dark:bg-slate-900/50 py-20 px-4 transition-colors">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">
                        Book Your Time, <span className="text-primary dark:text-blue-400">Skip the Line</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto transition-colors">
                        Smart Appointments. Zero Waiting. MediSlot revolutionizes the healthcare experience by providing real-time queue tracking and smart scheduling.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/register" className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                            Book an Appointment
                        </Link>
                        <Link to="/login" className="bg-white dark:bg-slate-800 text-primary dark:text-blue-400 border border-primary dark:border-blue-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition shadow-sm">
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-20 px-4 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-800 dark:text-white transition-colors">Why choose MediSlot?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all">
                            <CalendarCheck className="w-12 h-12 text-primary dark:text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Easy Booking</h3>
                            <p className="text-slate-600 dark:text-slate-300">Select suitable time slots with your preferred doctors seamlessly.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all">
                            <Clock className="w-12 h-12 text-primary dark:text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Live Queue</h3>
                            <p className="text-slate-600 dark:text-slate-300">Track your exact queue position and estimated consultation time.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all">
                            <Bell className="w-12 h-12 text-primary dark:text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Delay Alerts</h3>
                            <p className="text-slate-600 dark:text-slate-300">Get instantly notified if the doctor is running behind schedule.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all">
                            <Activity className="w-12 h-12 text-primary dark:text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Digital Records</h3>
                            <p className="text-slate-600 dark:text-slate-300">Access your digital prescriptions and appointment history anytime.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;

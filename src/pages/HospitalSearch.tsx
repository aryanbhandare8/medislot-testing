import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Building2, Search, MapPin } from 'lucide-react';

const HospitalSearch = () => {
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        API.get('/hospitals').then(res => setHospitals(res.data)).catch(console.error);
    }, []);

    const filtered = hospitals.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.address.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Hospital Directory</h1>
            <div className="mb-8 relative">
                <Search className="absolute left-4 top-3 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search by hospital name or location..." 
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {filtered.map(hospital => (
                    <div key={hospital.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4 transition-colors">
                        <div className="p-4 bg-blue-50 dark:bg-slate-700 text-primary dark:text-blue-400 rounded-xl h-fit">
                            <Building2 className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{hospital.name}</h2>
                            <p className="text-slate-600 dark:text-slate-400 flex items-start gap-1 text-sm mb-2">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {hospital.address}
                            </p>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">📞 {hospital.phone}</p>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">🚨 Emergency: {hospital.emergency_contact}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">🕒 Hours: {hospital.opening_hours}</p>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && <p className="text-center text-slate-500 py-12">No hospitals found.</p>}
        </div>
    );
};

export default HospitalSearch;

const fs = require('fs');
const path = require('path');

const filesToFix = [
    'src/pages/Login.tsx',
    'src/pages/Register.tsx',
    'src/pages/BookAppointment.tsx',
    'src/pages/HospitalSearch.tsx'
];

filesToFix.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find generic inputs and selects and add standard dark mode styling
    // We want to add: bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white
    
    // Let's just find `className="w-full ` or `className="w-full px-4` and replace it properly.
    // To be safe, I'll replace `className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"`
    
    content = content.replace(
        /className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"/g,
        'className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"'
    );
    
    content = content.replace(
        /className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary outline-none"/g,
        'className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary outline-none transition-colors"'
    );
    
    // For selects in BookAppointment
    content = content.replace(
        /className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none appearance-none"/g,
        'className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary outline-none appearance-none transition-colors"'
    );
    
    // Fix error box in Login/Register
    content = content.replace(
        /className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm"/g,
        'className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded mb-4 text-sm"'
    );
    
    fs.writeFileSync(filePath, content);
});

console.log("Input styles updated!");

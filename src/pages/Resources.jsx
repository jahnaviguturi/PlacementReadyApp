const Resources = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Study Resources</h1>
            <p className="text-slate-500">Hand-picked materials to master key concepts.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-slate-200 rounded-xl">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">Interview Playbook</h3>
                    <p className="text-slate-500 text-sm mb-4">Complete guide for cracking software engineering roles.</p>
                    <button className="text-primary text-sm font-bold border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">Download PDF</button>
                </div>
                <div className="p-6 bg-white border border-slate-200 rounded-xl">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">Cheat Sheets</h3>
                    <p className="text-slate-500 text-sm mb-4">Quick revision notes for STL, SQL, and Design Patterns.</p>
                    <button className="text-primary text-sm font-bold border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">Download Zip</button>
                </div>
            </div>
        </div>
    );
};

export default Resources;

const Practice = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Practice Problems</h1>
            <p className="text-slate-500">Sharpen your coding skills with topic-wise challenges.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Data Structures', 'Algorithms', 'System Design', 'DBMS', 'Operating Systems', 'Networking'].map((topic) => (
                    <div key={topic} className="p-6 bg-white border border-slate-200 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                        <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{topic}</h3>
                        <p className="text-sm text-slate-500 mt-1">24 problems • 3 levels</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Practice;

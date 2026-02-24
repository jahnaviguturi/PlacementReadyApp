const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900">Welcome back, Jahnavi</h1>
                <p className="text-slate-500">Pick up where you left off in your preparation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium mb-1">Weekly Goal</h3>
                    <p className="text-2xl font-bold text-slate-900">12 / 20 Tasks</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
                        <div className="bg-primary h-full w-[60%] rounded-full"></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium mb-1">Rank</h3>
                    <p className="text-2xl font-bold text-slate-900">#458</p>
                    <p className="text-green-600 text-xs mt-2 font-medium">↑ 12 positions since yesterday</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium mb-1">Problems Solved</h3>
                    <p className="text-2xl font-bold text-slate-900">142</p>
                    <p className="text-slate-500 text-xs mt-2">Targeting 500+ for Tier-1 companies</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

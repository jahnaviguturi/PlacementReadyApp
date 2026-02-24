const Profile = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Your Profile</h1>
            <p className="text-slate-500">Manage your account settings and preferences.</p>

            <div className="max-w-2xl bg-white border border-slate-200 rounded-xl p-8">
                <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
                    <div className="w-24 h-24 bg-slate-200 rounded-full"></div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Jahnavi Guturi</h2>
                        <p className="text-slate-500">jahnaviguturi@gmail.com</p>
                        <button className="mt-2 text-primary text-sm font-bold">Change Avatar</button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                            <div className="p-3 bg-slate-50 rounded border border-slate-100 text-slate-600">Jahnavi Guturi</div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Language</label>
                            <div className="p-3 bg-slate-50 rounded border border-slate-100 text-slate-600">English (US)</div>
                        </div>
                    </div>
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

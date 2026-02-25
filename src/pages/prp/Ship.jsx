import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Lock, ArrowLeft, CheckCircle2, Globe, Server, ShieldCheck } from 'lucide-react';

const Ship = () => {
    const [isLocked, setIsLocked] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            const checklist = JSON.parse(saved);
            const passedCount = Object.values(checklist).filter(v => v === true).length;
            if (passedCount === 10) {
                setIsLocked(false);
            }
        }
    }, []);

    if (isLocked) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-8">
                <div className="w-24 h-24 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <Lock size={48} className="text-rose-500" />
                </div>
                <div className="space-y-4 max-w-md">
                    <h1 className="text-4xl font-black text-white tracking-tighter italic">SHIPPING LOCKED</h1>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        Security protocol violation. You must pass all <span className="text-rose-400 font-bold">10 internal tests</span> before the deployment relay can be initialized.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/prp/07-test')}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-colors group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Return to Vetting Checklist
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8 md:p-12 font-sans overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full -mr-96 -mt-96 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full -ml-40 -mb-40 blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-1000">
                <div className="text-center space-y-4">
                    <div className="inline-flex px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">
                        All Tests Passed • Ready for Production
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Prepare for Liftoff.</h1>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        The Placement Readiness Platform has passed all heuristic validation protocols. All systems are stable and ready for public access.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatusCard icon={<Server />} label="Server Status" status="Nominal" />
                    <StatusCard icon={<Globe />} label="CDN Relay" status="Optimized" />
                    <StatusCard icon={<ShieldCheck />} label="QA Protocol" status="Certified" />
                </div>

                <div className="bg-indigo-900 p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-900/30 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-indigo-950"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110 duration-500">
                            <Rocket size={40} className="text-white" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Deployment Terminal</h2>
                            <p className="text-indigo-200 text-sm font-medium">Platform version v1.2.0 build-final</p>
                        </div>
                        <button className="bg-white text-indigo-950 px-12 py-5 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
                            INITIALIZE SHIP PROTOCOL
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/app/dashboard')}
                        className="text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors border-b-2 border-transparent hover:border-slate-200"
                    >
                        Back to Dashboard Management
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatusCard = ({ icon, label, status }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-primary transition-all">
        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-slate-900">{status}</p>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
        </div>
    </div>
);

export default Ship;

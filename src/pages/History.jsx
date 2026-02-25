import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/analyzer';
import { History as HistoryIcon, Building2, Briefcase, Calendar, ChevronRight, Search, Trash2, AlertCircle } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [showCorruptedMessage, setShowCorruptedMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadedHistory = getHistory();
        setHistory(loadedHistory);

        // Check if localStorage has more items than loaded (implies some were corrupted/filtered)
        try {
            const raw = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
            if (raw.length > loadedHistory.length) {
                setShowCorruptedMessage(true);
            }
        } catch (e) {
            setShowCorruptedMessage(true);
        }
    }, []);

    const clearHistory = () => {
        if (window.confirm('Clear all analysis history?')) {
            localStorage.removeItem('placement_prep_history');
            setHistory([]);
            setShowCorruptedMessage(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analysis History</h1>
                    <p className="text-slate-500">Review your past job simulations and preparation strategies.</p>
                </div>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="flex items-center gap-2 text-rose-500 hover:text-rose-700 font-bold text-sm transition-colors"
                    >
                        <Trash2 size={16} /> Clear All
                    </button>
                )}
            </div>

            {showCorruptedMessage && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-700 text-sm font-medium animate-in zoom-in-95 duration-300">
                    <AlertCircle size={18} />
                    One saved entry couldn't be loaded. Create a new analysis.
                </div>
            )}

            {history.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-20 text-center flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center">
                        <HistoryIcon size={32} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-800">No History Yet</h3>
                        <p className="text-slate-500 max-w-xs mx-auto text-sm">
                            Run your first job analysis to see it here and track your preparation roadmap.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/app/analyze')}
                        className="mt-4 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all text-sm"
                    >
                        Start New Analysis
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {history.map((item) => {
                        const allSkills = Object.values(item.extractedSkills || {}).flat();
                        return (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/app/results/${item.id}`)}
                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex flex-col items-center justify-center min-w-[70px] p-3 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-indigo-50 transition-colors">
                                        <span className="text-2xl font-black text-slate-800 group-hover:text-primary transition-colors">{item.finalScore || item.readinessScore || 0}%</span>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">SCORE</span>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Building2 size={14} className="text-slate-300" />
                                            <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.company || 'Direct JD Paste'}</h3>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-500">
                                            <span className="flex items-center gap-1.5"><Briefcase size={13} className="text-slate-300" /> {item.role || 'Career Analysis'}</span>
                                            <span className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-300" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1.5"><Search size={13} className="text-slate-300" /> {allSkills.length} Skills found</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-1">
                                        {allSkills.slice(0, 3).map((skill, i) => (
                                            <div key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-bold text-slate-500 uppercase">
                                                {skill}
                                            </div>
                                        ))}
                                        {allSkills.length > 3 && (
                                            <div className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold text-slate-400">
                                                +{allSkills.length - 3}
                                            </div>
                                        )}
                                    </div>
                                    <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default History;

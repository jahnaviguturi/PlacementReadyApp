import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react';

const TESTS = [
    { id: 'jd-val', label: 'JD required validation works', hint: 'Go to Analyze page and try submitting without pasting anything.' },
    { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Paste a very short sentence in the Analyze page; check for the amber warning.' },
    { id: 'skill-grp', label: 'Skills extraction groups correctly', hint: 'Analyze a JD with Java, React, and SQL. Verify they appear in their respective categories.' },
    { id: 'round-map', label: 'Round mapping changes based on company + skills', hint: 'Analyze "Google" (Enterprise) vs a generic name. Verify mapping logic differences.' },
    { id: 'score-det', label: 'Score calculation is deterministic', hint: 'Analyzing the same JD twice should result in the same base score.' },
    { id: 'score-live', label: 'Skill toggles update score live', hint: 'Check/Uncheck skills on the Results page and watch the circular indicator.' },
    { id: 'persist', label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh the page, and ensure the score/toggle remains saved.' },
    { id: 'history', label: 'History saves and loads correctly', hint: 'Check the History tab. Every analysis should be listed with correct scores.' },
    { id: 'export', label: 'Export buttons copy the correct content', hint: 'Test "Download Report" and "Copy" buttons on the Results page.' },
    { id: 'console', label: 'No console errors on core pages', hint: 'Open DevTools (F12) and navigate through Dashboard, Analyze, Results, and History.' }
];

const TestChecklist = () => {
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('prp_test_checklist', JSON.stringify(checklist));
    }, [checklist]);

    const handleToggle = (id) => {
        setChecklist(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const resetChecklist = () => {
        if (window.confirm('Reset all test progress?')) {
            setChecklist({});
        }
    };

    const passedCount = TESTS.filter(t => checklist[t.id]).length;
    const isReady = passedCount === TESTS.length;

    return (
        <div className="min-h-screen bg-slate-50 p-8 md:p-12 font-sans">
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vetting Checklist</h1>
                            <p className="text-slate-500 font-medium">Internal QA Protocol for Placement Readiness Platform</p>
                        </div>
                        <div className={`px-6 py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${isReady ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-primary'}`}>
                            <span className="text-3xl font-black">{passedCount} / {TESTS.length}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Tests Passed</span>
                        </div>
                    </div>

                    {!isReady ? (
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 text-amber-700 text-sm font-bold">
                            <AlertTriangle size={20} className="shrink-0" />
                            Fix issues before shipping. Platform is currently locked.
                        </div>
                    ) : (
                        <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-700 text-sm font-bold animate-bounce">
                            <ShieldCheck size={20} className="shrink-0" />
                            All systems nominal. Ready for deployment.
                        </div>
                    )}
                </div>

                {/* List */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {TESTS.map((test) => (
                            <div key={test.id} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors group">
                                <button
                                    onClick={() => handleToggle(test.id)}
                                    className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checklist[test.id] ? 'bg-primary border-primary text-white scale-110' : 'bg-white border-slate-200 group-hover:border-primary/40'}`}
                                >
                                    {checklist[test.id] && <CheckCircle2 size={16} strokeWidth={3} />}
                                </button>
                                <div className="space-y-1">
                                    <h3 className={`font-bold transition-colors ${checklist[test.id] ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                        {test.label}
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        <span className="text-[10px] font-black uppercase text-indigo-400 mr-2 tracking-widest">How to test:</span>
                                        {test.hint}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <button
                            onClick={resetChecklist}
                            className="flex items-center gap-2 text-slate-400 hover:text-rose-500 font-bold text-xs transition-colors uppercase tracking-widest"
                        >
                            <RotateCcw size={14} /> Reset checklist
                        </button>
                        <button
                            onClick={() => navigate('/prp/08-ship')}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm transition-all ${isReady ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        >
                            Continue to Shipping <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestChecklist;

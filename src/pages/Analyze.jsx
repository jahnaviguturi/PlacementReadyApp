import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Briefcase, FileText, Sparkles } from 'lucide-react';
import { analyzeJD, saveToHistory } from '../utils/analyzer';

const Analyze = () => {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!jdText.trim()) return;

        setIsAnalyzing(true);

        // Simulate thinking
        setTimeout(() => {
            const results = analyzeJD(company, role, jdText);
            const savedEntry = saveToHistory({
                company,
                role,
                jdText,
                ...results
            });

            setIsAnalyzing(false);
            navigate(`/app/results/${savedEntry.id}`);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Smart Job Analyzer</h1>
                <p className="text-slate-500 text-lg">Paste a job description to get a personalized preparation strategy.</p>
            </div>

            <form onSubmit={handleAnalyze} className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Building2 size={16} className="text-primary" /> Company Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Google, Amazon..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Briefcase size={16} className="text-primary" /> Role / Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. SDE-1, Backend Engineer..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <FileText size={16} className="text-primary" /> Job Description
                        </label>
                        <textarea
                            placeholder="Paste the full job description here..."
                            className="w-full h-64 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none font-sans leading-relaxed"
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                            required
                        ></textarea>
                        <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                            <span>{jdText.length} characters</span>
                            <span>Recommended: &gt; 800 chars</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={isAnalyzing || !jdText.trim()}
                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Analyzing Profile...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Run Analysis
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureInfo icon={<Search />} title="Keyword Detection" desc="Extracts technical skills across 5+ categories." />
                <FeatureInfo icon={<Sparkles />} title="Interview Prep" desc="Generates likely questions based on requirements." />
                <FeatureInfo icon={<Building2 />} title="Strategic Roadmap" desc="Creates a 7-day plan tailored to the tech stack." />
            </div>
        </div>
    );
};

const FeatureInfo = ({ icon, title, desc }) => (
    <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-50 text-primary rounded-xl flex items-center justify-center mx-auto mb-2">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

export default Analyze;

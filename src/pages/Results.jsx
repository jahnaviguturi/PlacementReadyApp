import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHistoryItem, updateHistoryItem } from '../utils/analyzer';
import {
    ChevronLeft,
    CheckCircle2,
    Target,
    Calendar,
    MessageSquare,
    Trophy,
    Share2,
    Printer,
    Copy,
    Download,
    AlertCircle,
    Lightbulb
} from 'lucide-react';

const Results = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [skillConfidenceMap, setSkillConfidenceMap] = useState({});
    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        let item = null;
        if (id) {
            item = getHistoryItem(id);
        } else {
            const history = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
            if (history.length > 0) {
                item = history[0];
            }
        }

        if (item) {
            setData(item);
            setSkillConfidenceMap(item.skillConfidenceMap || {});
            setCurrentScore(item.readinessScore);
        } else {
            navigate('/app/analyze');
        }
    }, [id, navigate]);

    // Update dynamic score whenever confidence map changes
    useEffect(() => {
        if (!data) return;

        let bonus = 0;
        Object.values(skillConfidenceMap).forEach(status => {
            if (status === 'know') bonus += 2;
            if (status === 'practice') bonus -= 2;
        });

        const newScore = Math.min(100, Math.max(0, data.readinessScore + bonus));
        setCurrentScore(newScore);

        // Persist to history
        if (data.id) {
            updateHistoryItem(data.id, {
                skillConfidenceMap,
                readinessScore: newScore
            });
        }
    }, [skillConfidenceMap, data]);

    if (!data) return null;

    const toggleSkill = (skill) => {
        setSkillConfidenceMap(prev => ({
            ...prev,
            [skill]: prev[skill] === 'know' ? 'practice' : 'know'
        }));
    };

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (currentScore / 100) * circumference;

    const weakSkills = Object.entries(data.extractedSkills)
        .flatMap(([cat, skills]) => skills)
        .filter(skill => skillConfidenceMap[skill] !== 'know')
        .slice(0, 3);

    // Export functions
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied to clipboard!`);
    };

    const downloadAsTxt = () => {
        const sections = [
            `Job Analysis: ${data.company} - ${data.role}`,
            `Readiness Score: ${currentScore}%`,
            '\n7-Day Plan:',
            ...Object.entries(data.plan).map(([day, tasks]) => `${day}:\n- ${tasks.join('\n- ')}`),
            '\nChecklist:',
            ...Object.entries(data.checklist).map(([round, items]) => `${round}:\n- ${items.join('\n- ')}`),
            '\nInterview Questions:',
            ...data.questions.map((q, i) => `${i + 1}. [${q.skill}] ${q.question}`)
        ];
        const element = document.createElement("a");
        const file = new Blob([sections.join('\n\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Analysis_${data.company || 'Ready'}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Top Action Bar */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/app/history')}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to History
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={downloadAsTxt}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-white hover:border-primary/30 transition-all font-bold text-sm"
                    >
                        <Download size={16} /> Download Report
                    </button>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:row relative">
                <div className="p-10 flex-1 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                            {data.company || 'Analysis Result'}
                        </h1>
                        <p className="text-xl text-slate-500 font-medium">{data.role || 'Career Analysis'}</p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Key Skills Extracted (Tap to toggle confidence)</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(data.extractedSkills).map(([cat, skills]) => (
                                skills.map(skill => {
                                    const isKnown = skillConfidenceMap[skill] === 'know';
                                    return (
                                        <button
                                            key={skill}
                                            onClick={() => toggleSkill(skill)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border
                        ${isKnown
                                                    ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                                    : 'bg-indigo-50 text-primary border-indigo-100 hover:border-primary/40'}`}
                                        >
                                            {isKnown ? '✓ ' : '○ '}{skill}
                                        </button>
                                    );
                                })
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4 text-slate-400 text-sm">
                        <span>Analyzed on {new Date(data.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Target size={14} /> HEURISTIC ENGINE V1</span>
                    </div>
                </div>

                <div className="p-10 bg-indigo-900 flex flex-col items-center justify-center text-white min-w-[300px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative w-32 h-32 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="45" className="stroke-white/10" strokeWidth="8" fill="transparent" />
                            <circle
                                cx="64" cy="64" r="45" className="stroke-white" strokeWidth="8" fill="transparent" strokeLinecap="round"
                                style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black">{currentScore}%</span>
                        </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Readiness Score</span>
                    <div className="mt-4 px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold">
                        Live Updates Enabled
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Plan & Questions */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Company Intelligence Section */}
                    {data.companyIntel && (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
                            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Building2 className="text-primary" /> Company Intelligence
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Industry Focus</p>
                                        <p className="text-sm font-bold text-slate-800">{data.companyIntel.industry}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Size Category</p>
                                        <p className="text-sm font-bold text-slate-800">{data.companyIntel.sizeCategory}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Typical Hiring Focus</p>
                                    <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-primary/20 pl-4">
                                        "{data.companyIntel.hiringFocus}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7-Day Plan */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Calendar className="text-primary" /> Personalized 7-Day Strategy
                            </h3>
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(data.plan, null, 2), '7-day plan')}
                                className="text-slate-400 hover:text-primary transition-colors focus:outline-none"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            {Object.entries(data.plan).map(([day, tasks]) => (
                                <div key={day} className="flex gap-4">
                                    <div className="relative">
                                        <div className="w-1 h-full bg-slate-100 absolute left-1/2 -translate-x-1/2"></div>
                                        <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-4 border-white"></div>
                                    </div>
                                    <div className="pb-4">
                                        <h4 className="font-bold text-slate-800 text-sm mb-2 italic tracking-tight">{day}</h4>
                                        <ul className="space-y-2">
                                            {tasks.map((task, i) => (
                                                <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                                                    <CheckCircle2 size={14} className="mt-0.5 text-slate-300" /> {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Likely Questions */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <MessageSquare className="text-primary" /> 10 Likely Interview Questions
                            </h3>
                            <button
                                onClick={() => copyToClipboard(data.questions.map(q => q.question).join('\n'), 'Questions')}
                                className="text-slate-400 hover:text-primary transition-colors"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                        <div className="p-8 grid grid-cols-1 gap-4">
                            {data.questions.map((q, i) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase text-slate-400 group-hover:text-primary transition-colors">
                                            {q.skill}
                                        </span>
                                        <span className="text-slate-300 text-xs">Q.{i + 1}</span>
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed">{q.question}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Round Mapping, Checklist & Action Box */}
                <div className="space-y-8">
                    {/* Interactive Round Mapping Timeline */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Trophy className="text-amber-500" /> Interview Round Flow
                        </h3>
                        <div className="space-y-8 relative">
                            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                            {data.roundMapping.map((round, idx) => (
                                <div key={idx} className="relative pl-8 group">
                                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-primary group-hover:bg-primary transition-colors flex items-center justify-center z-10">
                                        <span className="text-[10px] font-bold text-primary group-hover:text-white">{idx + 1}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-slate-800">{round.name}</h4>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{round.focus}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                                            <span className="font-bold text-slate-400 mr-1">WHY:</span> {round.why}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Trophy className="text-indigo-400" /> Preparation Checklist
                            </h3>
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(data.checklist, null, 2), 'Checklist')}
                                className="text-slate-400 hover:text-primary transition-colors"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                        <div className="space-y-8">
                            {Object.entries(data.checklist).map(([round, items]) => (
                                <div key={round}>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{round}</h4>
                                    <ul className="space-y-3">
                                        {items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 group cursor-pointer">
                                                <div className="mt-0.5 w-5 h-5 rounded border-2 border-slate-200 group-hover:border-primary transition-all flex items-center justify-center shrink-0">
                                                    <CheckCircle2 size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Action Next Box */}
                        <div className="mt-10 p-6 bg-primary rounded-2xl text-white shadow-xl shadow-primary/20 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Lightbulb size={20} className="text-yellow-300" />
                                <h4 className="font-bold text-sm">Next Smart Action</h4>
                            </div>
                            <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                                You marked {Object.values(skillConfidenceMap).filter(v => v === 'know').length} skills as known.
                                Focus on {weakSkills.join(', ')} (Practice required).
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={() => navigate('/app/practice')}
                                    className="w-full bg-white text-primary py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm"
                                >
                                    Start Day 1 plan now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-10 pb-6 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                    <AlertCircle size={12} /> Demo Mode: Company intel generated heuristically.
                </p>
            </div>
        </div>
    );
};

export default Results;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHistoryItem } from '../utils/analyzer';
import {
    ChevronLeft,
    CheckCircle2,
    Target,
    Calendar,
    MessageSquare,
    Trophy,
    Share2,
    Printer
} from 'lucide-react';

const Results = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            const item = getHistoryItem(id);
            if (item) {
                setData(item);
            } else {
                navigate('/app/analyze');
            }
        } else {
            // If no ID, show latest from history
            const history = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
            if (history.length > 0) {
                setData(history[0]);
            } else {
                navigate('/app/analyze');
            }
        }
    }, [id, navigate]);

    if (!data) return null;

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (data.readinessScore / 100) * circumference;

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Top Action Bar */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/app/history')}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors"
                >
                    <ChevronLeft size={20} /> Back to History
                </button>
                <div className="flex gap-3">
                    <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white transition-all"><Share2 size={18} /></button>
                    <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white transition-all"><Printer size={18} /></button>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="p-10 flex-1 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                            {data.company || 'Analysis Result'}
                        </h1>
                        <p className="text-xl text-slate-500 font-medium">{data.role || 'Career Analysis'}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {Object.entries(data.extractedSkills).map(([cat, skills]) => (
                            skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-indigo-50 text-primary border border-indigo-100 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {skill}
                                </span>
                            ))
                        ))}
                    </div>

                    <div className="pt-4 flex items-center gap-4 text-slate-400 text-sm">
                        <span>Analyzed on {new Date(data.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Target size={14} /> HEURISTIC ENGINE V1</span>
                    </div>
                </div>

                <div className="p-10 bg-indigo-900 flex flex-col items-center justify-center text-white min-w-[300px]">
                    <div className="relative w-32 h-32 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="45" className="stroke-white/10" strokeWidth="8" fill="transparent" />
                            <circle
                                cx="64" cy="64" r="45" className="stroke-white" strokeWidth="8" fill="transparent" strokeLinecap="round"
                                style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 2s ease-in-out' }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black">{data.readinessScore}%</span>
                        </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Readiness Score</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Plan & Questions */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 7-Day Plan */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Calendar className="text-primary" /> Personalized 7-Day Strategy
                        </h3>
                        <div className="space-y-6">
                            {Object.entries(data.plan).map(([day, tasks]) => (
                                <div key={day} className="flex gap-4">
                                    <div className="relative">
                                        <div className="w-1 h-full bg-slate-100 absolute left-1/2 -translate-x-1/2"></div>
                                        <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-4 border-white"></div>
                                    </div>
                                    <div className="pb-4">
                                        <h4 className="font-bold text-slate-800 text-sm mb-2">{day}</h4>
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
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <MessageSquare className="text-primary" /> 10 Likely Interview Questions
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
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

                {/* Right Column: Rounds Checklist */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Trophy className="text-amber-500" /> Preparation Checklist
                        </h3>
                        <div className="space-y-8">
                            {Object.entries(data.checklist).map(([round, items]) => (
                                <div key={round}>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{round}</h4>
                                    <ul className="space-y-3">
                                        {items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 group cursor-pointer">
                                                <div className="mt-0.5 w-5 h-5 rounded border-2 border-slate-200 group-hover:border-primary transition-all flex items-center justify-center">
                                                    <CheckCircle2 size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;

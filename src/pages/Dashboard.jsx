import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { ChevronRight, Calendar, Clock, Trophy, Target } from 'lucide-react';

// Custom Card Components (Shadcn style)
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }) => (
    <div className={`px-6 py-4 border-b border-slate-100 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-slate-800 ${className}`}>
        {children}
    </h3>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

const skillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const Dashboard = () => {
    const readinessValue = 72;
    const circumference = 2 * Math.PI * 45; // r=45
    const offset = circumference - (readinessValue / 100) * circumference;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Your Dashboard</h1>
                <p className="text-slate-500">Track your placement journey and upcoming milestones.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Column 1 */}
                <div className="space-y-8">

                    {/* Skill Breakdown Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="text-primary" size={20} />
                                Skill Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar
                                            name="Student"
                                            dataKey="A"
                                            stroke="hsl(245, 58%, 51%)"
                                            fill="hsl(245, 58%, 51%)"
                                            fillOpacity={0.4}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Goals */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="text-amber-500" size={20} />
                                Weekly Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-600">Problems Solved</span>
                                    <span className="text-lg font-bold text-slate-900">12/20 <span className="text-xs font-normal text-slate-400">this week</span></span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[60%] rounded-full transition-all duration-1000"></div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-2">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                      ${idx < 4 ? 'bg-primary text-white scale-110 shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                                            {idx < 4 ? '✓' : ''}
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-400 uppercase">{day}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Column 2 */}
                <div className="space-y-8">

                    {/* Overall Readiness */}
                    <Card className="flex flex-col items-center justify-center py-8">
                        <CardHeader className="border-none pb-2 text-center w-full">
                            <CardTitle>Overall Readiness</CardTitle>
                        </CardHeader>
                        <CardContent className="relative flex flex-col items-center pt-0">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="45"
                                    className="stroke-slate-100"
                                    strokeWidth="8"
                                    fill="transparent"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="45"
                                    className="stroke-primary"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    style={{
                                        strokeDasharray: circumference,
                                        strokeDashoffset: offset,
                                        transition: 'stroke-dashoffset 1.5s ease-in-out',
                                    }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-slate-900">{readinessValue}/100</span>
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Ready</span>
                            </div>
                            <p className="mt-4 text-sm text-slate-500 font-medium tracking-tight">Readiness Score</p>
                        </CardContent>
                    </Card>

                    {/* Continue Practice */}
                    <Card className="bg-indigo-900 border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors"></div>
                        <CardContent className="p-8">
                            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-4 block">Last Topic</span>
                            <h3 className="text-2xl font-bold text-white mb-6">Dynamic Programming</h3>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-xs text-indigo-200">
                                    <span>Course Progress</span>
                                    <span className="font-bold">3/10 Completed</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-400 h-full w-[30%] rounded-full"></div>
                                </div>
                            </div>

                            <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-all hover:translate-x-1 active:scale-95">
                                Continue Learning <ChevronRight size={16} />
                            </button>
                        </CardContent>
                    </Card>

                    {/* Upcoming Assessments */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="text-rose-500" size={20} />
                                Upcoming Assessments
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {[
                                    { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", variant: "bg-blue-50 text-blue-600" },
                                    { title: "System Design Review", time: "Wed, 2:00 PM", variant: "bg-amber-50 text-amber-600" },
                                    { title: "HR Interview Prep", time: "Friday, 11:00 AM", variant: "bg-emerald-50 text-emerald-600" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-4 items-center">
                                            <div className={`p-3 rounded-xl ${item.variant}`}>
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-primary transition-colors">
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

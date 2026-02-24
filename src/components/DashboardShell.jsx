import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Code2,
    FileCheck,
    BookOpen,
    UserCircle2,
    ChevronRight,
    Bell
} from 'lucide-react';

const DashboardShell = () => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 shadow-sm z-20">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-xs">PP</span>
                        Placement Prep
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <SidebarLink to="/app" end icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <SidebarLink to="/app/practice" icon={<Code2 size={20} />} label="Practice" />
                    <SidebarLink to="/app/assessments" icon={<FileCheck size={20} />} label="Assessments" />
                    <SidebarLink to="/app/resources" icon={<BookOpen size={20} />} label="Resources" />
                    <SidebarLink to="/app/profile" icon={<UserCircle2 size={20} />} label="Profile" />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="bg-indigo-50 p-4 rounded-xl">
                        <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Upgrade to Pro</p>
                        <p className="text-xs text-indigo-700 mb-3">Get unlimited mock interviews.</p>
                        <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                            Learn more <ChevronRight size={12} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-slate-500 font-medium">Dashboard Overview</h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-800 leading-none">Jahnavi Guturi</p>
                                <p className="text-xs text-slate-500 mt-1">Free Plan</p>
                            </div>
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 overflow-hidden">
                                <UserCircle2 size={32} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Outlet */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const SidebarLink = ({ to, icon, label, end = false }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
      ${isActive
                ? 'bg-indigo-50 text-primary shadow-sm border border-indigo-100'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
    `}
    >
        {icon}
        {label}
    </NavLink>
);

export default DashboardShell;

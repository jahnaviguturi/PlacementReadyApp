import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-indigo-700 to-primary text-white py-24 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Ace Your Placement
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-2xl mx-auto">
                        Practice, assess, and prepare for your dream job with our comprehensive study platform.
                    </p>
                    <button
                        onClick={() => navigate('/app')}
                        className="bg-white text-primary hover:bg-indigo-50 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto"
                    >
                        Get Started <ChevronRight size={20} />
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Platform Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Code className="text-primary" size={32} />}
                            title="Practice Problems"
                            description="Solve 1000+ coding challenges from top tech companies."
                        />
                        <FeatureCard
                            icon={<Video className="text-primary" size={32} />}
                            title="Mock Interviews"
                            description="Guided video simulations to prepare you for behavioral rounds."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="text-primary" size={32} />}
                            title="Track Progress"
                            description="Visualize your growth with detailed analytics and insights."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-12 border-t border-slate-200 text-center text-slate-500">
                <div className="max-w-6xl mx-auto px-6">
                    <p>© {new Date().getFullYear()} Placement Prep. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-6 p-4 bg-indigo-50 w-fit rounded-xl">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;

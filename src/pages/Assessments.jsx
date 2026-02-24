const Assessments = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Assessments</h1>
            <p className="text-slate-500">Take timed tests to simulate real exam environments.</p>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-xs uppercase">Assessment Name</th>
                            <th className="px-6 py-4 font-semibold text-xs uppercase">Duration</th>
                            <th className="px-6 py-4 font-semibold text-xs uppercase">Difficulty</th>
                            <th className="px-6 py-4 font-semibold text-xs uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="px-6 py-4 font-medium text-slate-900">Adobe OA Simulation</td>
                            <td className="px-6 py-4 text-slate-600">90 mins</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded uppercase">Medium</span></td>
                            <td className="px-6 py-4"><button className="text-primary font-bold hover:underline">Start Test</button></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-medium text-slate-900">Google Kickstart Mock</td>
                            <td className="px-6 py-4 text-slate-600">180 mins</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase">Hard</span></td>
                            <td className="px-6 py-4"><button className="text-primary font-bold hover:underline">Start Test</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Assessments;

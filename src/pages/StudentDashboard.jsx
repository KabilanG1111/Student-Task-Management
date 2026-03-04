import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Code2, Trophy } from 'lucide-react';

const StudentDashboard = () => {
    const [formData, setFormData] = useState({
        name: 'Leo M',
        leetcode: 'leo_codes',
        codechef: 'leo_cc',
        leetcodeSolved: '',
        codechefSolved: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, Leo! 👋</h1>
                <p className="text-zinc-400">Track your coding journey and submit your weekly progress.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stats Cards */}
                <div className="glass-card rounded-2xl p-6 flex items-center gap-4 bg-gradient-to-br from-surface to-background relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all"></div>
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-400">Total LeetCode</p>
                        <p className="text-2xl font-bold text-white">142</p>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-6 flex items-center gap-4 bg-gradient-to-br from-surface to-background relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                        <Code2 size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-400">Total CodeChef</p>
                        <p className="text-2xl font-bold text-white">89</p>
                    </div>
                </div>
            </div>

            {/* Submission Form */}
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600"></div>
                <h2 className="text-xl font-semibold text-white mb-6">Submit Weekly Progress</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Student Name</label>
                            <input type="text" value={formData.name} disabled className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none opacity-70 cursor-not-allowed" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Week</label>
                            <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary-500/50 appearance-none">
                                <option>Week 1</option>
                                <option>Week 2</option>
                                <option>Week 3</option>
                                <option>Week 4</option>
                                <option>Week 5</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">LeetCode Solved This Week</label>
                            <input type="number" min="0" required placeholder="e.g. 15" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">CodeChef Solved This Week</label>
                            <input type="number" min="0" required placeholder="e.g. 10" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Upload Screenshots Proof</label>
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all group cursor-pointer flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <UploadCloud size={24} />
                            </div>
                            <p className="text-zinc-200 font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-sm text-zinc-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                        {submitted ? (
                            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg">
                                <CheckCircle2 size={18} />
                                <span className="text-sm font-medium">Progress submitted successfully!</span>
                            </div>
                        ) : (
                            <div />
                        )}
                        <button type="submit" className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium py-3 px-8 rounded-xl shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0">
                            Submit Progress
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentDashboard;

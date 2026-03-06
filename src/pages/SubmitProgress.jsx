import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle2, ChevronDown, Image as ImageIcon } from 'lucide-react';

const SubmitProgress = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFile(null);
        }, 3000);
    };

    return (
        <div className="max-w-3xl mx-auto py-10 animate-in fade-in duration-700 relative">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-primary-900/20 border border-white/5"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Log Your Progress</h2>
                    <p className="text-zinc-400">Update your weekly coding stats and climb the leaderboard.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Student Name</label>
                            <input type="text" value="Leo M" disabled className="w-full bg-surface/80 border border-white/5 rounded-2xl px-5 py-4 text-zinc-400 focus:outline-none cursor-not-allowed shadow-inner" />
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Week</label>
                            <div className="relative">
                                <select className="w-full bg-surface/50 border border-white/10 rounded-2xl px-5 py-4 text-zinc-100 focus:outline-none focus:border-primary-500/50 appearance-none hover:bg-surface transition-colors cursor-pointer focus:shadow-glow">
                                    <option>Week 1</option>
                                    <option>Week 2</option>
                                    <option>Week 3</option>
                                    <option>Week 4</option>
                                    <option>Week 5</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">LeetCode Solved</label>
                            <input type="number" min="0" required placeholder="0" className="w-full bg-surface/50 border border-white/10 rounded-2xl px-5 py-4 text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:shadow-glow transition-all hover:bg-surface placeholder:text-zinc-600" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">CodeChef Solved</label>
                            <input type="number" min="0" required placeholder="0" className="w-full bg-surface/50 border border-white/10 rounded-2xl px-5 py-4 text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:shadow-glow transition-all hover:bg-surface placeholder:text-zinc-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Evidence (Screenshot)</label>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-3xl p-10 transition-all duration-300 group cursor-pointer flex flex-col items-center justify-center text-center relative overflow-hidden ${isDragging ? 'border-primary-400 bg-primary-500/10 shadow-glow' : 'border-white/10 hover:border-primary-500/40 hover:bg-primary-500/5'
                                }`}
                        >
                            {isDragging && <div className="absolute inset-0 bg-primary-500/5 backdrop-blur-sm z-0"></div>}

                            <div className="relative z-10 flex flex-col items-center">
                                {file ? (
                                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                            <ImageIcon size={30} />
                                        </div>
                                        <p className="text-emerald-400 font-medium">{file.name}</p>
                                        <p className="text-xs text-zinc-500 mt-2 hover:text-white transition-colors">Click to change file</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-surface border border-white/5 text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                                            <UploadCloud size={30} />
                                        </div>
                                        <p className="text-zinc-200 font-medium mb-2 text-lg">Click to browse or drag & drop</p>
                                        <p className="text-sm text-zinc-500">Supports JPG, PNG and SVG (max 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300 text-white font-semibold py-4 px-8 rounded-2xl shadow-neon transition-all hover:shadow-neon-hover relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <span className="relative z-10">Submit Progress</span>
                        </motion.button>

                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-6 py-3 rounded-xl absolute -bottom-16"
                            >
                                <CheckCircle2 size={20} />
                                <span className="font-medium">Data logged successfully!</span>
                            </motion.div>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default SubmitProgress;

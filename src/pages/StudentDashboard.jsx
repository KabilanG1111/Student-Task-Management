import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Flame, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
    { name: 'Mon', LeetCode: 4, CodeChef: 2 },
    { name: 'Tue', LeetCode: 7, CodeChef: 5 },
    { name: 'Wed', LeetCode: 5, CodeChef: 8 },
    { name: 'Thu', LeetCode: 10, CodeChef: 4 },
    { name: 'Fri', LeetCode: 15, CodeChef: 12 },
    { name: 'Sat', LeetCode: 22, CodeChef: 18 },
    { name: 'Sun', LeetCode: 18, CodeChef: 15 },
];

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
    >
        <div className={`absolute -right-6 -top-6 w-32 h-32 ${colorClass} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}></div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-surface/80 border border-white/5 shadow-inner backdrop-blur-md`}>
                <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
            </div>
            <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-lg border border-emerald-400/20">
                +12%
            </span>
        </div>
        <div>
            <h3 className="text-4xl font-bold text-white mb-1 tracking-tight">{value}</h3>
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <p className="text-xs text-zinc-600 mt-2">{subtitle}</p>
        </div>
    </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-4 rounded-xl shadow-neon border border-primary-500/20">
                <p className="text-zinc-300 font-medium mb-3">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm mt-1.5">
                        <div className="w-2.5 h-2.5 rounded-full shadow-glow" style={{ backgroundColor: entry.color }} />
                        <span className="text-zinc-400 w-20">{entry.name}</span>
                        <span className="font-bold text-white">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const StudentDashboard = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-2 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold tracking-tight text-white flex items-center gap-3"
                >
                    Welcome back, Leo <span className="animate-bounce origin-bottom">👋</span>
                </motion.h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <StatCard
                    title="Total Problems Solved"
                    value="482"
                    subtitle="Across all platforms"
                    icon={Code2}
                    colorClass="bg-primary-500 text-primary-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    delay={0.1}
                />
                <StatCard
                    title="Current Coding Streak"
                    value="14 Days"
                    subtitle="Keep it up!"
                    icon={Flame}
                    colorClass="bg-orange-500 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                    delay={0.2}
                />
                <StatCard
                    title="Weekly Growth"
                    value="24%"
                    subtitle="Compared to last week"
                    icon={TrendingUp}
                    colorClass="bg-emerald-500 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    delay={0.3}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden group border border-white/5 hover:border-primary-500/30 hover:shadow-glow transition-all duration-500 h-[450px]"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary-600/10 transition-colors duration-700"></div>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-semibold text-white tracking-wide">Weekly Activity Heatmap</h2>
                        <p className="text-sm text-zinc-500 mt-1">Consistency across platforms</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            <span className="text-zinc-400">LeetCode</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            <span className="text-zinc-400">CodeChef</span>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height="80%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorLeet" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorChef" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="name" stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff10', strokeWidth: 1, strokeDasharray: '5 5' }} />
                        <Area type="monotone" dataKey="LeetCode" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorLeet)" activeDot={{ r: 6, fill: '#a855f7', stroke: '#000', strokeWidth: 2 }} />
                        <Area type="monotone" dataKey="CodeChef" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorChef)" activeDot={{ r: 6, fill: '#3b82f6', stroke: '#000', strokeWidth: 2 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default StudentDashboard;

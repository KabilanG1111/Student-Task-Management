import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as PieTooltip, Legend } from 'recharts';
import { Activity, Target, Zap } from 'lucide-react';

const weeklyData = [
    { name: 'W1', LeetCode: 15, CodeChef: 10 },
    { name: 'W2', LeetCode: 22, CodeChef: 8 },
    { name: 'W3', LeetCode: 18, CodeChef: 15 },
    { name: 'W4', LeetCode: 35, CodeChef: 20 },
    { name: 'W5', LeetCode: 45, CodeChef: 28 },
];

const platformData = [
    { name: 'LeetCode', value: 135, color: '#a855f7' },
    { name: 'CodeChef', value: 81, color: '#3b82f6' },
    { name: 'HackerRank', value: 30, color: '#10b981' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-4 rounded-xl shadow-glow border border-primary-500/20">
                <p className="text-zinc-300 font-semibold mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm mt-1.5 font-medium">
                        <div className="w-2.5 h-2.5 rounded-full shadow-neon" style={{ backgroundColor: entry.color }} />
                        <span className="text-zinc-400 w-20">{entry.name}</span>
                        <span className="text-white bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const WeeklyProgress = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 relative">
            <div className="flex flex-col gap-2 relative z-10">
                <h1 className="text-3xl font-bold tracking-tight text-white">Full Analytics</h1>
                <p className="text-zinc-400">Deep dive into your coding trajectories and distributions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {[
                    { label: 'Platform Focus', value: 'LeetCode', sub: '68% of total', icon: Zap, color: 'text-primary-400', bg: 'bg-primary-500/10' },
                    { label: 'Weekly Velocity', value: '+45', sub: 'Highest recorded', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Overall Completion', value: '74%', sub: 'Avg success rate', icon: Target, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10"
                    >
                        <div className={`absolute -right-10 -top-10 w-24 h-24 ${item.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-medium text-zinc-400">{item.label}</p>
                            <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                                <item.icon className={item.color} size={20} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white tracking-tight mb-1">{item.value}</h3>
                        <p className="text-xs text-zinc-500">{item.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

                {/* Line Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5 opacity-50 blur-3xl pointer-events-none"></div>
                    <h2 className="text-lg font-semibold text-white tracking-wide mb-6">Coding Velocity Trend</h2>

                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <LineTooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff10', strokeWidth: 1 }} />

                                <Line
                                    type="monotone"
                                    dataKey="LeetCode"
                                    stroke="#a855f7"
                                    strokeWidth={4}
                                    dot={{ r: 4, strokeWidth: 2, fill: '#050509', stroke: '#a855f7' }}
                                    activeDot={{ r: 8, fill: '#a855f7', strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="CodeChef"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    dot={{ r: 4, strokeWidth: 2, fill: '#050509', stroke: '#3b82f6' }}
                                    activeDot={{ r: 8, fill: '#3b82f6', strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5"
                >
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary-500/5 to-transparent blur-xl pointer-events-none"></div>
                    <h2 className="text-lg font-semibold text-white tracking-wide mb-6 text-center">Platform Heat</h2>

                    <div className="h-[350px] flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <PieTooltip
                                    contentStyle={{ backgroundColor: '#0f0f17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontWeight: 600 }}
                                />
                                <Pie
                                    data={platformData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="rgba(255,255,255,0.02)"
                                    strokeWidth={2}
                                >
                                    {platformData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            className="hover:opacity-80 transition-opacity cursor-pointer drop-shadow-neon"
                                        />
                                    ))}
                                </Pie>
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    wrapperStyle={{ fontSize: '13px', color: '#e4e4e7' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WeeklyProgress;

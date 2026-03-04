import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp } from 'lucide-react';

const data = [
    { name: 'Week 1', LeetCode: 15, CodeChef: 10 },
    { name: 'Week 2', LeetCode: 20, CodeChef: 5 },
    { name: 'Week 3', LeetCode: 10, CodeChef: 12 },
    { name: 'Week 4', LeetCode: 25, CodeChef: 20 },
    { name: 'Week 5', LeetCode: 30, CodeChef: 25 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-4 rounded-xl border border-white/10 shadow-2xl">
                <p className="text-white font-medium mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm mt-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-zinc-300">{entry.name}:</span>
                        <span className="font-bold text-white">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const WeeklyProgress = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">Weekly Progress</h1>
                <p className="text-zinc-400">Visualize your coding performance over time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card rounded-2xl p-6 flex items-center justify-between border border-primary-500/20 bg-primary-500/5">
                    <div>
                        <p className="text-sm font-medium text-zinc-400">Average Weekly Solve</p>
                        <p className="text-3xl font-bold text-white mt-1">21 <span className="text-sm font-normal text-zinc-500">problems</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-6 flex items-center justify-between border border-emerald-500/20 bg-emerald-500/5">
                    <div>
                        <p className="text-sm font-medium text-zinc-400">Consistency Score</p>
                        <p className="text-3xl font-bold text-white mt-1">94% <span className="text-sm font-normal text-zinc-500">excellent</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Target size={24} />
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-3xl p-6 md:p-8 h-[500px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
                <h2 className="text-xl font-semibold text-white mb-8 border-b border-white/5 pb-4">Performance Trends</h2>

                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#a1a1aa"
                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            axisLine={{ stroke: '#ffffff10' }}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#a1a1aa"
                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            axisLine={{ stroke: '#ffffff10' }}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '13px', color: '#e4e4e7', paddingTop: '10px' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="LeetCode"
                            stroke="#a855f7"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#09090b', stroke: '#a855f7' }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#a855f7' }}
                            animationDuration={1500}
                        />
                        <Line
                            type="monotone"
                            dataKey="CodeChef"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#09090b', stroke: '#3b82f6' }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeeklyProgress;

import React from 'react';
import { Crown, Sparkles, Activity, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const topStudents = [
    { rank: 1, name: 'Sarah J', solved: 145, growth: '+12%', avatar: 'Sarah' },
    { rank: 2, name: 'David W', solved: 132, growth: '+8%', avatar: 'David' },
    { rank: 3, name: 'Leo M', solved: 128, growth: '+15%', avatar: 'Leo' },
];

const activityFeed = [
    { id: 1, text: 'Sarah solved 15 problems today', time: '2m ago', avatar: 'Sarah' },
    { id: 2, text: 'David submitted Week 4 progress', time: '1h ago', avatar: 'David' },
    { id: 3, text: 'Leo uploaded screenshot proof', time: '3h ago', avatar: 'Leo' },
    { id: 4, text: 'Emily reached 100 problems milestone', time: '5h ago', avatar: 'Emily' },
];

const InsightsPanel = () => {
    return (
        <aside className="w-80 h-full border-l border-white/5 bg-background/50 hidden xl:flex flex-col overflow-y-auto p-6 gap-8">

            {/* Leaderboard Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <TrophyIcon className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" size={20} />
                    <h3 className="text-lg font-semibold text-white tracking-wide">Leaderboard</h3>
                </div>

                <div className="flex flex-col gap-3">
                    {topStudents.map((student, i) => (
                        <motion.div
                            key={student.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card rounded-2xl p-3 flex items-center gap-3 relative overflow-hidden group hover:border-white/10 transition-colors cursor-default"
                        >
                            {student.rank === 1 && (
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent"></div>
                            )}

                            <div className="relative">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.avatar}&backgroundColor=18181b`} className="w-10 h-10 rounded-full" alt={student.name} />
                                {student.rank === 1 && (
                                    <div className="absolute -top-2 -right-1 text-amber-400">
                                        <Crown size={14} className="fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 z-10">
                                <p className="text-sm font-medium text-zinc-100 truncate">{student.name}</p>
                                <p className="text-xs text-zinc-500">{student.solved} solved</p>
                            </div>

                            <div className="text-right z-10">
                                <span className="text-xs font-semibold text-emerald-400">{student.growth}</span>
                                <p className="text-[10px] text-zinc-500">Weekly</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Activity Feed Section */}
            <section className="flex-1">
                <div className="flex items-center gap-2 mb-6">
                    <Activity className="text-primary-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" size={20} />
                    <h3 className="text-lg font-semibold text-white tracking-wide">Live Activity</h3>
                </div>

                <div className="relative before:absolute before:inset-y-0 before:left-[19px] before:w-[1px] before:bg-white/5">
                    <div className="flex flex-col gap-6">
                        {activityFeed.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (i * 0.1) + 0.3 }}
                                className="flex gap-4 relative"
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-surface border border-white/10 p-0.5 overflow-hidden ring-4 ring-background z-10 relative">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatar}&backgroundColor=0f0f17`} alt="avatar" />
                                    </div>
                                    {i === 0 && (
                                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full"></span>
                                    )}
                                </div>

                                <div className="flex-1 pt-1">
                                    <p className="text-sm text-zinc-300 leading-snug">{item.text}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{item.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </aside>
    );
};

// Extracted TrophyIcon
const TrophyIcon = ({ className, size }) => (
    <Trophy size={size} className={className} />
);

export default InsightsPanel;

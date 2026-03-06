import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/student-dashboard': return 'Overview';
            case '/progress': return 'Analytics';
            case '/leaderboard': return 'Leaderboard';
            case '/submit': return 'Submit Progress';
            case '/admin': return 'Admin Console';
            case '/settings': return 'Settings';
            default: return 'Overview';
        }
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-24 px-8 flex items-center justify-between z-20 bg-background/40 backdrop-blur-2xl border-b border-white/5 sticky top-0"
        >
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    <Menu size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white hidden sm:block">
                        {getTitle()}
                    </h2>
                    <p className="text-sm text-zinc-500 hidden sm:block mt-0.5">Track your coding performance.</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group hidden md:block">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="bg-surface/80 border border-white/5 rounded-full py-2.5 pl-12 pr-6 w-72 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 transition-all placeholder:text-zinc-600 shadow-inner"
                        />
                    </div>
                </div>

                <button className="relative p-2.5 text-zinc-400 hover:text-white bg-surface/50 hover:bg-surface rounded-full transition-all border border-white/5 hover:border-white/10 hover:shadow-glow">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse"></span>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;

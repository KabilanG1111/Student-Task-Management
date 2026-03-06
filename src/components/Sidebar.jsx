import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Trophy, Send, ShieldCheck, Settings, Hexagon, LogOut } from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';
import clsx from 'clsx';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
        { name: 'My Progress', path: '/progress', icon: TrendingUp },
        { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
        { name: 'Submit Progress', path: '/submit', icon: Send },
        { name: 'Admin Panel', path: '/admin', icon: ShieldCheck },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <aside className="w-20 lg:w-24 h-full border-r border-white/5 bg-background flex flex-col items-center py-8 z-20 relative">
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary-500/20 to-transparent"></div>

            <div className="mb-12 relative group cursor-pointer">
                <div className="absolute inset-0 bg-primary-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Hexagon size={36} className="text-primary-400 relative z-10 animate-pulse-slow" />
            </div>

            <nav className="flex-1 w-full flex flex-col gap-6 items-center">
                <LayoutGroup>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/student-dashboard');
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className="relative group flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300"
                                title={item.name}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute inset-0 bg-primary-500/10 border border-primary-500/30 rounded-2xl shadow-glow"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                {isActive && (
                                    <div className="absolute -left-4 w-1 h-8 bg-primary-400 rounded-r-full shadow-[0_0_12px_rgba(192,132,252,0.8)]"></div>
                                )}

                                <item.icon
                                    size={22}
                                    className={clsx(
                                        "relative z-10 transition-all duration-300",
                                        isActive ? "text-primary-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" : "text-zinc-500 group-hover:text-zinc-300 group-hover:scale-110"
                                    )}
                                />
                            </NavLink>
                        );
                    })}
                </LayoutGroup>
            </nav>

            <div className="mt-auto flex flex-col items-center gap-4">
                <button
                    onClick={() => {
                        localStorage.removeItem('studentData');
                        window.location.href = '/login';
                    }}
                    className="relative group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:bg-red-500/10"
                    title="Logout"
                >
                    <LogOut size={20} className="text-zinc-500 group-hover:text-red-400 transition-colors" />
                </button>
                <div className="w-10 h-10 rounded-full bg-surface border border-white/10 overflow-hidden cursor-pointer hover:border-primary-500/50 transition-colors shadow-none hover:shadow-glow">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&backgroundColor=0f0f17`} alt="User avatar" className="w-full h-full object-cover" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

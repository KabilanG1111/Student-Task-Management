import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Send, ShieldCheck, Code2 } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
        { name: 'My Progress', path: '/progress', icon: TrendingUp },
        { name: 'Submit Progress', path: '/student-dashboard', icon: Send },
        { name: 'Admin Panel', path: '/admin', icon: ShieldCheck },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 bg-surface border-r border-white/5 h-full">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                    <Code2 size={20} />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                    Tracker
                </h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path && item.name !== 'Submit Progress';

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
                                isActive
                                    ? 'text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent border-l-2 border-primary-500" />
                            )}
                            <item.icon size={20} className={clsx("relative z-10 transition-transform duration-300", isActive ? "scale-110 text-primary-400" : "group-hover:scale-110")} />
                            <span className="relative z-10 font-medium">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-primary-500 flex items-center justify-center overflow-hidden">
                        <span className="text-sm font-bold">LM</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">Leo M</p>
                        <p className="text-xs text-zinc-500 truncate">Student</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

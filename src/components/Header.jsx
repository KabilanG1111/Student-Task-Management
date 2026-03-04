import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/student-dashboard': return 'Student Dashboard';
            case '/progress': return 'Weekly Progress';
            case '/admin': return 'Admin Panel';
            default: return 'Dashboard';
        }
    };

    return (
        <header className="h-20 px-8 flex items-center justify-between z-10 bg-background/80 backdrop-blur-md border-b border-white/5 sticky top-0">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Menu size={24} />
                </button>
                <h2 className="text-2xl font-bold tracking-tight text-white hidden sm:block">
                    {getTitle()}
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative group hidden md:block">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-surface/50 border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all placeholder:text-zinc-600 focus:bg-surface"
                    />
                </div>

                <button className="relative p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors hidden sm:block">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;

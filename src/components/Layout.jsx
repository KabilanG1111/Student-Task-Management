import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import InsightsPanel from './InsightsPanel';

const Layout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background text-zinc-100 font-sans selection:bg-primary-500/30">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-primary-500/5 opacity-50 blur-[120px] pointer-events-none"></div>
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative">
                    <Outlet />
                </main>
            </div>
            <InsightsPanel />
        </div>
    );
};

export default Layout;

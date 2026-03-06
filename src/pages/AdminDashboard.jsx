import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Check, X, Eye, FileImage } from 'lucide-react';
import studentsData from '../data/students.json';

const AdminDashboard = () => {
    const [data, setData] = useState(studentsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [weekFilter, setWeekFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleStatusChange = (id, newStatus) => {
        setData(data.map(item => item.id === id ? { ...item, status: newStatus } : item));
    };

    const filteredData = data.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.leetcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.codechef.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesWeek = weekFilter === 'All' || item.week === weekFilter;
        return matchesSearch && matchesWeek;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const StatusBadge = ({ status }) => {
        switch (status) {
            case 'Approved':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"><Check size={12} /> Approved</span>;
            case 'Rejected':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]"><X size={12} /> Rejected</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div> Pending</span>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 relative">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Console</h1>
                    <p className="text-zinc-400">Review student submissions and manage platform data.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-surface hover:bg-white/5 text-white border border-white/10 px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-glow"
                >
                    <Download size={18} className="text-primary-400" />
                    <span className="font-medium">Export CSV</span>
                </motion.button>
            </div>

            <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 relative z-10 shadow-2xl">
                {/* Toolbar */}
                <div className="p-5 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-surface/50 backdrop-blur-xl">
                    <div className="relative w-full md:w-96 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search students or handles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background/50 border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:bg-surface transition-all placeholder:text-zinc-600 shadow-inner"
                        />
                    </div>

                    <div className="relative w-full md:w-48">
                        <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" />
                        <select
                            value={weekFilter}
                            onChange={(e) => setWeekFilter(e.target.value)}
                            className="w-full bg-background/50 border border-white/5 rounded-full py-2.5 pl-11 pr-8 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 appearance-none cursor-pointer hover:bg-surface transition-colors shadow-inner"
                        >
                            <option value="All">All Weeks</option>
                            <option value="Week 1">Week 1</option>
                            <option value="Week 2">Week 2</option>
                            <option value="Week 3">Week 3</option>
                            <option value="Week 4">Week 4</option>
                            <option value="Week 5">Week 5</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-surface/80 border-b border-white/5 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                            <tr>
                                <th className="px-6 py-5">Student</th>
                                <th className="px-6 py-5">Platform Handles</th>
                                <th className="px-6 py-5 text-center">LC / CC</th>
                                <th className="px-6 py-5">Week</th>
                                <th className="px-6 py-5">Proof</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedData.map((item, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={item.id}
                                    className="hover:bg-white/[0.02] transition-colors group cursor-default"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-surface border border-white/10 p-0.5 overflow-hidden">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.split(' ')[0]}&backgroundColor=0f0f17`} alt="avatar" />
                                            </div>
                                            <div className="font-medium text-zinc-100">{item.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-xs text-zinc-400 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_5px_rgba(192,132,252,0.8)]"></span>{item.leetcode}</span>
                                            <span className="text-xs text-zinc-400 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>{item.codechef}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-primary-300 font-bold bg-primary-500/10 px-2.5 py-1 rounded-lg min-w-[2.5rem] text-center border border-primary-500/20">{item.leetcodeSolved}</span>
                                            <span className="text-zinc-600">/</span>
                                            <span className="text-blue-300 font-bold bg-blue-500/10 px-2.5 py-1 rounded-lg min-w-[2.5rem] text-center border border-blue-500/20">{item.codechefSolved}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-zinc-300 font-medium">{item.week}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-white/5 hover:border-primary-500/30 hover:shadow-glow group-hover:bg-background">
                                            <FileImage size={14} className="text-primary-400" /> <span className="text-xs font-medium">View</span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.status === 'Pending' ? (
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleStatusChange(item.id, 'Approved')} className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center justify-center transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                                    <Check size={16} />
                                                </motion.button>
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleStatusChange(item.id, 'Rejected')} className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 flex items-center justify-center transition-all shadow-[0_0_10px_rgba(244,63,94,0.1)] hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                                                    <X size={16} />
                                                </motion.button>
                                            </div>
                                        ) : (
                                            <span className="text-zinc-600 text-xs font-medium italic pr-2">Reviewed</span>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-white/5 flex items-center justify-between bg-surface/30">
                    <p className="text-xs text-zinc-500 font-medium">
                        Showing <span className="text-zinc-300">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="text-zinc-300">{filteredData.length}</span> students
                    </p>
                    <div className="flex items-center gap-1.5">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${currentPage === i + 1
                                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 font-bold shadow-glow'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { Search, Filter, Download, Check, X, FileImage, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import studentsData from '../data/students.json';

const AdminDashboard = () => {
    const [data, setData] = useState(studentsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [weekFilter, setWeekFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleApprove = (id) => {
        setData(data.map(item => item.id === id ? { ...item, status: 'Approved' } : item));
    };

    const handleReject = (id) => {
        setData(data.map(item => item.id === id ? { ...item, status: 'Rejected' } : item));
    };

    // Filter logic
    const filteredData = data.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.leetcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.codechef.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesWeek = weekFilter === 'All' || item.week === weekFilter;
        return matchesSearch && matchesWeek;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = {
        total: data.length,
        approved: data.filter(d => d.status === 'Approved').length,
        rejected: data.filter(d => d.status === 'Rejected').length,
        pending: data.filter(d => d.status === 'Pending').length,
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Submissions</h1>
                    <p className="text-zinc-400">Manage and review student progress reports.</p>
                </div>

                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-colors shadow-lg">
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Submissions', value: stats.total, color: 'text-zinc-100' },
                    { label: 'Pending Review', value: stats.pending, color: 'text-amber-400' },
                    { label: 'Approved', value: stats.approved, color: 'text-emerald-400' },
                    { label: 'Rejected', value: stats.rejected, color: 'text-rose-400' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card rounded-2xl p-5 border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                        <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                        <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-zinc-800 to-primary-600"></div>

                {/* Toolbar */}
                <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/[0.02]">
                    <div className="relative w-full md:w-80 group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-400" />
                        <input
                            type="text"
                            placeholder="Search students or handles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all placeholder:text-zinc-600"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <select
                                value={weekFilter}
                                onChange={(e) => setWeekFilter(e.target.value)}
                                className="w-full md:w-auto bg-background border border-white/10 rounded-xl py-2 pl-10 pr-8 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 appearance-none cursor-pointer"
                            >
                                <option value="All">All Weeks</option>
                                <option value="Week 1">Week 1</option>
                                <option value="Week 2">Week 2</option>
                                <option value="Week 3">Week 3</option>
                                <option value="Week 4">Week 4</option>
                                <option value="Week 5">Week 5</option>
                            </select>
                        </div>

                        <div className="relative flex-1 md:flex-none hidden lg:block">
                            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <select className="w-full md:w-auto bg-background border border-white/10 rounded-xl py-2 pl-10 pr-8 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
                                <option>All Departments</option>
                                <option>Computer Science</option>
                                <option>Information Tech</option>
                                <option>Electronics</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="text-xs text-zinc-400 uppercase bg-black/40 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 font-medium">Student Info</th>
                                <th className="px-6 py-4 font-medium">Platform Handles</th>
                                <th className="px-6 py-4 font-medium text-center">Solved (LC/CC)</th>
                                <th className="px-6 py-4 font-medium">Week</th>
                                <th className="px-6 py-4 font-medium">Proof</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div className="font-medium text-zinc-100">{item.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-zinc-300 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span>{item.leetcode}</span>
                                                <span className="text-xs text-zinc-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span>{item.codechef}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="text-orange-400 font-medium bg-orange-400/10 px-2 py-0.5 rounded-md min-w-[2rem] text-center">{item.leetcodeSolved}</span>
                                                <span className="text-zinc-600">/</span>
                                                <span className="text-blue-400 font-medium bg-blue-400/10 px-2 py-0.5 rounded-md min-w-[2rem] text-center">{item.codechefSolved}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-zinc-800 text-zinc-300 py-1 px-3 rounded-full text-xs border border-white/5">{item.week}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-zinc-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 hover:border-primary-400/30">
                                                <FileImage size={14} /> View
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${item.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                    item.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}
                                            >
                                                {item.status === 'Approved' && <Check size={12} />}
                                                {item.status === 'Rejected' && <X size={12} />}
                                                {item.status === 'Pending' && <MoreHorizontal size={12} />}
                                                {item.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {item.status === 'Pending' ? (
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleApprove(item.id)} className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:scale-110 flex items-center justify-center transition-all">
                                                        <Check size={16} />
                                                    </button>
                                                    <button onClick={() => handleReject(item.id)} className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:scale-110 flex items-center justify-center transition-all">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-zinc-600 text-xs italic pr-2">Resolved</div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-zinc-500">
                                        No submissions found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
                    <p className="text-xs text-zinc-500 font-medium">
                        Showing <span className="text-zinc-300">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-zinc-300">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="text-zinc-300">{filteredData.length}</span> entries
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1
                                        ? 'bg-primary-600 text-white'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

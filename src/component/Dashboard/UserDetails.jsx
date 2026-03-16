'use client'
import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Search, Trash2, ShieldCheck, Hash, Loader2, User, Globe, ShieldAlert, AlertCircle, ExternalLink } from 'lucide-react';

export default function UserDetails() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // 1. INITIAL FETCH
    const fetchAllUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/register');
            const result = await response.json();
            if (result.success) {
                setUsers(result.data);
                // Auto-select first user if none selected
                if (result.data.length > 0 && !selectedUser) {
                    setSelectedUser(result.data[0]);
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    // 2. DELETE LOGIC
    const handleDelete = async (id) => {
        if (!window.confirm("Permanent Action: Purge this identity from the vault?")) return;
        
        setActionLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/register/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                const updatedList = users.filter(u => u._id !== id);
                setUsers(updatedList);
                // Set the next available user as selected so the view stays active
                setSelectedUser(updatedList.length > 0 ? updatedList[0] : null);
            }
        } catch (error) {
            alert("Connection error: Could not reach the security vault.");
        } finally {
            setActionLoading(false);
        }
    };

    const filteredUsers = users.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-[#10B981]" size={40} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Registry...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans antialiased text-[#0F172A]">
            
            {/* SIDEBAR: MASTER LIST */}
            <div className="w-full md:w-[400px] bg-white border-r border-slate-200 flex flex-col h-full shadow-2xl z-20">
                <div className="p-8 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-xl font-black tracking-tight">Accounts</h1>
                            <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                                {filteredUsers.length} Verified Shards
                            </p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-xl">
                            <ShieldCheck className="text-slate-400" size={20} />
                        </div>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#10B981] transition-colors" size={16} />
                        <input 
                            type="text"
                            placeholder="Filter by email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-transparent rounded-xl py-3.5 pl-11 pr-4 text-xs font-bold outline-none focus:bg-white focus:border-[#10B981]/20 focus:ring-4 focus:ring-[#10B981]/5 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {filteredUsers.map((user) => (
                        <div 
                            key={user._id} 
                            onClick={() => setSelectedUser(user)}
                            className={`group p-4 rounded-2xl cursor-pointer transition-all border-l-4 ${
                                selectedUser?._id === user._id 
                                ? 'bg-[#F0FDF4] border-[#10B981] shadow-sm' 
                                : 'bg-white border-transparent hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                                    selectedUser?._id === user._id ? 'bg-[#10B981] text-white' : 'bg-slate-100 text-slate-400'
                                }`}>
                                    Active
                                </span>
                                <span className="text-[9px] font-bold text-slate-300">
                                    {new Date(user.createdAt).toLocaleDateString('en-GB')}
                                </span>
                            </div>
                            <h4 className="font-bold text-sm truncate">{user.email.split('@')[0]}</h4>
                            <p className="text-[11px] font-medium text-slate-400 truncate">{user.email}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* DETAIL VIEW: BENTO LAYOUT */}
            <div className="hidden md:flex flex-1 bg-[#F8FAFC] p-12 overflow-y-auto flex-col">
                {selectedUser ? (
                    <div className="max-w-3xl animate-in fade-in slide-in-from-right-8 duration-500">
                        
                        {/* Header Action Row */}
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#10B981]">
                                    <User size={40} />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-black tracking-tighter capitalize">
                                        {selectedUser.email.split('@')[0]}
                                    </h2>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                            <Mail size={14} className="text-[#10B981]" /> {selectedUser.email}
                                        </div>
                                        <span className="text-slate-200">|</span>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                            <Calendar size={14} /> Created {new Date(selectedUser.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => handleDelete(selectedUser._id)}
                                disabled={actionLoading}
                                className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm disabled:opacity-50"
                            >
                                {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                            </button>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <Hash className="text-[#10B981] mb-6" size={24} />
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Seeds Identifier</h5>
                                <p className="text-lg font-mono font-bold text-slate-800 break-all">{selectedUser._id}</p>
                            </div>

                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <Globe className="text-[#10B981] mb-6" size={24} />
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Network Status</h5>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                                    <p className="text-lg font-black uppercase">Live Connection</p>
                                </div>
                            </div>

                            {/* Large Security Card */}
                            <div className="col-span-2 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                                <ShieldAlert className="absolute -right-10 -bottom-10 text-white/5" size={200} />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                                        Security Protocol <AlertCircle className="text-emerald-500" size={20}/>
                                    </h3>
                                    <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-8">
                                        This identity is protected by end-to-end encryption. Any deletions are permanent and cannot be recovered from the shard.
                                    </p>
                                    <button className="flex items-center gap-2 bg-[#10B981] px-6 py-3 rounded-xl font-bold text-xs hover:bg-[#0da372] transition-colors">
                                        Audit Access <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                        <User size={80} className="mb-4 text-slate-300" />
                        <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">Empty Registry</p>
                    </div>
                )}
            </div>
        </div>
    );
}
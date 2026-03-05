'use client'
import axios from 'axios';
import {
    ArrowUpRight,
    Inbox,
    Loader2,
    Mail,
    Shield,
    Sprout,
    UserCheck,
    ShoppingBag
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProfessionalDataStudio() {
    // Fixed: Initial state now includes 'orders'
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ users: [], messages: [], seeds: [], orders: [] });
    const API_BASE = 'http://localhost:5000/api';

    useEffect(() => {
        const syncDataStream = async () => {
            setLoading(true);
            try {
                // Fetching all 4 endpoints simultaneously
                const [userRes, msgRes, seedRes, orderRes] = await Promise.all([
                    fetch(`${API_BASE}/register`).then(r => r.json()),
                    axios.get(`${API_BASE}/contact`),
                    fetch(`${API_BASE}/seeds`).then(r => r.json()),
                    fetch(`${API_BASE}/orders`).then(r => r.json())
                ]);

                setData({
                    users: userRes.success ? userRes.data : [],
                    // Axios uses .data, and we check for your backend's .success property
                    messages: msgRes.data?.success ? msgRes.data.data : [],
                    seeds: Array.isArray(seedRes) ? seedRes : (seedRes.data || []),
                    orders: Array.isArray(orderRes) ? orderRes : (orderRes.data || [])
                });
            } catch (err) {
                console.error("SYNC_ERROR:", err);
            } finally {
                setLoading(false);
            }
        };
        syncDataStream();
    }, []);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <Loader2 className="animate-spin text-slate-900 mb-4" size={32} />
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">Synchronizing Systems</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans pb-20">

            {/* --- HEADER DESIGN --- */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">Admin <span className="text-emerald-500">Dashboard</span></h1>
                    </div>

                    <nav className="hidden lg:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                        {[
                            { id: 'users', label: 'User Registry', icon: UserCheck },
                            { id: 'messages', label: 'Communications', icon: Inbox },
                            { id: 'seeds', label: 'Seed Catalog', icon: Sprout },
                            { id: 'orders', label: 'Order Details', icon: ShoppingBag }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-12">

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                    {[
                        { label: 'Users Accounts', count: data.users.length, color: 'from-blue-500 to-cyan-400' },
                        { label: 'Message Details', count: data.messages.length, color: 'from-indigo-600 to-violet-400' },
                        { label: 'Seeds Stock', count: data.seeds.length, color: 'from-emerald-500 to-teal-400' },
                        { label: 'Orders Processed', count: data.orders.length, color: 'from-orange-500 to-amber-400' }
                    ].map((stat, i) => (
                        <div key={i} className="relative group bg-white border border-slate-100 p-1 rounded-[3rem] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                            <div className="bg-white rounded-[2.8rem] p-10 h-full relative z-10 overflow-hidden">
                                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-full group-hover:scale-[3] transition-transform duration-1000`} />
                                <div className="relative">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-3">{stat.label}</p>
                                    <h4 className="text-7xl font-black text-slate-900 tracking-tighter">
                                        {stat.count.toString().padStart(2, '0')}
                                    </h4>
                                </div>
                                <div className="mt-10 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${stat.color} w-2/3 group-hover:w-full transition-all duration-1000 ease-out`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- CONTENT CONTAINER --- */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                    
                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div className="overflow-x-auto">
                            <div className="p-8 px-10 flex items-center justify-between border-b border-slate-50">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Access Directory</h3>
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1">Live_User_System</p>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="p-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Users_Identity</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="p-6 px-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {data.users.map((u) => (
                                        <tr key={u._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 px-10">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-500 font-bold border border-slate-200">
                                                    {u._id.slice(-2).toUpperCase()}
                                                </div>
                                            </td>
                                            <td className="p-6 font-bold text-slate-800">{u.email}</td>
                                            <td className="p-6"><span className="text-xs text-slate-400">Active User</span></td>
                                            <td className="p-6 px-10 text-right">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Manage <ArrowUpRight size={12} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* MESSAGES TAB */}
                    {activeTab === 'messages' && (
                        <div className="overflow-x-auto">
                            <div className="p-8 px-10 bg-white border-b border-slate-50 flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Communication_Logs</h3>
                            </div>
                            <table className="w-full text-left">
                                <tbody className="divide-y divide-slate-50">
                                    {data.messages.map((m) => (
                                        <tr key={m._id} className="group hover:bg-indigo-50/20 transition-all">
                                            <td className="p-8 px-10 w-1/3">
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-black text-slate-900 mb-1">{m.name}</span>
                                                    <span className="text-xs font-bold text-indigo-500">{m.email}</span>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 text-sm">
                                                    "{m.message}"
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* SEEDS TAB */}
                    {activeTab === 'seeds' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="p-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Variety</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Price</th>
                                        <th className="p-6 px-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {data.seeds.map((s) => (
                                        <tr key={s._id} className="group hover:bg-slate-50/80 transition-all">
                                            <td className="p-6 px-10">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                                        <img src={s.image} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900">{s.name}</p>
                                                        <p className="text-[10px] font-mono text-slate-400 uppercase">{s.category || 'General'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
                                                    {s.variety}
                                                </span>
                                            </td>
                                            <td className="p-6 font-black text-slate-900">₹{s.price}</td>
                                            <td className="p-6 px-10 text-right">
                                                <span className="text-[9px] font-black uppercase text-emerald-500">In Stock</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* ORDERS TAB (Fixed conditional) */}
                    {activeTab === 'orders' && (
                        <div className="overflow-x-auto">
                            <div className="p-8 px-10 flex items-center justify-between border-b border-slate-50">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Order Fulfillment</h3>
                                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mt-1">Live_Transaction_Monitor</p>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="p-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                                        <th className="p-6 px-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {data.orders.map((o) => (
                                        <tr key={o._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 px-10">
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 leading-none mb-1">{o.fullName}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">{o.contact}</p>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <p className="text-sm font-bold text-slate-700">{o.seedName}</p>
                                                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">{o.category}</p>
                                            </td>
                                            <td className="p-6 text-center">
                                                <span className="text-sm font-black text-slate-900">{o.quantity} KG</span>
                                            </td>
                                            <td className="p-6 px-10 text-right">
                                                <span className="text-xs font-medium text-slate-400 italic">
                                                    {new Date(o.createdAt).toLocaleDateString()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {data.orders.length === 0 && (
                                <div className="p-20 text-center">
                                    <p className="text-slate-300 font-bold italic">No active orders found in the registry.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
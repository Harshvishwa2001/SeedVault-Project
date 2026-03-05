'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Trash2, CheckCircle, Clock, Phone, User, Download, Search, RefreshCw, Package } from 'lucide-react';

export default function OrderDetails() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/orders');
            setOrders(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders", err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    // 1. FILTER LOGIC
    const filteredOrders = orders.filter(o =>
        o.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.seedName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. EXCEL DOWNLOAD (Filters with your search)
    const downloadExcel = () => {
        const dataToExport = filteredOrders.map(order => ({
            "Order ID": order._id.toUpperCase(),
            "Customer": order.fullName,
            "Contact": order.contact,
            "Category": order.category,
            "Product": order.seedName,
            "Weight": `${order.quantity} KG`,
            "Status": order.status,
            "Registry Date": new Date(order.createdAt).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
        XLSX.writeFile(workbook, `Order_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // 3. TOGGLE STATUS (BACKEND UPDATE)
    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
        try {
            await axios.patch(`http://localhost:5000/api/orders/${id}`, { status: newStatus });
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        } catch (err) {
            alert("Status update failed");
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm("Purge this record permanently?")) {
            try {
                await axios.delete(`http://localhost:5000/api/orders/${id}`);
                setOrders(orders.filter(o => o._id !== id));
            } catch (err) {
                alert("Failed to delete.");
            }
        }
    };

    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-300">
            <RefreshCw className="animate-spin" size={32} />
            <p className="font-black text-[10px] uppercase tracking-[0.5em]">Syncing_Database...</p>
        </div>
    );

    return (
        <div className="p-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 px-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Orders_Details</h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-2">Active Orders Requests</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    {/* Search Field */}
                    <div className="relative group flex-grow md:flex-grow-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="Search by name or product..."
                            className="pl-10 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all w-full"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={downloadExcel}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-3 shadow-lg shadow-emerald-200 active:scale-95"
                    >
                        <Download size={14} /> Download Report
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="p-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client & Contact</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Details</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quantity</th>
                            <th className="p-6 px-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Manage</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="group hover:bg-slate-50/50 transition-all">
                                <td className="p-6 px-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-slate-200">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-lg leading-none mb-1">{order.fullName}</p>
                                            <p className="text-xs font-bold text-slate-400 flex items-center gap-1 leading-none">
                                                <Phone size={10} /> {order.contact}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-6">
                                    <p className="font-bold text-slate-800 leading-none mb-1">{order.seedName}</p>
                                    <p className="text-[9px] font-black text-emerald-500 bg-emerald-50 inline-block px-2 py-0.5 rounded uppercase tracking-widest">{order.category}</p>
                                </td>

                                <td className="p-6 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black text-slate-900 leading-none">{order.quantity}</span>
                                        <span className="text-[10px] font-black text-slate-300 uppercase">KG_Units</span>
                                    </div>
                                </td>

                                <td className="p-6 px-10 text-right">
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredOrders.length === 0 && (
                    <div className="p-20 text-center">
                        <Package size={48} className="mx-auto text-slate-100 mb-4" />
                        <p className="text-slate-300 font-bold italic tracking-wide">No records found matching your query.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
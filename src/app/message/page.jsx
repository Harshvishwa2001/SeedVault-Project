'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, User, Calendar, MessageSquare, Trash2, ExternalLink, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MessageDetails() {
    const [messages, setMessages] = useState([]);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all messages from your app.get('/api/contact')
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/contact');
                if (res.data.success) {
                    setMessages(res.data.data);
                    if (res.data.data.length > 0) setSelectedMsg(res.data.data[0]);
                }
            } catch (err) {
                toast.error("Failed to load messages");
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    if (loading) return <div className="p-20 text-center font-black text-slate-400 animate-pulse">Loading Inquiries...</div>;

    const deletemessage = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        try {
            const response = await axios.delete(`http://localhost:5000/api/contact/${id}`);
            if (response.data.success) {
                toast.success("Message removed");

                // 1. Filter the list first
                const updatedMessages = messages.filter((msg) => msg._id !== id);
                setMessages(updatedMessages);

                // 2. FIXED: Use setSelectedMsg (the setter), not selectedMsg (the variable)
                if (selectedMsg?._id === id) {
                    setSelectedMsg(updatedMessages[0] || null);
                }
            }
        } catch (error) {
            toast.error("Could not delete message");
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen bg-[#FDFDFC]">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-slate-100 overflow-y-auto bg-white">
                <div className="p-6 border-b border-slate-50">
                    <h2 className="text-xl font-black text-slate-900">All Messages</h2>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{messages.length} Total Messages</p>
                </div>

                <div className="divide-y divide-slate-50">
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            onClick={() => setSelectedMsg(msg)}
                            className={`p-6 cursor-pointer transition-all ${selectedMsg?._id === msg._id ? 'bg-emerald-50/50 border-r-4 border-emerald-500' : 'hover:bg-slate-50'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-black uppercase tracking-tighter bg-slate-100 px-2 py-1 rounded text-slate-500">
                                    {msg.subject}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="font-bold text-slate-900 truncate">{msg.name}</h4>
                            <p className="text-sm text-slate-500 truncate">{msg.message}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            <div className="flex-1 overflow-y-auto p-12">
                {selectedMsg ? (
                    <div className="max-w-3xl">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 mb-2">{selectedMsg.name}</h1>
                                <div className="flex gap-4 text-slate-500 font-medium">
                                    <span className="flex items-center gap-1"><Mail size={16} /> {selectedMsg.email}</span>
                                    <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(selectedMsg.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => deletemessage(selectedMsg?._id)}
                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                            <div className="mb-6 pb-6 border-b border-slate-50">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Subject</h4>
                                <p className="text-xl font-bold text-slate-800">{selectedMsg.subject}</p>
                            </div>

                            <div>
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Message Content</h4>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                                    {selectedMsg.message}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300">
                        <MessageSquare size={64} className="mb-4 opacity-20" />
                        <p className="font-bold">Select a message to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}
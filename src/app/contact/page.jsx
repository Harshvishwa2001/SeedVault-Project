'use client'
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ChevronDown } from 'lucide-react'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "Seed Inquiry",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactForm((prev) => ({
            ...prev, [name]: value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent double submission
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/contact', contactForm);
            if (response.data.success) {
                toast.success('Message sent successfully!');
                setContactForm({ name: "", email: "", subject: "Seed Inquiry", message: "" });
            } else {
                toast.error(response.data.message || "Submission rejected by server");
            }
        } catch (error) {
            console.log("Submission Error", error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false); // Re-enable button
        }
    }

    return (
        <>
            <Header />
            <div className="bg-[#FDFDFC] min-h-screen pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header Section */}
                    <div className="max-w-2xl mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 mb-4">Get in Touch</h2>
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                            We're here to help <br />
                            <span className="text-emerald-600">your farm grow.</span>
                        </h1>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-16 items-start">

                        {/* Left Side: Contact Info */}
                        <div className="lg:col-span-2 space-y-12 px-6 py-20 ">
                            <div className="space-y-12 mt-10">
                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 shrink-0 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Email Us</h4>
                                        <p className="text-xl font-bold text-slate-900">support@SeedAdult.com</p>
                                        <p className="text-slate-500 font-medium">Response within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 shrink-0 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Call Support</h4>
                                        <p className="text-xl font-bold text-slate-900">+91 800-SEED-VLT</p>
                                        <p className="text-slate-500 font-medium">Mon-Fri, 9am - 6pm</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 shrink-0 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">HQ Office</h4>
                                        <p className="text-xl font-bold text-slate-900">Agro-Tech Park, Sector 44</p>
                                        <p className="text-slate-500 font-medium">Gurugram, HR 122003</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="lg:col-span-3">
                            <form onSubmit={onSubmit} className="bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            value={contactForm.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-slate-900 outline-none appearance-none cursor-pointer"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name='email'
                                            value={contactForm.email}
                                            onChange={handleChange}
                                            placeholder="john@farm.com"
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-slate-900 outline-none appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                                    <div className="group relative">
                                        <select
                                            name='subject'
                                            value={contactForm.subject}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-slate-900 outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select a subject</option>
                                            <option value="Seed Inquiry">Seed Inquiry</option>
                                            <option value="Distribution Partnership">Distribution Partnership</option>
                                            <option value="Technical Support">Technical Support</option>
                                            <option value="Other">Other</option>
                                        </select>

                                        {/* Custom Arrow Icon */}
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronDown className='text-slate-500' size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                                    <textarea
                                        name='message'
                                        value={contactForm.message}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="How can we help your harvest?"
                                        className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-slate-900 outline-none appearance-none cursor-pointer"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading} // FIXED: Disable button while loading
                                    className={`group flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black transition-all active:scale-[0.98] ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-emerald-600 text-white'}`}>
                                    {loading ? (
                                        <span className="animate-pulse">Sending...</span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
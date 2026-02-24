'use client'
import React from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react'
import Header from '@/component/Header'
import Footer from '@/component/Footer'

export default function ContactPage() {
    return (
        <>
        <Header/>
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
                                        <p className="text-xl font-bold text-slate-900">support@seedvault.com</p>
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
                            <form className="bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@farm.com"
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                                    <select className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-slate-500">
                                        <option>Seed Inquiry</option>
                                        <option>Distribution Partnership</option>
                                        <option>Technical Support</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="How can we help your harvest?"
                                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>

                                <button className="group flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-emerald-600 text-white py-5 rounded-2xl font-black transition-all active:scale-[0.98]">
                                    <span>Send Message</span>
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
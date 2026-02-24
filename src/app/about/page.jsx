'use client'
import React from 'react'
import { Target, Users, Sprout, ShieldCheck, ArrowRight, Zap } from 'lucide-react'
import Header from '@/component/Header'
import Footer from '@/component/Footer'

export default function AboutPage() {
    const pillars = [
        {
            title: "Verified Quality",
            desc: "Every seed batch undergoes rigorous 3-step testing for germination and purity before listing.",
            icon: <ShieldCheck className="text-emerald-500" />,
            color: "bg-emerald-50"
        },
        {
            title: "Direct Access",
            desc: "We bridge the gap between world-class labs and local farmers, removing unnecessary middlemen.",
            icon: <Zap className="text-blue-500" />,
            color: "bg-blue-50"
        },
        {
            title: "Expert Guidance",
            desc: "Our AI-driven matching system recommends seeds based on your specific soil and climate data.",
            icon: <Target className="text-amber-500" />,
            color: "bg-amber-50"
        }
    ]

    return (
        <>
        <Header/>
            <div className="bg-[#FDFDFC] min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 mb-6">Our Purpose</h2>
                            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-8">
                                Modernizing the <span className="text-emerald-600">Roots</span> of Agriculture.
                            </h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                SeedVault was founded in 2024 to solve a simple problem: Giving every farmer access to high-yield, verified seeds regardless of their location.
                            </p>
                        </div>
                    </div>
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-32 hidden lg:block" />
                </section>

                {/* Mission Section */}
                <section className="py-24 bg-white border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="aspect-square bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
                                        alt="Farmer in field"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Floating Card */}
                                <div className="absolute -bottom-10 -right-10 bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl hidden md:block max-w-xs">
                                    <p className="text-3xl font-black mb-2">99.2%</p>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Farmer Satisfaction Rate across India</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                                    We believe technology should work for the soil.
                                </h2>
                                <p className="text-lg text-slate-500 leading-relaxed">
                                    Traditional seed distribution is broken. Farmers often receive poor quality or fake seeds that lead to total harvest failure. <strong>SeedVault</strong> changes the narrative by providing a transparent, blockchain-verified marketplace for certified distributors.
                                </p>

                                <div className="space-y-4">
                                    {['Transparency in Pricing', 'Climate-Smart Recommendations', 'Direct Farm Delivery'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                                <ArrowRight size={14} className="text-white" />
                                            </div>
                                            <span className="font-bold text-slate-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pillars Section */}
                <section className="py-32">
                    <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                        <h2 className="text-4xl font-black text-slate-900">Built on Trust</h2>
                        <p className="text-slate-500 font-medium mt-4">The core values that drive every decision we make.</p>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                        {pillars.map((pillar, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                                <div className={`w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="bg-emerald-600 rounded-[4rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">Be part of the agricultural revolution.</h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all">
                                    Join as a Farmer
                                </button>
                                <button className="bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black border border-emerald-500 hover:bg-emerald-800 transition-all">
                                    Partner with Us
                                </button>
                            </div>
                        </div>
                        {/* Decorative Leaves */}
                        <div className="absolute top-0 left-0 opacity-10 pointer-events-none">
                            <Sprout size={300} />
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}
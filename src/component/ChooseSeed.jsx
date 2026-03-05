'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, MapPin, Search, ShieldCheck, TrendingUp, Users, ArrowUpRight, Tractor, ChevronRight, Landmark } from 'lucide-react'
import React, { useRef } from 'react'

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ChooseSeed() {
    const features = [
        {
            title: "Smart Search",
            desc: "Find the perfect seed variety based on your crop, climate, soil type, and season requirements.",
            icon: <Search size={22} />,
            accent: "emerald",
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            title: "Connect with Distributors",
            desc: "Locate and connect with certified seed dealers in your region. Direct access to trusted suppliers.",
            icon: <Users size={22} />,
            accent: "blue",
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            title: "Yield Information",
            desc: "Access detailed data on expected yields, resistance to diseases, and optimal growing conditions.",
            icon: <TrendingUp size={22} />,
            accent: "amber",
            gradient: "from-orange-400 to-amber-600"
        },
        {
            title: "Verified Quality",
            desc: "All seeds are verified by agricultural experts. Get quality assurance and traceability.",
            icon: <ShieldCheck size={22} />,
            accent: "purple",
            gradient: "from-purple-500 to-fuchsia-600"
        },
        {
            title: "Location-Based",
            desc: "Find seeds suitable for your specific region with localized recommendations.",
            icon: <MapPin size={22} />,
            accent: "rose",
            gradient: "from-rose-500 to-pink-600"
        },
        {
            title: "Track Orders",
            desc: "Monitor your seed requests and delivery status in real-time. Stay informed at every step.",
            icon: <Clock size={22} />,
            accent: "indigo",
            gradient: "from-indigo-500 to-blue-700"
        }
    ]

    const sectionRef = useRef(null)
    const ctaRef = useRef(null) // Added specific ref for CTA

    useGSAP(() => {
        // Feature Cards Animation
        gsap.from(".slider", {
            y: 80,
            opacity: 0,
            duration: 2, 
            ease: "power2.out",
        });
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className="py-32 bg-[#FDFDFC] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="slider text-center mb-20">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-600 mb-4">The Ecosystem</h2>
                    <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                        Why Choose <span className="text-emerald-600">SeedAdult?</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium py-6">
                        Empowering farmers with technology-driven solutions for better agricultural outcomes
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="group relative h-[380px] bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 flex flex-col justify-between p-10 overflow-hidden"
                        >
                            <div className={`absolute -right-8 -top-8 w-40 h-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 blur-2xl`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-lg group-hover:rotate-[10deg] transition-transform duration-500`}>
                                        {f.icon}
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-emerald-500 group-hover:border-emerald-100 group-hover:rotate-45 transition-all duration-500">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                                        {f.title}
                                    </h3>
                                    <p className="text-slate-500 text-[15px] leading-relaxed font-medium line-clamp-3">
                                        {f.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Verified</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
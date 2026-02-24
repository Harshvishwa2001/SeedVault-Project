'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, ShieldCheck, Zap, Globe, Leaf, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react';

export default function Hero() {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Targeted animations using the classes you provided
        tl.from(".hero-title", { y: 80, opacity: 0, duration: 1.4, stagger: 0.2 })
            .from(".hero-desc", { opacity: 0, y: 30, duration: 1 }, "-=1")
            .from(".hero-btn", { scale: 1, opacity: 1, duration: 2, stagger: 0.15 }, "-=1")
            .from(".hero-image-box", { x: 60, opacity: 0, rotate: 3, duration: 1.8 }, "-=1.2")
            .from(".stat-card", { scale: 0.5, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.6");

        // Subtle infinite pulse for the rings
        gsap.to(".ring-ping", {
            scale: 1,
            opacity: 0.3,
            duration: 4,
            repeat: -1,
            yoyo: true,
            stagger: 0.5,
            ease: "sine.inOut"
        });

        // 2. Slow Continuous Spin
        gsap.to(".ring-ping", {
            rotate: 360,
            duration: 50, // Higher number = Slower spin
            repeat: -1,
            ease: "none", // Essential for smooth, non-stop rotation
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative min-h-screen lg:min-h-[120vh] flex items-center bg-[#FAFAF9] overflow-hidden">
            {/* 1. Abstract Background Elements - Refined Opacity */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/40 skew-x-[-12deg] translate-x-20 z-0 hidden lg:block" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h1 className="hero-title text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[1.05] tracking-tight">
                                The Future of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500">
                                    Farming Security
                                </span>
                            </h1>

                            <p className="hero-desc text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                                Access India's most secure digital repository for certified seeds.
                                Connect with verified distributors and protect your harvest with data-driven insights.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <button className="hero-btn group px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-200 flex items-center gap-3">
                                Start Your Journey
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button className="hero-btn px-10 py-5 bg-white border border-slate-200 text-slate-800 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-sm">
                                View Seed Catalogue
                            </button>
                        </div>

                        {/* Feature Grid - Enhanced Spacing */}
                        <div className="hero-desc grid grid-cols-3 gap-8 pt-10 border-t border-slate-200/60">
                            <div className="space-y-3 group cursor-default">
                                <Zap className="text-emerald-500 group-hover:scale-110 transition-transform" size={26} />
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Track orders and delivery status
                                </p>
                            </div>
                            <div className="space-y-3 group cursor-default">
                                <Globe className="text-emerald-500 group-hover:scale-110 transition-transform" size={26} />
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Verified seed information</p>
                            </div>
                            <div className="space-y-3 group cursor-default">
                                <Leaf className="text-emerald-500 group-hover:scale-110 transition-transform" size={26} />
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">100% Organic</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT IMAGE SECTION */}
                    <div className="hero-image-box relative py-4">
                        {/* THE RINGS: Perfection in detail (Glass effect) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] z-10">
                            <div className="ring-ping absolute inset-0 border border-emerald-400 rounded-full" />
                            <div className="ring-ping absolute inset-10 border border-emerald-400 rounded-full" />
                            <div className="ring-ping absolute inset-20 border border-emerald-400 rounded-full" />
                        </div>

                        <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-12 border-white transition-all duration-1000 hover:rotate-0 rotate-1 bg-white">
                            <Image
                                width={600}
                                height={1000}
                                src="/image/hero.jpg"
                                alt="Modern Farming"
                                className="h-150 lg:h-150 object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            {/* Sophisticated Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Glass Stat Card: Perfection in Transparency */}
                        <div className="stat-card absolute -bottom-6 -left-10 md:left-[-5%] z-20 bg-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-[280px]">
                            <div className="flex items-center gap-5 mb-4">
                                <div className="p-4 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-200">
                                    <CheckCircle size={28} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-4xl font-black text-slate-900 leading-none tracking-tighter">98.4%</p>
                                    <p className="text-[10px] uppercase font-black text-emerald-600 tracking-[0.15em] mt-1.5">Success Rate</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                                "The highest verified germination standard in the industry."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
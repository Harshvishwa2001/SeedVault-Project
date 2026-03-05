'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight, Landmark, Tractor } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react'

export default function Improveseed() {
    const ctaRef = useRef(null) // Added specific ref for CTA

    useGSAP(() => {
        // CTA Content Animation - Fixed 'container' error by using ctaRef
        gsap.from(ctaRef.current, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 90%", // Triggers even earlier for the footer section
            }
        });
    }, { scope: ctaRef })

    return (
        <div>
            <div ref={ctaRef} className="cta-content relative overflow-hidden bg-slate-900  p-12 lg:p-24 text-center">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                    <div className="space-y-6">
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                            Ready to Improve <br />
                            <span className="text-emerald-400">Your Harvest?</span>
                        </h1>
                        <p className="text-slate-400 text-lg lg:text-xl font-medium max-w-xl mx-auto leading-relaxed">
                            Join thousands of farmers who are already using SeedAdult to make smarter seed choices.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <Link href="/signin">
                            <button className="group relative flex items-center gap-4 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-6 rounded-3xl transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] hover:-translate-y-1 active:scale-95">
                                <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
                                    <Tractor size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Start Growing</p>
                                    <p className="text-lg font-bold">Register A Farmer</p>
                                </div>
                                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/signin">
                            <button className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-6 rounded-3xl transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 active:scale-95">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                                    <Landmark size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expand Reach</p>
                                    <p className="text-lg font-bold">Become a Distributor</p>
                                </div>
                                <ChevronRight className="ml-2 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

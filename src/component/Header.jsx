'use client'
import React, { useState, useEffect } from 'react'
import { Sprout, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 w-full flex justify-center pt-4 px-4 lg:px-8`}>
            <nav
                className={`w-full max-w-7xl transition-all duration-500 flex items-center justify-between px-6 lg:px-10 py-3 
                ${isScrolled
                        ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 rounded-2xl '
                        : 'bg-transparent rounded-none'}`}
            >
                {/* LOGO SECTION */}
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                        <Sprout
                            className="relative bg-gradient-to-br from-[#00C853] to-[#00a63d] text-white p-2 rounded-xl shadow-lg shadow-emerald-200"
                            size={50}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                            Seed<span className="text-emerald-600">Vault</span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">
                            Agricultural Excellence
                        </span>
                    </div>
                </Link>

                {/* NAVIGATION LINKS */}
                <div className="hidden md:flex items-center gap-8">
                    {['Features', 'Seeds', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="relative text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 active:scale-95"
                    >
                        <User size={16} />
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    )
}
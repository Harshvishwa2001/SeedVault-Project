'use client'
import React, { useState, useEffect } from 'react'
import { Sprout, User, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [user, setUser] = useState(null)
    const router = useRouter()

    // Function to sync user state with localStorage
    const checkUser = () => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            try {
                setUser(JSON.parse(loggedInUser));
            } catch (e) {
                console.error("Error parsing user data", e);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        // Initial check
        checkUser();

        const handleScroll = () => setIsScrolled(window.scrollY > 20);

        // Listen for standard storage changes (other tabs) and custom login events (same tab)
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('storage', checkUser);
        window.addEventListener('userLogin', checkUser);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('userLogin', checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 w-full flex justify-center pt-4 px-4 lg:px-8`}>
            <nav className={`w-full max-w-7xl transition-all duration-500 flex items-center justify-between px-6 lg:px-10 py-3 
                ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 rounded-2xl' : 'bg-transparent'}`}>

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3 group">
                    <Sprout className="bg-emerald-600 text-white p-2 rounded-xl" size={40} />
                    <span className="text-xl font-black text-slate-900">Seed<span className="text-emerald-600">Vault</span></span>
                </Link>

                {/* NAV LINKS */}
                <div className="hidden md:flex items-center gap-8">
                    {['Features', 'Seeds', 'Contact', 'About'].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* AUTH BUTTONS */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="group relative flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white transition-all">
                            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
                                <User size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-slate-400 leading-none tracking-widest">Profile</span>
                                <span className="text-xs font-bold text-slate-900">{user.name}</span>
                            </div>

                            {/* DROPDOWN */}
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">  
                                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all active:scale-95">
                            <User size={16} /> Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}
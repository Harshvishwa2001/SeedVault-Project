"use client";

import { useGSAP } from '@gsap/react';
import axios from 'axios';
import gsap from 'gsap';
import { ArrowRight, Eye, EyeOff, Sprout } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateUser() {
    const [showPassword, setShowPassword] = useState(false);
    const logoref = useRef();
    const [formdata, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();

    useGSAP(() => {
        gsap.from('.logo', {
            scale: -0.5,
            duration: 2,
            opacity: 0,
            ease: "power4.out"
        }),
            gsap.from('.contain', {
                x: 50,
                duration: 2,
                opacity: 0,
                ease: "power4.out"
            })
    });

    const handleChange = (e) => {
        // Determine field by name attribute or type
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!formdata.email || !formdata.password) {
            return toast.error("Please fill in all fields");
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', formdata);
            const data = response.data;
            console.log("data :", data)

            if (response.status === 200 || response.status === 201) {
                toast.success("Account created! Redirecting...");
                setTimeout(() => router.push("/login"), 1500);
            }
        } catch (error) {
            console.error("Signup Error:", error);
            // Extract the error message sent by your backend
            const message = error.response?.data?.message || "Server Error";
            toast.error(message);
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans">
            {/* LEFT SIDE: LOGIN FORM */}
            <div className="contain w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                            Create A User SeedAdult
                        </h2>
                    </div>

                    <form className="space-y-7" onSubmit={handleSignUp}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-800 uppercase tracking-[0.15em] ml-1">
                                Email ID
                            </label>
                            <input
                                required
                                name="email"
                                value={formdata.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-5 py-4 bg-[#F4F7F9] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 relative">
                            <label className="text-[11px] font-black text-slate-800 uppercase tracking-[0.15em]">
                                Password Key
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    name="password"
                                    value={formdata.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="............"
                                    className="w-full px-5 py-4 bg-[#F4F7F9] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none transition-all text-slate-700 tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} strokeWidth={2.5} /> : <Eye size={20} strokeWidth={2.5} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#00A65A] hover:bg-[#008E4D] active:scale-[0.98] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-500/20 text-sm tracking-widest uppercase"
                        >
                            Sign Up<ArrowRight size={20} strokeWidth={3} />
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-12 pt-8 border-t border-slate-100 space-y-5">
                        <Link href="/login" className="font-bold decoration-2">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors block">
                                You have an account?{' '}
                                Login
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: BRANDING & LOGO */}
            <div className="hidden md:flex md:w-1/2 bg-[#F8F9FB] flex-col items-center justify-center p-12 relative">
                {/* Subtle Dot Grid Overlay */}
                <div ref={logoref}
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1.5px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />

                <div className="logo relative z-10 text-center flex flex-col items-center">
                    <div className="bg-white rounded-4xl p-6 shadow-xl mb-8 border border-gray-100 flex items-center justify-center">
                        {/* Logo Placeholder */}
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                            <div className="bg-green-600 p-2 rounded-4xl">
                                <Sprout className="text-white" size={100} />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-black italic tracking-tight text-slate-900 mb-4">
                        Create A User SeedAdult
                    </h1>
                    <p className="text-slate-500 text-lg max-w-sm font-medium leading-relaxed">
                        Create to access the User SeedAdult.
                    </p>
                </div>
            </div>
        </div>
    );
}
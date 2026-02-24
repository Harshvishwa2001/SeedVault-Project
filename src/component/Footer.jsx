'use client'
import React from 'react'
import { Leaf, ArrowUpRight, Sprout } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

          {/* Brand Info */}
          <div className="max-w-sm space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#00c452] rounded-xl flex items-center justify-center text-white">
                <Sprout size={22} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">SeedVault</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed">
              A professional ecosystem for high-quality agricultural seeds and smart farming solutions.
            </p>
          </div>

          {/* Simple Links - Exactly Four */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <Link href="/catalog" className="group flex items-center gap-1 text-slate-200 hover:text-emerald-600 font-bold transition-all">
              Browse Seeds
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
            </Link>
            <Link href="/about" className="group flex items-center gap-1 text-slate-200 hover:text-emerald-600 font-bold transition-all">
              About Us
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
            </Link>
            <Link href="/contact" className="group flex items-center gap-1 text-slate-200 hover:text-emerald-600 font-bold transition-all">
              Contact
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
            </Link>
            <Link href="/terms" className="group flex items-center gap-1 text-slate-200 hover:text-emerald-600 font-bold transition-all">
              Privacy
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
            </Link>
          </div>
        </div>

        {/* Simple Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-100 text-sm font-medium">
            © {currentYear} SeedVault. Verified Agricultural Platform.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-100">System Live</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
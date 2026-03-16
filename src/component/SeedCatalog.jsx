'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Star, MapPin, Search, Filter, Leaf, CheckCircle2, Plus, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SeedCatalog() {
    const [seeds, setSeeds] = useState([]) // State for database seeds
    const [loading, setLoading] = useState(true) // Loading state
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('All Seeds')
    const [compareList, setCompareList] = useState([])

    // --- FETCH DATA FROM BACKEND ---
    useEffect(() => {
        const fetchSeeds = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/seeds');
                if (!response.ok) throw new Error('Failed to fetch seeds');
                const data = await response.json();
                setSeeds(data);
            } catch (error) {
                console.error("Error fetching seeds:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeeds();
    }, []);

    const categories = ['All Seeds', 'Wheat', 'Paddy', 'Maize', 'Oilseeds', 'Pulses', 'Sugarcane', 'Millets']

    // --- FILTER LOGIC ---
    const filteredSeeds = useMemo(() => {
        return seeds.filter(seed => {
            const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seed.variety.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = activeFilter === 'All Seeds' || seed.category === activeFilter
            return matchesSearch && matchesCategory
        })
    }, [searchTerm, activeFilter, seeds])

    const toggleCompare = (name) => {
        setCompareList(prev =>
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        )
    }

    return (
        <section className="py-20 bg-[#FDFDFC] min-h-screen">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="mb-12 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Seeds <span className="text-emerald-600">Inventory</span></h1>
                            <p className="text-slate-500 font-medium text-sm mt-1">
                                {loading ? "Syncing with vault..." : `Showing ${filteredSeeds.length} verified seed varieties`}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {compareList.length > 0 && (
                                <button className="bg-white border-2 border-emerald-600 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm">
                                    Compare ({compareList.length}) <ArrowRight size={14} />
                                </button>
                            )}
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search varieties..."
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                        <div className="flex items-center gap-2 text-slate-400 mr-2 border-r border-slate-200 pr-4 shrink-0">
                            <Filter size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Filter By</span>
                        </div>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all uppercase tracking-wider ${activeFilter === cat
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                    : 'bg-white text-slate-400 border border-slate-100 hover:border-emerald-200 hover:text-emerald-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Seed Grid or Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-emerald-600" size={48} />
                        <p className="text-slate-400 font-bold animate-pulse">Accessing Secure Inventory...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSeeds.length > 0 ? (
                            filteredSeeds.map((seed, idx) => (
                                <div key={seed._id || idx} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
                                    <div className="h-60 relative overflow-hidden bg-slate-200">
                                        <img
                                            src={seed.image}
                                            alt={seed.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            // FALLBACK: If the image name in DB doesn't match a file in the folder
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                            }}
                                        />
                                        <div className="absolute top-5 right-5">
                                            <div className={`z-10 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-lg ${seed.tag === 'Limited' ? 'bg-orange-500' : 'bg-emerald-600'}`}>
                                                {seed.tag || "In Stock"}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => toggleCompare(seed.name)}
                                            className={`absolute bottom-5 left-5 p-3 rounded-2xl backdrop-blur-md transition-all ${compareList.includes(seed.name) ? 'bg-emerald-500 text-white' : 'bg-white/80 text-slate-900 hover:bg-white'}`}
                                        >
                                            {compareList.includes(seed.name) ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                                        </button>
                                    </div>

                                    <div className="p-8 space-y-5">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">{seed.name}</h3>
                                                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{seed.variety}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl border border-amber-100">
                                                <Star size={14} fill="currentColor" />
                                                <span className="text-sm font-black">{seed.rating}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                                                    <MapPin size={16} />
                                                </div>
                                                <span className="font-bold text-sm tracking-tight">{seed.location}</span>
                                            </div>

                                            <div className="bg-slate-50/80 rounded-[1.5rem] p-4 border border-slate-100">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yield / Season</span>
                                                    <span className="text-xs font-black text-slate-700">{seed.yield} • {seed.season}</span>
                                                </div>
                                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full w-[75%]" />
                                                </div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <Leaf size={14} className="text-emerald-500" />
                                                    <span className="text-[11px] font-bold text-emerald-700">Maturity: {seed.maturity}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price / KG</span>
                                                <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{seed.price}</span>
                                            </div>
                                            <Link href={`/seeds`}>
                                                <button className="bg-slate-900 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl">
                                                    Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center flex flex-col items-center gap-4">
                                <Search size={40} className="text-slate-200" />
                                <h2 className="text-xl font-black text-slate-900">No Seeds Found</h2>
                                <p className="text-slate-400 font-medium">Try changing your filters or search term.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
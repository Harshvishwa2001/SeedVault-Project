'use client'
import React, { useState, useMemo } from 'react'
import { Star, MapPin, Search, Filter, Leaf, CheckCircle2, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SeedCatalog() {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('All Seeds')
    const [compareList, setCompareList] = useState([])

    const dummySeeds = [
        { name: "Premium Wheat Seeds", variety: "HD-3086", location: "Punjab", season: "Rabi", yield: "45-50 q/ha", price: "850", rating: "4.5", tag: "In Stock", trait: "Rust resistant", category: "Wheat", image: "/SeedImage/Premium Wheat Seeds.jpg" },
        { name: "Basmati Rice Seeds", variety: "Pusa-1121", location: "Haryana", season: "Kharif", yield: "35-40 q/ha", price: "1200", rating: "4.8", tag: "In Stock", trait: "Bacterial blight resistant", category: "Paddy", image: "/SeedImage/Basmati Rice Seeds.jpg" },
        { name: "Hybrid Corn Seeds", variety: "NK-6240", location: "Karnataka", season: "Kharif", yield: "80-90 q/ha", price: "950", rating: "4.6", tag: "In Stock", trait: "Stem borer resistant", category: "Maize", image: "/SeedImage/Hybrid Corn Seeds.jpg" },
        { name: "Organic Soybeans", variety: "JS-335", location: "Madhya Pradesh", season: "Kharif", yield: "25-30 q/ha", price: "1100", rating: "4.4", tag: "Limited", trait: "High protein content", category: "Oilseeds", image: "/SeedImage/Organic Soybeans.jpg" },
        { name: "Mustard Gold", variety: "Pusa Bold", location: "Rajasthan", season: "Rabi", yield: "20-25 q/ha", price: "700", rating: "4.7", tag: "In Stock", trait: "High oil extraction", category: "Oilseeds", image: "/SeedImage/Mustard.jpg" },
        { name: "Desi Chickpeas", variety: "RVG-202", location: "Gujarat", season: "Rabi", yield: "15-20 q/ha", price: "900", rating: "4.3", tag: "In Stock", trait: "Drought tolerant", category: "Pulses", image: "/SeedImage/Desi Chickpeas.jpg" },
        { name: "SugarKing Cane", variety: "Co-86032", location: "Tamil Nadu", season: "Annual", yield: "120-150 t/ha", price: "450", rating: "4.2", tag: "Limited", trait: "High sucrose recovery", category: "Sugarcane", image: "/SeedImage/SugarKing Cane.jpg" },
        { name: "Pearl Millet (Bajra)", variety: "HHB-67", location: "Rajasthan", season: "Kharif", yield: "25-30 q/ha", price: "550", rating: "4.5", tag: "In Stock", trait: "Heat tolerant", category: "Millets", image: "/SeedImage/Pearl Millet (Bajra).jpg" },
        { name: "Red Lentils", variety: "IPL-316", location: "Uttar Pradesh", season: "Rabi", yield: "18-22 q/ha", price: "1050", rating: "4.6", tag: "In Stock", trait: "Early maturing", category: "Pulses", image: "/SeedImage/Red Lentils.jpg" }
    ]

    const categories = ['All Seeds', 'Wheat', 'Paddy', 'Maize', 'Oilseeds', 'Pulses', 'Sugarcane', 'Millets']

    const filteredSeeds = useMemo(() => {
        return dummySeeds.filter(seed => {
            const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seed.variety.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = activeFilter === 'All Seeds' || seed.category === activeFilter
            return matchesSearch && matchesCategory
        })
    }, [searchTerm, activeFilter])

    const toggleCompare = (name) => {
        setCompareList(prev =>
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        )
    }

    return (
        <section className="py-12 bg-[#FDFDFC] min-h-screen">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header with Comparison Counter */}
                <div className="mb-12 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Vault <span className="text-emerald-600">Inventory</span></h1>
                            <p className="text-slate-500 font-medium text-sm mt-1">Showing {filteredSeeds.length} verified seed varieties</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {compareList.length > 0 && (
                                <button className="bg-white border-2 border-emerald-600 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-right-4 transition-all">
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

                {/* Seed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSeeds.length > 0 ? (
                        filteredSeeds.map((seed, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
                                <div className="h-60 relative overflow-hidden bg-slate-200">
                                    <img
                                        src={seed.image}
                                        alt={seed.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="absolute top-5 right-5 flex flex-col gap-2">
                                        <div className={`z-10 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-lg ${seed.tag === 'Limited' ? 'bg-orange-500' : 'bg-emerald-600'}`}>
                                            {seed.tag}
                                        </div>
                                    </div>

                                    {/* Compare Button on Image */}
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
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Season</span>
                                                <span className="text-xs font-black text-slate-700">{seed.season}</span>
                                            </div>
                                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full w-[70%]" />
                                            </div>
                                            <div className="mt-3 flex items-center gap-2">
                                                <Leaf size={14} className="text-emerald-500" />
                                                <span className="text-[11px] font-bold text-emerald-700">{seed.trait}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Price / KG</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{seed.price}</span>
                                            </div>
                                        </div>
                                        <Link href="/seeds">
                                            <button className="bg-slate-900 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-200 group-hover:shadow-emerald-100">
                                                Request Seeds
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                                <Search size={40} />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">No Seeds Found</h2>
                            <p className="text-slate-400 font-medium max-w-xs">We couldn't find any varieties matching your current search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
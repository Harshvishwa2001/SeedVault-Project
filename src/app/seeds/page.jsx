'use client'
import ChooseSeed from '@/component/ChooseSeed'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import Testimonials from '@/component/Testimonial'
import { ArrowRight, CheckCircle2, Clock, Droplets, Filter, Leaf, MapPin, Navigation, Plus, Quote, Search, ShieldCheck, Star, Thermometer, X } from 'lucide-react'
import { Activity, useMemo, useState } from 'react'
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

export default function SeedCatalog() {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('All Seeds')
    const [compareList, setCompareList] = useState([])
    const [selectedSeed, setSelectedSeed] = useState(null)

    const dummySeeds = [
        // --- WHEAT CATEGORY ---
        {
            name: "Premium Wheat Seeds",
            variety: "HD-3086 (Pusa Baker)",
            location: "Punjab, India",
            season: "Rabi",
            yield: "45-50 q/ha",
            price: "850",
            rating: "4.5",
            tag: "In Stock",
            trait: "Rust resistant",
            category: "Wheat",
            image: "/SeedImage/Premium Wheat Seeds.jpg",
            ph: "6.0 - 7.5",
            germination: "98%",
            depth: "4-5 cm",
            spacing: "22.5 cm",
            maturity: "140 Days",
            water: "Moderate",
            purity: "99.9%"
        },

        // --- PADDY (RICE) CATEGORY ---
        {
            name: "Basmati Rice Seeds",
            variety: "Pusa-1121",
            location: "Haryana, India",
            season: "Kharif",
            yield: "35-40 q/ha",
            price: "1200",
            rating: "4.8",
            tag: "In Stock",
            trait: "Bacterial blight resistant",
            category: "Paddy",
            image: "/SeedImage/Basmati Rice Seeds.jpg",
            ph: "5.5 - 6.5",
            germination: "95%",
            depth: "2-3 cm",
            spacing: "20 cm",
            maturity: "145 Days",
            water: "High",
            purity: "99.0%"
        },

        // --- MAIZE (CORN) CATEGORY ---
        {
            name: "Hybrid Corn Seeds",
            variety: "NK-6240",
            location: "Karnataka",
            season: "Kharif",
            yield: "80-90 q/ha",
            price: "950",
            rating: "4.6",
            tag: "In Stock",
            trait: "Stem borer resistant",
            category: "Maize",
            image: "/SeedImage/Hybrid Corn Seeds.jpg",
            ph: "5.8 - 7.0",
            germination: "97%",
            depth: "5 cm",
            spacing: "60 cm",
            maturity: "110 Days",
            water: "Moderate",
            purity: "98.5%"
        },

        // --- OILSEEDS CATEGORY ---
        {
            name: "Organic Soybeans",
            variety: "JS-335",
            location: "Maharashtra",
            season: "Kharif",
            yield: "25-30 q/ha",
            price: "1100",
            rating: "4.4",
            tag: "Limited",
            trait: "High protein content",
            category: "Oilseeds",
            image: "/SeedImage/Organic Soybeans.jpg",
            ph: "6.0 - 7.5",
            germination: "92%",
            depth: "3-4 cm",
            spacing: "45 cm",
            maturity: "105 Days",
            water: "Moderate",
            purity: "99.2%"
        },
        {
            name: "Mustard Gold",
            variety: "Pusa Bold",
            location: "Rajasthan",
            season: "Rabi",
            yield: "20-25 q/ha",
            price: "700",
            rating: "4.7",
            tag: "In Stock",
            trait: "High oil extraction",
            category: "Oilseeds",
            image: "/SeedImage/Mustard.jpg",
            ph: "6.0 - 7.0",
            germination: "94%",
            depth: "2-3 cm",
            spacing: "30 cm",
            maturity: "120 Days",
            water: "Low",
            purity: "99.7%"
        },

        // --- PULSES CATEGORY ---
        {
            name: "Desi Chickpeas",
            variety: "RVG-202",
            location: "Gujarat",
            season: "Rabi",
            yield: "15-20 q/ha",
            price: "900",
            rating: "4.3",
            tag: "In Stock",
            trait: "Drought tolerant",
            category: "Pulses",
            image: "/SeedImage/Desi Chickpeas.jpg",
            ph: "6.0 - 8.0",
            germination: "95%",
            depth: "7-10 cm",
            spacing: "30 cm",
            maturity: "115 Days",
            water: "Low",
            purity: "99.4%"
        },
        {
            name: "Red Lentils",
            variety: "IPL-316",
            location: "Uttar Pradesh",
            season: "Rabi",
            yield: "18-22 q/ha",
            price: "1050",
            rating: "4.6",
            tag: "In Stock",
            trait: "Early maturing",
            category: "Pulses",
            image: "/SeedImage/Red Lentils.jpg",
            ph: "6.5 - 7.5",
            germination: "96%",
            depth: "3-4 cm",
            spacing: "20 cm",
            maturity: "100 Days",
            water: "Low",
            purity: "99.6%"
        },

        // --- SPECIALTY CATEGORY ---
        {
            name: "SugarKing Cane",
            variety: "Co-86032",
            location: "Tamil Nadu",
            season: "Annual",
            yield: "120-150 t/ha",
            price: "450",
            rating: "4.2",
            tag: "Limited",
            trait: "High sucrose recovery",
            category: "Sugarcane",
            image: "/SeedImage/SugarKing Cane.jpg",
            ph: "6.5 - 7.5",
            germination: "N/A (Setts)",
            depth: "10 cm",
            spacing: "90 cm",
            maturity: "360 Days",
            water: "Very High",
            purity: "98.0%"
        },
        {
            name: "Pearl Millet (Bajra)",
            variety: "HHB-67",
            location: "Rajasthan",
            season: "Kharif",
            yield: "25-30 q/ha",
            price: "550",
            rating: "4.5",
            tag: "In Stock",
            trait: "Heat tolerant",
            category: "Millets",
            image: "/SeedImage/Pearl Millet (Bajra).jpg",
            ph: "7.0 - 8.5",
            germination: "90%",
            depth: "2-3 cm",
            spacing: "45 cm",
            maturity: "85 Days",
            water: "Very Low",
            purity: "99.1%"
        }
    ];

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
        <>
            <Header />
            <section className="py-30 bg-[#FDFDFC] min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-6">

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
                                            <button onClick={() => setSelectedSeed(seed)} className="bg-slate-900 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-200 group-hover:shadow-emerald-100">
                                                Details
                                            </button>
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
                {selectedSeed && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        {/* Backdrop with stronger blur */}
                        <div
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-500"
                            onClick={() => setSelectedSeed(null)}
                        />

                        {/* Modal Content */}
                        <div className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedSeed(null)}
                                className="absolute top-6 right-6 z-30 bg-white/90 p-2 rounded-full hover:bg-emerald-600 hover:text-white text-slate-900 transition-all shadow-lg"
                            >
                                <X size={20} />
                            </button>

                            {/* Left: Image & Badge Section */}
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-100">
                                <img src={selectedSeed.image} className="w-full h-full object-cover" alt={selectedSeed.name} />
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-white/20">
                                    <p className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-1">Stock Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-white font-bold text-sm">{selectedSeed.tag} — Verified Batch</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Detailed Info Section */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 space-y-8 overflow-y-auto max-h-[90vh]">
                                {/* Title Area */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Leaf className="text-emerald-600" size={16} />
                                        <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">{selectedSeed.category}</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-slate-900 leading-tight">{selectedSeed.name}</h2>
                                    <p className="text-slate-400 font-bold text-sm mt-1">Variety: <span className="text-slate-600">{selectedSeed.variety}</span></p>
                                </div>

                                {/* Technical Info Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: 'Yield', val: selectedSeed.yield, icon: <Activity size={14} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                        { label: 'Germination', val: selectedSeed.germination, icon: <ShieldCheck size={14} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                                        { label: 'Soil pH', val: selectedSeed.ph, icon: <Thermometer size={14} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                                        { label: 'Maturity', val: selectedSeed.maturity, icon: <Clock size={14} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                                        { label: 'Water', val: selectedSeed.water, icon: <Droplets size={14} />, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                                        { label: 'Purity', val: selectedSeed.purity, icon: <CheckCircle2 size={14} />, color: 'text-rose-600', bg: 'bg-rose-50' },
                                    ].map((item, i) => (
                                        <div key={i} className={`${item.bg} p-4 rounded-2xl border border-white transition-transform hover:scale-105`}>
                                            <div className={`${item.color} mb-2`}>{item.icon}</div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                            <p className="text-sm font-black text-slate-900">{item.val}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Sowing Details Bar */}
                                <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                            <Navigation size={20} className="text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sowing Guide</p>
                                            <p className="text-sm font-bold">{selectedSeed.depth} depth • {selectedSeed.spacing} spacing</p>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Best Season</p>
                                        <p className="text-sm font-bold text-emerald-400">{selectedSeed.season}</p>
                                    </div>
                                </div>

                                {/* Action Footer */}
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Market Price</p>
                                        <p className="text-3xl font-black text-slate-900">₹{selectedSeed.price}<span className="text-sm font-medium text-slate-400">/kg</span></p>
                                    </div>
                                    <button className="flex-[2] bg-emerald-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 hover:bg-slate-900 transition-all active:scale-95">
                                        Request Bulk Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <ChooseSeed/>
                <Testimonials />
            </section>
            <Footer />
        </>
    )
}


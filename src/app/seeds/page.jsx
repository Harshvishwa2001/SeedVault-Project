'use client'
import ChooseSeed from '@/component/ChooseSeed'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import Testimonials from '@/component/Testimonial'
import axios from 'axios' // Added axios import
import {
    Activity,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Droplets,
    Filter,
    Leaf,
    MapPin,
    Navigation,
    Plus,
    Search,
    ShieldCheck,
    Star,
    X
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

export default function SeedCatalog() {
    // State management
    const [seeds, setSeeds] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('All Seeds')
    const [compareList, setCompareList] = useState([])
    const [selectedSeed, setSelectedSeed] = useState(null)
    const [isOrdering, setIsOrdering] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false) // For button loading state

    // Form state initialized with empty/default values to prevent null reference errors
    const [formData, setFormData] = useState({
        fullName: '',
        contact: '',
        category: 'Individual Farmer',
        quantity: '',
        seedName: '',
        seedVariety: ''
    });

    // Sync form data whenever a seed is selected or ordering state changes
    useEffect(() => {
        if (selectedSeed) {
            setFormData(prev => ({
                ...prev,
                seedName: selectedSeed.name,
                seedVariety: selectedSeed.variety
            }));
        }
    }, [selectedSeed]);

    // Data Fetching Logic
    useEffect(() => {
        const fetchSeeds = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/seeds');
                const data = await response.json();
                setSeeds(data);
            } catch (error) {
                console.error("Error fetching seeds:", error);
                toast.error("Failed to load inventory.");
            } finally {
                setLoading(false);
            }
        };

        fetchSeeds();
    }, []);

    const categories = ['All Seeds', 'Wheat', 'Paddy', 'Maize', 'Oilseeds', 'Pulses', 'Sugarcane', 'Millets']

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

    const handleCloseModal = () => {
        setSelectedSeed(null);
        setIsOrdering(false);
        // Optional: Reset form except user identity info
        setFormData(prev => ({ ...prev, quantity: '', seedName: '', seedVariety: '' }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:5000/api/orders', formData);
            toast.success("Order Request Sent Successfully!");
            handleCloseModal();
        } catch (error) {
            console.error("Error saving order:", error);
            toast.error("Failed to send order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <section className="py-20 bg-[#FDFDFC] min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-6">

                    {/* Header & Controls */}
                    <div className="mb-12 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Seeds <span className="text-emerald-600">Inventory</span></h1>
                                <p className="text-slate-500 font-medium text-sm mt-1">
                                    {loading ? 'Synchronizing inventory...' : `Showing ${filteredSeeds.length} verified seed varieties`}
                                </p>
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
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="h-96 bg-slate-100 rounded-[2.5rem] animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredSeeds.map((seed, idx) => (
                                <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
                                    <div className="h-60 relative overflow-hidden bg-slate-200">
                                        <img src={seed.image} alt={seed.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute top-5 right-5">
                                            <div className={`text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-lg ${seed.tag === 'Limited' ? 'bg-orange-500' : 'bg-emerald-600'}`}>
                                                {seed.tag}
                                            </div>
                                        </div>
                                        <button onClick={() => toggleCompare(seed.name)} className={`absolute bottom-5 left-5 p-3 rounded-2xl backdrop-blur-md transition-all ${compareList.includes(seed.name) ? 'bg-emerald-500 text-white' : 'bg-white/80 text-slate-900 hover:bg-white'}`}>
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
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <MapPin size={16} className="text-emerald-600" />
                                            <span className="font-bold text-sm tracking-tight">{seed.location}</span>
                                        </div>
                                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price / KG</span>
                                                <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{seed.price}</span>
                                            </div>
                                            <button onClick={() => setSelectedSeed(seed)} className="bg-slate-900 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Modal System */}
                {selectedSeed && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={handleCloseModal} />
                        <div className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
                            <button onClick={handleCloseModal} className="absolute top-6 right-6 z-30 bg-white/90 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all shadow-lg">
                                <X size={20} />
                            </button>

                            {/* Modal Left Image */}
                            <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-slate-100">
                                <img src={selectedSeed.image} className="w-full h-full object-cover" alt={selectedSeed.name} />
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-white/20">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-white font-bold text-sm">{selectedSeed.tag} — Verified</span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Right Details */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                                {!isOrdering ? (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Leaf className="text-emerald-600" size={16} />
                                                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">{selectedSeed.category}</span>
                                            </div>
                                            <h2 className="text-4xl font-black text-slate-900 leading-tight">{selectedSeed.name}</h2>
                                            <p className="text-slate-400 font-bold text-sm mt-1">Variety: <span className="text-slate-600">{selectedSeed.variety}</span></p>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {[
                                                { label: 'Yield', val: selectedSeed.yield, icon: <Activity size={14} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                                { label: 'Maturity', val: selectedSeed.maturity, icon: <Clock size={14} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                                                { label: 'Water Requirement', val: selectedSeed.water, icon: <Droplets size={14} />, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                                                { label: 'Purity Level', val: selectedSeed.purity, icon: <ShieldCheck size={14} />, color: 'text-rose-600', bg: 'bg-rose-50' },
                                                { label: 'Growth Season', val: selectedSeed.season, icon: <Star size={14} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                                                { label: 'Rating', val: `${selectedSeed.rating} / 5.0`, icon: <Star size={14} fill="currentColor" />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                                            ].map((item, i) => (
                                                <div key={i} className={`${item.bg} p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-105`}>
                                                    <div className={`${item.color} mb-2`}>{item.icon}</div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                                    <p className="text-sm font-black text-slate-900">{item.val}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                                    <Navigation size={20} className="text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sowing Depth</p>
                                                    <p className="text-sm font-bold">{selectedSeed.depth}</p>
                                                </div>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Location</p>
                                                <p className="text-sm font-bold text-emerald-400">{selectedSeed.location}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price / KG</p>
                                                <p className="text-3xl font-black text-slate-900">₹{selectedSeed.price}</p>
                                            </div>
                                            <button onClick={() => setIsOrdering(true)} className="flex-[2] bg-emerald-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-900 transition-all">
                                                Request Quote
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-8 duration-500">
                                        <button type="button" onClick={() => setIsOrdering(false)} className="text-emerald-600 font-bold text-xs uppercase flex items-center gap-2 mb-6">
                                            <ArrowLeft size={16} /> Back to Details
                                        </button>

                                        <h2 className="text-3xl font-black text-slate-900 mb-2">Order Request</h2>
                                        <p className="text-slate-500 text-sm mb-8">Variety: <span className="font-bold text-slate-800">{selectedSeed.name}</span></p>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</label>
                                                    <input required type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Contact Number</label>
                                                    <input required type="tel" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Category</label>
                                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-4 bg-slate-50 rounded-2xl outline-none">
                                                    <option>Individual Farmer</option>
                                                    <option>Industry / Corporate</option>
                                                    <option>Warehouse / Distributor</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Quantity (KG)</label>
                                                <input required type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" />
                                            </div>

                                            <button 
                                                disabled={isSubmitting}
                                                type="submit" 
                                                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Processing...' : 'Confirm Request'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <ChooseSeed />
                <Testimonials />
            </section>
            <Footer />
        </>
    )
}
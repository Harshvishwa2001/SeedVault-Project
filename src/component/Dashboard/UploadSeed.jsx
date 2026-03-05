'use client'
import React, { useState, useRef } from 'react';
import { Upload, Save, CheckCircle, ChevronDown, Clock, Activity, Leaf, FileText, Trash2 } from 'lucide-react';

export default function SeedUploadForm() {
    const [isSaved, setIsSaved] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // New state to hold the actual file
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        variety: "",
        location: "",
        season: "",
        yield: "",
        price: "",
        rating: "",
        tag: "In Stock",
        category: "",
        depth: "",
        maturity: "",
        water: "Low",
        purity: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // Store the file for submission

            // This is only for the local UI preview
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Create FormData object
        const dataToSend = new FormData();
        // 2. Append all text fields from formData
        Object.keys(formData).forEach((key) => {
            dataToSend.append(key, formData[key]);
        });
        if (selectedFile) {
            dataToSend.append('image', selectedFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/seeds', {
                method: 'POST',
                body: dataToSend,
            });

            if (response.ok) {
                setIsSaved(true);
                // Reset form
                setFormData({
                    name: "", variety: "", location: "", season: "", yield: "",
                    price: "", rating: "", tag: "In Stock", category: "",
                    depth: "", maturity: "", water: "Low", purity: ""
                });
                setPreviewImage(null);
                setSelectedFile(null);
                setTimeout(() => setIsSaved(false), 3000);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Save failed:", error);
            alert("Server connection failed. Make sure your backend is running.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12 min-h-screen bg-[#F8FAFC] font-sans">
            {/* TOP HEADER */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Inventory System</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Seed <span className="text-emerald-600">Manager</span></h2>
                </div>
                <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl">
                    <FileText size={28} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* LEFT: FORM SECTION (8 Columns) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-8 bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-12">

                        {/* 1. Identity & Technical Specs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Identity */}
                            <div className="space-y-6">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Identity & Market
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Seed Name</label>
                                        <input name="name" onChange={handleChange} placeholder="e.g. Desi Chickpeas" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Variety</label>
                                        <input name="variety" onChange={handleChange} placeholder="RVG-202" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Price (₹)</label>
                                            <input name="price" onChange={handleChange} placeholder="900" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Rating</label>
                                            <input name="rating" onChange={handleChange} placeholder="4.3" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Specs */}
                            <div className="space-y-6">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Technical Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Yield</label>
                                            <input name="yield" onChange={handleChange} placeholder="15-20 q/ha" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold text-emerald-700" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Maturity</label>
                                            <input name="maturity" onChange={handleChange} placeholder="115 Days" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Sowing Depth</label>
                                            <input name="depth" onChange={handleChange} placeholder="7-10 cm" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Purity %</label>
                                            <input name="purity" onChange={handleChange} placeholder="99.4%" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-bold" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Water Requirement</label>
                                        <div className="relative">
                                            <select name="water" value={formData.water} onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl outline-none appearance-none font-bold text-slate-700 cursor-pointer focus:ring-2 focus:ring-emerald-500/20">
                                                <option>Low</option>
                                                <option>Moderate</option>
                                                <option>High</option>
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* 2. Logistics & Tagging */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600">Origin & Growth</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="location" onChange={handleChange} placeholder="Region (Gujarat)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold focus:bg-white transition-all" />
                                    <input name="season" onChange={handleChange} placeholder="Season (Rabi)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold focus:bg-white transition-all" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600">System Metadata</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="category" onChange={handleChange} placeholder="Category (Pulses)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold focus:bg-white transition-all" />
                                    <input name="tag" onChange={handleChange} placeholder="Tag (In Stock)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-emerald-600 focus:bg-white transition-all" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className={`w-full py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all shadow-2xl active:scale-[0.98] ${isSaved ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}>
                            {isSaved ? <CheckCircle size={20} className="animate-bounce" /> : <Save size={20} />}
                            {isSaved ? "Saved Successfully" : "Save to Inventory"}
                        </button>
                    </form>
                </div>

                {/* RIGHT: LIVE PREVIEW (4 Columns) */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="lg:sticky lg:top-12 space-y-6">
                        {/* THE SEED CARD MOCKUP */}
                        <div className="bg-white rounded-[3.5rem] p-5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-50 transition-all duration-500 hover:translate-y-[-4px]">
                            {/* Image Placeholder / Upload */}
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="h-72 bg-[#F1F5F9] rounded-[3rem] relative mb-8 flex items-center justify-center overflow-hidden cursor-pointer group shadow-inner"
                            >
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="text-center space-y-2">
                                        <div className="bg-white p-4 rounded-full shadow-sm mx-auto w-fit">
                                            <Upload className="text-emerald-500" size={32} />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Click to add image</p>
                                    </div>
                                )}

                                <div className="absolute top-6 right-6 bg-emerald-500 text-white text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-[0.1em] shadow-lg shadow-emerald-500/30">
                                    {formData.tag || "STOCK STATUS"}
                                </div>
                            </div>

                            <div className="px-6 pb-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="max-w-[70%]">
                                        <h3 className="text-3xl font-black text-[#0F172A] leading-[1.1] mb-2 break-words">
                                            {formData.name || "Seed Name"}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Variety:</span>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                                {formData.variety || "RVG-XXX"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-[#FFFBEB] text-[#D97706] px-4 py-2 rounded-2xl border border-[#FEF3C7] text-sm font-black shadow-sm">
                                        {formData.rating || "0.0"}
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-500">
                                            <Activity size={16} />
                                        </div>
                                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">{formData.yield || "00 q/ha"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-500">
                                            <Clock size={16} />
                                        </div>
                                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">{formData.maturity || "00 Days"}</span>
                                    </div>
                                </div>

                                {/* Price Section */}
                                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Market Price</p>
                                        <div className="flex items-baseline">
                                            <span className="text-xl font-black text-slate-900 mr-1">₹</span>
                                            <span className="text-4xl font-black text-[#0F172A] tracking-tighter">{formData.price || "000"}</span>
                                        </div>
                                    </div>
                                    <div className="w-16 h-16 bg-[#0F172A] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl hover:bg-emerald-600 transition-colors cursor-pointer group">
                                        <Leaf size={28} className="group-hover:rotate-12 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
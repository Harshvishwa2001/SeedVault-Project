'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Save, CheckCircle, ChevronDown, Clock, Activity, Leaf, FileText, Edit3, XCircle, Trash2 } from 'lucide-react';

export default function SeedManager() {
    const [seeds, setSeeds] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "", variety: "", location: "", season: "", yield: "",
        price: "", rating: "", tag: "In Stock", category: "",
        depth: "", maturity: "", water: "Low", purity: ""
    });

    // --- LOGIC: FETCH ALL SEEDS ---
    const fetchSeeds = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/seeds');
            const data = await res.json();
            setSeeds(data);
        } catch (err) { console.error("Fetch failed", err); }
    };

    useEffect(() => { fetchSeeds(); }, []);

    // --- LOGIC: FORM HANDLING ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const startEdit = (seed) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsEditing(true);
        setEditId(seed._id);
        // Map seed data to form, excluding MongoDB internal fields if necessary
        setFormData({
            name: seed.name, variety: seed.variety, location: seed.location,
            season: seed.season, yield: seed.yield, price: seed.price,
            rating: seed.rating, tag: seed.tag, category: seed.category,
            depth: seed.depth, maturity: seed.maturity, water: seed.water, purity: seed.purity
        });
        setPreviewImage(seed.image);
        setSelectedFile(null); // Reset file input unless user picks a new one
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: "", variety: "", location: "", season: "", yield: "", price: "", rating: "", tag: "In Stock", category: "", depth: "", maturity: "", water: "Low", purity: "" });
        setPreviewImage(null);
        setSelectedFile(null);
    };

    // --- LOGIC: SUBMIT (POST or PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = new FormData();

        Object.keys(formData).forEach((key) => dataToSend.append(key, formData[key]));
        if (selectedFile) {
            dataToSend.append('image', selectedFile);
        }

        const url = isEditing
            ? `http://localhost:5000/api/seeds/${editId}`
            : 'http://localhost:5000/api/seeds';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, { method, body: dataToSend });
            if (response.ok) {
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 3000);
                cancelEdit();
                fetchSeeds();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert("Server connection failed.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this seed? This action cannot be undone.")) {
            try {
                const response = await fetch(`http://localhost:5000/api/seeds/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Refresh the list after successful deletion
                    fetchSeeds();
                    // If the seed being deleted was being edited, cancel the edit
                    if (editId === id) cancelEdit();
                } else {
                    alert("Failed to delete the seed.");
                }
            } catch (error) {
                console.error("Delete error:", error);
                alert("Server error while deleting.");
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12 min-h-screen bg-[#F8FAFC] font-sans">
            {/* TOP HEADER */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isEditing ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            {isEditing ? 'Update Mode' : 'Inventory System'}
                        </span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                        Seed <span className={isEditing ? 'text-orange-500' : 'text-emerald-600'}>{isEditing ? 'Editor' : 'Manager'}</span>
                    </h2>
                </div>
                {isEditing && (
                    <button onClick={cancelEdit} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-xs hover:bg-red-100 transition-all">
                        <XCircle size={16} /> CANCEL EDIT
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* LEFT: FORM SECTION */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-8 bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Identity */}
                            <div className="space-y-6">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Identity & Market
                                </h3>
                                <div className="space-y-4">
                                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Seed Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold" />
                                    <input name="variety" value={formData.variety} onChange={handleChange} placeholder="Variety" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price (₹)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" />
                                        <input name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" />
                                    </div>
                                </div>
                            </div>

                            {/* Technical */}
                            <div className="space-y-6">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Technical Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input name="yield" value={formData.yield} onChange={handleChange} placeholder="Yield" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" />
                                        <input name="maturity" value={formData.maturity} onChange={handleChange} placeholder="Maturity" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" />
                                    </div>
                                    <div className="relative">
                                        <select name="water" value={formData.water} onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl outline-none appearance-none font-bold cursor-pointer">
                                            <option>Low</option>
                                            <option>Moderate</option>
                                            <option>High</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <input name="purity" value={formData.purity} onChange={handleChange} placeholder="Purity %" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className={`w-full py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all shadow-2xl active:scale-[0.98] ${isEditing ? 'bg-orange-500 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}>
                            {isSaved ? <CheckCircle size={20} className="animate-bounce" /> : isEditing ? <Edit3 size={20} /> : <Save size={20} />}
                            {isSaved ? "Success" : isEditing ? "Update Seed" : "Save to Inventory"}
                        </button>
                    </form>
                </div>

                {/* RIGHT: LIVE PREVIEW */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="lg:sticky lg:top-12 space-y-6">
                        <div className="bg-white rounded-[3.5rem] p-5 shadow-2xl border border-slate-50">
                            <div onClick={() => fileInputRef.current.click()} className="h-72 bg-[#F1F5F9] rounded-[3rem] relative mb-8 flex items-center justify-center overflow-hidden cursor-pointer group">
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                ) : (
                                    <div className="text-center">
                                        <Upload className="text-emerald-500 mx-auto mb-2" size={32} />
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Add Image</p>
                                    </div>
                                )}
                            </div>
                            <div className="px-6 pb-6">
                                <h3 className="text-3xl font-black text-slate-900 mb-2">{formData.name || "Seed Name"}</h3>
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-6">{formData.variety || "Variety"}</p>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                    <span className="text-3xl font-black text-slate-900">₹{formData.price || "00"}</span>
                                    <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg"><Leaf size={24} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* INVENTORY LIST */}
            {/* INVENTORY LIST */}
            <div className="mt-24">
                <div className="flex items-center gap-4 mb-10">
                    <h3 className="text-3xl font-black text-slate-900">Active Inventory</h3>
                    <div className="h-[2px] flex-1 bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {seeds.map((seed) => (
                        <div key={seed._id} className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 flex items-center gap-6 border border-slate-50 group hover:border-emerald-200 transition-all">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-inner flex-shrink-0">
                                <img src={seed.image} className="w-full h-full object-cover" alt={seed.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-slate-900 truncate">{seed.name}</h4>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{seed.variety}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm font-black text-emerald-600">₹{seed.price}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-[10px] font-bold text-slate-400">{seed.category}</span>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => startEdit(seed)}
                                    className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-orange-50 hover:text-orange-500 transition-all"
                                    title="Edit Seed"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(seed._id)}
                                    className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                                    title="Delete Seed"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
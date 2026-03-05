"use client";

import SeedManager from "@/component/Dashboard/EditSeed";
import SeedUploadPage from "@/component/Dashboard/UploadSeed";
import {
    ArrowRight,
    ChevronRight,
    Edit,
    FileText,
    List,
    ListOrdered,
    Lock,
    LogOut,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Sprout,
    User
} from "lucide-react";
import { useEffect, useState } from "react";
import MessageDetails from "../message/page";
import UserDetails from "@/component/Dashboard/UserDetails";
import AdminDashboard from "@/component/Dashboard/Dashboard";
import OrderDetails from "@/component/Dashboard/OrderDetails";

// --- CONFIGURATION ---
const DASHBOARD_PASSWORD = "admin123";
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

export default function SeedAdultInteractiveDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [entryPassword, setEntryPassword] = useState("");
    const [activeTab, setActiveTab] = useState("profile"); // Controls right side
    const [timeLeft, setTimeLeft] = useState("");

    // --- SESSION LOGIC ---
    useEffect(() => {
        const sessionExpiry = localStorage.getItem("seed_session_expiry");
        if (sessionExpiry && Date.now() < parseInt(sessionExpiry)) setIsAuthenticated(true);

        const timer = setInterval(() => {
            const expiry = localStorage.getItem("seed_session_expiry");
            if (expiry) {
                const remaining = parseInt(expiry) - Date.now();
                if (remaining <= 0) handleLogout();
                else {
                    const hours = Math.floor(remaining / (1000 * 60 * 60));
                    const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                    setTimeLeft(`${hours}h ${mins}m`);
                }
            }
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = () => {
        if (entryPassword === DASHBOARD_PASSWORD) {
            localStorage.setItem("seed_session_expiry", (Date.now() + SESSION_DURATION_MS).toString());
            setIsAuthenticated(true);
        } else alert("Invalid Access Key");
    };

    const handleLogout = () => {
        localStorage.removeItem("seed_session_expiry");
        setIsAuthenticated(false);
    };

    // --- SUB-COMPONENTS FOR THE RIGHT SIDE ---
    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <>
                        <AdminDashboard/>
                    </>
                );
            case "user":
                return (
                    <>
                        <UserDetails />
                    </>
                );
            case "messages":
                return (
                    <>
                        <MessageDetails />
                    </>
                );
            case "upload":
                return (
                    <>
                        <SeedUploadPage />
                    </>
                );
            case "editupload":
                return (
                    <>
                        <SeedManager />
                    </>
                );
            case "orderdetails":
                return (
                    <>
                        <OrderDetails />
                    </>
                );
            default: return null;
        }
    };

    if (!isAuthenticated) return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl p-10 text-center border border-slate-100">
                <Lock className="mx-auto text-emerald-500 mb-6" size={40} />
                <h2 className="text-2xl font-bold mb-8 text-slate-900">SeedAdult Gatekeeper</h2>
                <input type="password" placeholder="ENTER ACCESS KEY" value={entryPassword} onChange={(e) => setEntryPassword(e.target.value)} className="w-full h-14 bg-slate-50 rounded-2xl px-6 mb-6 text-center tracking-[0.3em] outline-none border-2 border-transparent focus:border-emerald-500 transition-all" />
                <button onClick={handleLogin} className="w-full h-14 bg-[#00B36B] text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">Enter Dashboard <ArrowRight size={20} /></button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* LEFT SIDEBAR */}
            <div className="w-70 bg-white border-r border-slate-100 p-4 flex flex-col hidden md:flex">
                <div className="flex items-center gap-3 mb-12">
                    <div className="bg-[#00B36B] p-2 rounded-xl text-white"><Sprout size={24} /></div>
                    <h2 className="font-black text-slate-900 tracking-tight">SEEDADULT</h2>
                    <div className="px-2 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-[9px] font-bold text-slate-900">
                        EXP: <span className="text-emerald-600">{timeLeft || "12h 00m"}</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: "profile", label: "Admin Profile", icon: List },
                        { id: "user", label: "User Detail", icon: User },
                        { id: "messages", label: "Messages", icon: MessageSquare },
                        { id: "upload", label: "Upload Seeds", icon: FileText },
                        { id: "editupload", label: "Edit Seeds", icon: Edit },
                        { id: "orderdetails", label: "Order Details", icon: ListOrdered },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm"
                                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                }`}
                        >
                            <div className="flex items-center gap-3"><item.icon size={18} /> {item.label}</div>
                            {activeTab === item.id && <ChevronRight size={14} />}
                        </button>
                    ))}
                </nav>

                <button onClick={handleLogout} className="mt-auto flex items-center gap-2 px-6 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all">
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* RIGHT CONTENT AREA */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-full mx-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
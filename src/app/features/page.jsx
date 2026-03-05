'use client'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import {
    BarChart3,
    CloudSun,
    Dna,
    Quote,
    ShieldCheck,
    Truck
} from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function Features() {
    const features = [
        {
            title: "Genomic Purity",
            desc: "Every batch is lab-tested for 99.9% genetic consistency and purity.",
            icon: <Dna className="text-emerald-500" size={28} />,
            size: "md:col-span-2",
            bg: "bg-emerald-50/50"
        },
        {
            title: "Yield Analytics",
            desc: "Predictive data on crop performance based on soil health.",
            icon: <BarChart3 className="text-blue-500" size={28} />,
            size: "md:col-span-1",
            bg: "bg-blue-50/50"
        },
        {
            title: "Climate Sync",
            desc: "Smart suggestions based on your regional weather patterns.",
            icon: <CloudSun className="text-amber-500" size={28} />,
            size: "md:col-span-1",
            bg: "bg-amber-50/50"
        },
        {
            title: "Bulk Logistics",
            desc: "Seamless B2B supply chain for large-scale agricultural operations.",
            icon: <Truck className="text-purple-500" size={28} />,
            size: "md:col-span-2",
            bg: "bg-purple-50/50"
        }
    ]

    return (
        <>
            <Header />
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 mb-4">Core Capabilities</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Built for the future of <span className="text-emerald-600">Agriculture.</span>
                        </h3>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className={`${f.size} ${f.bg} rounded-[3rem] p-10 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group`}
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <FAQ />
            </section>
            <Footer />
        </>
    )
}

const FAQ = () => {
    const faqs = [
        { q: "How do you verify seed purity?", a: "Every batch undergoes DNA fingerprinting and germination tests in ISO-certified labs before being listed in the Vault." },
        { q: "What is the minimum bulk order?", a: "For most cereal crops, bulk pricing starts at 500kg. For specialty vegetable seeds, it starts at 10kg." },
        { q: "Is climate data accurate?", a: "We sync with local meteorological stations to provide sowing windows tailored to your specific pin code." }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <h3 className="text-3xl font-black text-slate-900 mb-12 text-center">Common <span className="text-emerald-600">Inquiries</span></h3>
                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group border-b border-slate-100 pb-6">
                            <p className="text-lg font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Q: {faq.q}</p>
                            <p className="text-slate-500 leading-relaxed font-medium">A: {faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
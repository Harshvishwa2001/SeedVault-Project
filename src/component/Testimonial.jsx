'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Quote } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function Testimonials() {
    const stories = [
        {
            name: "Rajesh Kumar",
            role: "Wheat Farmer, Punjab",
            quote: "The HD-3086 variety from SeedAdult gave me a 20% higher yield than local seeds. The technical data provided was spot on.",
            img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
        },
        {
            name: "Ananya Singh",
            role: "Agri-Distributor, MP",
            quote: "Bulk ordering is seamless. The quality certificates help me build trust with my network of 500+ farmers.",
            img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
        },
        {
            name: "Vikram Mehra",
            role: "Organic Farmer, Gujarat",
            quote: "Finding high-purity organic soybean seeds was a challenge until I found the Vault. The germination rate was exactly as advertised.",
            img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
        },
        {
            name: "Saritha Reddy",
            role: "Farm Owner, Telangana",
            quote: "The climate-sync feature suggested the perfect corn variety for our soil type. We've seen a massive reduction in water usage.",
            img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saritha"
        }
    ];

    return (
        <section className="bg-[#FDFDFC] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 mb-4">Community Impact</h2>
                        <h3 className="text-4xl font-black text-slate-900 leading-tight">
                            Trusted by those who <br/> <span className="text-emerald-600">feed the nation.</span>
                        </h3>
                    </div>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 20000, // 20 Seconds
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                    }}
                    className="testimonial-swiper !pb-16"
                >
                    {stories.map((s, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col justify-between group">
                                <div>
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                                        <Quote size={24} className="opacity-50 group-hover:opacity-100" />
                                    </div>
                                    <p className="text-slate-600 font-medium text-xl leading-relaxed mb-10">
                                        "{s.quote}"
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                                    <div className="relative">
                                        <img src={s.img} className="w-16 h-16 rounded-2xl bg-slate-50 object-cover" alt={s.name} />
                                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-lg">{s.name}</p>
                                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{s.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Global CSS for Swiper Bullets color */}
            <style jsx global>{`
                .testimonial-swiper .swiper-pagination-bullet-active {
                    background: #10b981 !important;
                    width: 24px;
                    border-radius: 4px;
                }
                .testimonial-swiper .swiper-pagination-bullet {
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
}
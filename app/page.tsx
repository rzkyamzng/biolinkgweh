"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useBiolink } from "@/context/BiolinkContext";

// Konfigurasi varian animasi Framer Motion
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const INITIAL_PRODUCTS = [
  // Kategori 1: Akun Game
  {
    id: 1,
    title: "PUBG Mobile Account Conqueror S18",
    category: "Akun Game",
    subCategory: "PUBG Mobile",
    description:
      "Glacier M416 Max Level, X-Suit Pharaoh, Winrate 72%, Account Polos Safe Login.",
    price: 2500000,
    formattedPrice: "Rp 2.500.000",
    rating: 4.9,
    tag: "Hot Item",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mobile Legends Sultan Account",
    category: "Akun Game",
    subCategory: "Mobile Legends",
    description:
      "Full Skin Collector, Legend 3x, Winrate 68%, Hero Unlocked 120+ All Emblem.",
    price: 1250000,
    formattedPrice: "Rp 1.250.000",
    rating: 4.8,
    tag: "Top Sale",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=500&auto=format&fit=crop",
  },
  // Kategori 2: Akun Premium
  {
    id: 3,
    title: "Canva Pro 1 Tahun Private Account",
    category: "Akun Premium",
    subCategory: "Canva Premium",
    description:
      "Fitur Pro Unlocked, Garansi Full 12 Bulan, Bebas Desain Elemen Premium Tanpa Limit.",
    price: 45000,
    formattedPrice: "Rp 45.000",
    rating: 5.0,
    tag: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "CapCut Pro 1 Bulan Private",
    category: "Akun Premium",
    subCategory: "CapCut Premium",
    description:
      "Bebas Pakai Fitur AI, Efek Pro, Export Video 4K 60FPS Tanpa Watermark.",
    price: 25000,
    formattedPrice: "Rp 25.000",
    rating: 4.9,
    tag: "Murah",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=500&auto=format&fit=crop",
  },
];

export default function BiolinkPage() {
  const { data } = useBiolink();
  const [isExpanded, setIsExpanded] = useState(false);
  const [products] = useState(INITIAL_PRODUCTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toString().includes(searchQuery) ||
      item.formattedPrice.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" ? true : item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handler Scroll Sync untuk Dot Indicators saat di-swipe di Mobile
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);

    if (
      newIndex !== currentIndex &&
      newIndex >= 0 &&
      newIndex < filteredProducts.length
    ) {
      setCurrentIndex(newIndex);
    }
  };

  // Handler Klik Navigasi Tombol Panah (Desktop)
  const scrollToCard = (index: number) => {
    const container = document.getElementById("product-container");
    if (container) {
      container.scrollTo({
        left: container.offsetWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // Reset Filter (Tombol Lihat Semua)
  const handleShowAll = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setCurrentIndex(0);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#0d0d11] text-white antialiased font-sans p-4 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="w-full h-full relative flex flex-col items-center justify-start *:select-none max-w-xl mx-auto">
        {/* Profile / Banner Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full h-44 rounded-lg mb-2 md:mb-3 gap-2 md:gap-3 border border-purple-500/30 shadow-2xl relative overflow-hidden group"
        >
          <img
            src={data.bannerUrl}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-85 scale-105 transition-transform duration-700 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-slate-950/60 hover:bg-slate-950/70 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-row items-center p-8 gap-5">
            {/* Avatar */}
            <motion.div
              variants={itemVariants}
              className="w-24 h-24 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg border-2 border-purple-400 overflow-hidden"
            >
              <img
                src={data.avatarUrl}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="flex flex-col text-left">
              <motion.h1
                variants={itemVariants}
                className="text-xl sm:text-2xl font-bold tracking-wide text-white"
              >
                {data.name}
              </motion.h1>

              {/* Bio */}
              <div>
                <motion.p
                  variants={itemVariants}
                  className={`text-[12px] sm:text-xs text-gray-300 mt-1 transition-all duration-300 ${
                    isExpanded ? "line-clamp-none" : "line-clamp-2"
                  }`}
                >
                  {data.bio}
                </motion.p>
                {data.bio && data.bio.length > 120 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[12px] sm:text-xs text-purple-400 hover:text-purple-300 mt-1 font-medium block focus:outline-none"
                  >
                    {isExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
                  </button>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 mt-3 text-gray-200 text-lg">
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <FaWhatsapp />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="w-full grid grid-cols-2 mb-2 md:mb-3 gap-2 md:gap-3"
        >
          <motion.a
            href="https://api.whatsapp.com/send/?phone=6285173412902&text=Halo+min%2C+saya+ingin+menjual+akun+PUBG&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 py-3 rounded-lg font-bold text-sm shadow-md transition-all"
          >
            Jual Akun
          </motion.a>

          <motion.a
            href="https://api.whatsapp.com/send/?phone=6285173412902&text=Halo+min%2C+saya+mau+TopUp+UC&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 py-3 rounded-lg font-bold text-sm shadow-md transition-all"
          >
            TopUp
          </motion.a>
        </motion.div>

        {/* Product Section */}
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 p-4 mb-2 md:mb-3 rounded-lg bg-[#150e25]">
          {/* Filter & Search Header */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between w-full">
            {/* Search Input */}
            <div className="relative w-full sm:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300/40">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari nama atau harga..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                className="w-full bg-[#1f1635] text-white text-xs md:text-sm pl-10 pr-9 py-2.5 md:py-3 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/60 placeholder-purple-300/40 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/60 hover:text-white text-xs w-5 h-5 flex items-center justify-center rounded-full bg-purple-900/40"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
              <button
                onClick={handleShowAll}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                  selectedCategory === "Semua" && searchQuery === ""
                    ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30"
                    : "bg-[#1f1635] border-purple-500/20 text-purple-300 hover:text-white"
                }`}
              >
                Lihat Semua
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("Akun Game");
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                  selectedCategory === "Akun Game"
                    ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30"
                    : "bg-[#1f1635] border-purple-500/20 text-purple-300 hover:text-white"
                }`}
              >
                Akun Game
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("Akun Premium");
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                  selectedCategory === "Akun Premium"
                    ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30"
                    : "bg-[#1f1635] border-purple-500/20 text-purple-300 hover:text-white"
                }`}
              >
                Akun Premium
              </button>
            </div>
          </div>

          {/* Product Cards List */}
          {filteredProducts.length > 0 ? (
            <div className="relative group">
              <div
                id="product-container"
                onScroll={handleScroll}
                className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4"
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-full flex-shrink-0 snap-center snap-always flex flex-col sm:flex-row rounded-lg p-3 md:p-4 gap-3 md:gap-4 bg-[#1f1635]/80 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-xl backdrop-blur-md"
                  >
                    {/* Image */}
                    <div className="relative w-full sm:w-1/3 h-40 sm:h-auto rounded-lg overflow-hidden bg-purple-950/40 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                        {product.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between py-1 gap-2 sm:gap-0">
                      <div>
                        <div className="flex items-center justify-between text-xs text-purple-300/70 mb-1">
                          <span className="font-medium bg-purple-900/40 px-2 py-0.5 rounded-md border border-purple-500/10">
                            {product.subCategory}
                          </span>
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            ★ {product.rating}
                          </span>
                        </div>

                        <h3 className="text-white font-semibold text-base sm:text-lg line-clamp-1 group-hover:text-purple-300 transition-colors">
                          {product.title}
                        </h3>

                        <p className="text-purple-200/60 text-xs mt-1 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-purple-500/10 mt-auto">
                        <div>
                          <span className="text-[10px] text-purple-300/60 block">
                            Harga
                          </span>
                          <span className="text-emerald-400 font-bold text-base sm:text-lg">
                            {product.formattedPrice}
                          </span>
                        </div>

                        <button className="h-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md active:scale-95">
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Indicators */}
              {filteredProducts.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3">
                  {filteredProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToCard(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx
                          ? "w-6 bg-pink-500"
                          : "w-1.5 bg-purple-500/30 hover:bg-purple-500/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="w-full h-40 flex flex-col items-center justify-center rounded-lg bg-[#1f1635]/50 border border-purple-500/10 text-center p-4">
              <p className="text-purple-300/70 text-sm font-medium mb-2">
                Produk tidak ditemukan untuk "{searchQuery}"
              </p>
              <button
                onClick={handleShowAll}
                className="px-4 py-2 text-xs bg-purple-600/80 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
              >
                Tampilkan Semua Produk
              </button>
            </div>
          )}
        </div>

        {/* Partner / Blacklist Section */}
        <div className="w-full flex flex-col mb-2 md:mb-3 gap-2 md:gap-3">
          <motion.a
            href="#"
            whileHover={{ scale: 1.01, translateY: -2 }}
            whileTap={{ scale: 0.99 }}
            className="w-full h-28 flex items-center justify-between bg-[#2d121c]/90 hover:bg-[#3d1624] border border-red-500/20 hover:border-red-500/40 rounded-lg p-4 shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-inner">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-extrabold tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 rounded-md uppercase w-max px-1.5 py-0.5">
                  ⚠️ Blacklist
                </span>
                <p className="text-[12px] text-gray-400 font-medium tracking-wide">
                  Daftar Penipu & Penjual yang tidak bertanggungjawab.
                </p>
              </div>
            </div>

            <div className="w-9 h-9 rounded-lg bg-red-500/5 group-hover:bg-red-500/10 flex items-center justify-center text-red-400/70 group-hover:text-red-400 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </motion.a>
        </div>

        {/* Footer */}
        <footer className="w-full text-center text-[10px] text-gray-500 mt-4 border-t border-white/5 pt-2">
          <p>Made with 💖</p>
        </footer>
      </div>
    </main>
  );
}

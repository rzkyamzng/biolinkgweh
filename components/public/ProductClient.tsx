"use client";

import { useState, useRef } from "react";

// Definisikan tipe data
type CategoryProps = {
  id: string;
  name: string;
  slug: string;
};

type ProductProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  badge: string | null;
  category: { name: string };
  images: { url: string }[];
};

// TERIMA PROPS categories DI SINI
export default function ProductClient({
  products = [],
  categories = [],
}: {
  products: ProductProps[];
  categories: CategoryProps[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleShowAll = () => {
    setSelectedCategory("Semua");
    setSearchQuery("");
    setCurrentIndex(0);
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "Semua" ||
      product.category?.name === selectedCategory;

    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      product.title.toLowerCase().includes(searchLower) ||
      (product.description &&
        product.description.toLowerCase().includes(searchLower));

    return matchCategory && matchSearch;
  });

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const stripHtml = (text: string) => {
    if (!text) return "";
    return text.replace(/<\/?[^>]+(>|$)/g, "").replace(/&lt;\/?[^&]+&gt;/g, "");
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 p-4 mb-2 md:mb-3 rounded-lg bg-[#150e25] border border-purple-500/20">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between w-full">
        {/* Search Input (Tetap Sama) */}
        <div className="relative w-full sm:w-1/2">
          {/* ... (Isi search input tidak berubah) ... */}
          <input
            type="text"
            placeholder="Cari nama atau spesifikasi..." // <--- Ubah tulisan ini
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full bg-[#1f1635] text-white text-xs md:text-sm pl-10 pr-9 py-2.5 md:py-3 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/60 placeholder-purple-300/40 transition-all shadow-inner"
          />
        </div>
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

          {/* Looping Category dari Database */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                selectedCategory === cat.name
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30"
                  : "bg-[#1f1635] border-purple-500/20 text-purple-300 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards List (Tetap Sama) */}
      {filteredProducts.length > 0 ? (
        <div className="relative group">
          <div
            id="product-container"
            ref={scrollContainerRef}
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
                    src={
                      product.images[0]?.url ||
                      "https://images.unsplash.com/photo-1782215670710-8d2675bc0fbd"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1 gap-2 sm:gap-0">
                  <div>
                    <div className="flex items-center justify-between text-xs text-purple-300/70 mb-1">
                      <span className="font-medium bg-purple-900/40 px-2 py-0.5 rounded-md border border-purple-500/10">
                        {product.category?.name || "Uncategorized"}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        Ready Stock
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-base sm:text-lg line-clamp-1 group-hover:text-purple-300 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-purple-200/60 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {stripHtml(product.description)}{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-purple-500/10 mt-auto">
                    <div>
                      <span className="text-[10px] text-purple-300/60 block">
                        Harga
                      </span>
                      <span className="text-emerald-400 font-bold text-base sm:text-lg">
                        {formatRupiah(product.price)}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/6285173412902?text=Halo%20saya%20mau%20beli%20${encodeURIComponent(product.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="h-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md active:scale-95 flex items-center"
                    >
                      Beli Sekarang
                    </a>
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
  );
}

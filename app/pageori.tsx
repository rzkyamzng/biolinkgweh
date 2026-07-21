<div className="grid grid-cols-2 gap-2 md:gap-3">
  {/* PARTNER RESMI ALWIKOBRA */}
  <motion.a
    href="#"
    whileHover={{ scale: 1.02, translateY: -2 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col justify-between bg-[#1f1635]/80 hover:bg-[#281d45] border border-white/10 rounded-2xl p-4 h-36 transition-colors shadow-lg cursor-pointer relative overflow-hidden group"
  >
    {/* Top Row: Icon Arrow */}
    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
      <ArrowUpRight className="w-5 h-5" />
    </div>

    {/* Bottom Row: Text Content */}
    <div className="flex flex-col gap-0.5">
      <h4 className="font-bold text-sm tracking-wide text-white">
        Partner Resmi Alwikobra
      </h4>
      <p className="text-[12px] text-gray-400 font-medium">
        Daftar partner terverifikasi kami
      </p>
    </div>
  </motion.a>

  {/* PAID PROMOTE RESMI */}
  <motion.a
    href="#"
    whileHover={{ scale: 1.02, translateY: -2 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col justify-between bg-[#1f1635]/80 hover:bg-[#281d45] border border-white/10 rounded-2xl p-4 h-36 transition-colors shadow-lg cursor-pointer relative overflow-hidden group"
  >
    {/* Top Row: Icon Arrow */}
    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
      <ArrowUpRight className="w-5 h-5" />
    </div>

    {/* Bottom Row: Text Content */}
    <div className="flex flex-col gap-0.5">
      <h4 className="font-bold text-sm tracking-wide text-white">
        Paid Promote Resmi
      </h4>
      <p className="text-[12px] text-gray-400 font-medium">
        Layanan promosi official Alwikobra
      </p>
    </div>
  </motion.a>
</div>;

<main className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-4 relative overflow-hidden selection:bg-white/20 selection:text-white">
  {/* Background Decor */}
  <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

  {/* Floating Admin Badge Link for Demo */}
  <Link
    href="/admin"
    className="absolute top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-full text-xs text-slate-400 hover:text-white backdrop-blur-md transition-all duration-300"
  >
    <ShieldCheck className="w-3.5 h-3.5" />
    Admin Panel
  </Link>

  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="w-full max-w-md bg-white/[0.03] border border-white/[0.08] rounded-[32px] overflow-hidden backdrop-blur-2xl shadow-2xl relative z-10"
  >
    {/* Banner Area */}
    <div className="h-40 w-full relative overflow-hidden bg-slate-900">
      {/* eslint-disable-next-html-element-warning */}
      <img
        src={data.bannerUrl}
        alt="Banner"
        className="w-full h-full object-cover opacity-85 scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/60" />
    </div>
    {/* Profile Content Container */}
    <div className="px-6 pb-8 pt-0 absolute flex flex-col items-center text-center">
      {/* Avatar (Negatif Margin agar memotong Banner) */}
      <motion.div
        variants={itemVariants}
        className="w-28 h-28 rounded-full border-4 border-slate-950 overflow-hidden -mt-14 mb-4 shadow-xl bg-slate-800"
      >
        <img
          src={data.avatarUrl}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Name & Bio */}
      <motion.h1
        variants={itemVariants}
        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
      >
        {data.name}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed font-light"
      >
        {data.bio}
      </motion.p>

      {/* Primary CTA (WhatsApp Pulse Button) */}
      <motion.div variants={itemVariants} className="w-full mt-6">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(34,197,94,0)",
              "0 0 0 12px rgba(34,197,94,0.15)",
              "0 0 0 0 rgba(34,197,94,0)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-green-500 hover:bg-green-400 text-slate-950 font-semibold rounded-2xl shadow-lg shadow-green-500/10 transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          Hubungi via WhatsApp
        </motion.a>
      </motion.div>

      {/* Divider Line */}
      <motion.div
        variants={itemVariants}
        className="w-full h-[1px] bg-white/[0.08] my-6"
      />

      {/* Secondary Social/Important Links List */}
      <motion.div
        variants={itemVariants}
        className="w-full flex flex-col gap-3"
      >
        {data.links.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.015,
              backgroundColor: "rgba(255, 255, 255, 0.06)",
            }}
            whileTap={{ scale: 0.99 }}
            className="group w-full flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.06] hover:border-white/15 rounded-2xl transition-all duration-300"
          >
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              {link.title}
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </motion.a>
        ))}
      </motion.div>
    </div>
  </motion.div>
</main>;

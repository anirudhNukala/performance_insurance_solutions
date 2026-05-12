"use client";

import Image from "next/image";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative bg-navy-900 pt-16">
      {/* Background photo */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-truck.jpg"
          alt="Semi truck on highway"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/75 to-navy-900/40" />
      </div>

      {/* Main hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-5">
            Surety Bonds &amp; Trucking Insurance
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Insurance for Carriers, Owner-Operators &amp; Freight Brokers
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl">
            We shop multiple A-rated carriers to find trucking insurance and surety bonds
            that fit your operation and satisfy FMCSA requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold px-7 py-3 rounded text-sm transition-colors duration-150"
            >
              Request a Quote
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white font-medium px-7 py-3 rounded text-sm transition-colors duration-150"
            >
              View Coverage Options
            </button>
          </div>
        </div>
      </div>

      {/* Coverage type strip */}
      <div className="relative border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-navy-700">
            {[
              { label: "Primary Liability", sub: "Trucking Insurance" },
              { label: "Motor Truck Cargo", sub: "Freight Coverage" },
              { label: "BMC-84 Bond", sub: "Freight Brokers" },
              { label: "Physical Damage", sub: "Truck & Trailer" },
            ].map((item) => (
              <div
                key={item.label}
                className="px-6 py-5 hover:bg-navy-800/60 transition-colors duration-150 cursor-default"
              >
                <div className="text-white text-sm font-semibold">{item.label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

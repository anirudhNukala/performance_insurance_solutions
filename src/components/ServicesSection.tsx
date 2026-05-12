"use client";

import Image from "next/image";

const suretyCoverages = [
  {
    name: "BMC-84 Freight Broker Bond",
    desc: "$75,000 FMCSA-required bond for licensed freight brokers and forwarders.",
  },
  {
    name: "Motor Carrier (ICC) Bond",
    desc: "Required for for-hire carriers operating interstate.",
  },
  {
    name: "Freight Forwarder Bond",
    desc: "FMCSA-required bond for registered freight forwarders.",
  },
  {
    name: "License & Permit Bonds",
    desc: "State and local bonds for transportation licenses and oversize/overweight permits.",
  },
];

export default function ServicesSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Services</h2>
          <div className="w-12 h-1 bg-gold-500" />
        </div>

        {/* Surety Bonds */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="relative h-52 w-full">
            <Image
              src="/images/service-bonds.jpg"
              alt="Freight and logistics operations"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/70" />
            <div className="absolute inset-0 flex flex-col justify-end px-8 pb-6">
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">
                FMCSA Compliance
              </p>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-white text-2xl font-bold">Surety Bonds</h3>
                <button
                  onClick={scrollToContact}
                  className="flex-shrink-0 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold text-sm px-6 py-2.5 rounded transition-colors duration-150"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 border-b border-slate-100">
            <p className="text-slate-600 text-sm leading-relaxed">
              Federal requirement for freight brokers and many motor carriers. We issue bonds
              through top-rated surety companies to keep your FMCSA authority active.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {suretyCoverages.map((cov) => (
              <div key={cov.name} className="px-8 py-5">
                <h4 className="text-navy-800 font-semibold text-sm mb-1">{cov.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{cov.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-slate-500 text-sm text-center">
          Not sure what you need?{" "}
          <button
            onClick={scrollToContact}
            className="text-navy-700 font-semibold hover:text-navy-900 underline underline-offset-2 transition-colors duration-150"
          >
            Contact us
          </button>{" "}
          and we will help you figure it out.
        </p>
      </div>
    </section>
  );
}

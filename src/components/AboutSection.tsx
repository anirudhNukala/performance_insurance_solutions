import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">About Us</h2>
          <div className="w-12 h-1 bg-gold-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left: Text */}
          <div>
            <p className="text-slate-600 text-base leading-relaxed mb-5">
              Performance Insurance Solutions LLC is an independent agency focused exclusively
              on commercial transportation. We compare rates across multiple A-rated carriers
              to find coverage that fits your operation — not a one-size-fits-all policy.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              We work with owner-operators getting their first policy, established fleets
              seeking better rates, and freight brokers that need FMCSA-compliant surety bonds.
            </p>

            <h3 className="text-navy-900 font-semibold text-sm mb-4">Why work with us</h3>
            <ul className="space-y-3">
              {[
                { title: "Independent agency", desc: "Multiple carriers, not one." },
                { title: "Transportation focus", desc: "Trucking and freight only — no generalist lines." },
                { title: "FMCSA experience", desc: "We know the compliance requirements." },
                { title: "Direct access", desc: "A licensed agent, not a call center." },
                { title: "Nationwide", desc: "All 48 contiguous states." },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold-500 mt-2" />
                  <div>
                    <span className="text-navy-800 font-semibold text-sm">{item.title}</span>
                    <span className="text-slate-500 text-sm"> — {item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Photo + note */}
          <div className="space-y-6">
            <div className="relative w-full h-72 lg:h-96 rounded overflow-hidden">
              <Image
                src="/images/about-fleet.jpg"
                alt="Commercial truck fleet"
                fill
                className="object-cover"
              />
            </div>

            <div className="border border-slate-200 rounded p-5 bg-slate-50">
              <p className="text-slate-600 text-sm leading-relaxed">
                <span className="font-semibold text-navy-800">FMCSA Compliance:</span>{" "}
                Carriers and freight brokers must maintain specific insurance minimums and bonding
                requirements to keep their operating authority active. We make sure your coverage meets them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

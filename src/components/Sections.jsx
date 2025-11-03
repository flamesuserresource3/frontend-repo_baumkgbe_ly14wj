import { Calendar, Headphones, Shield, CreditCard, PhoneCall, BarChart3, Star, Quote, HelpCircle } from 'lucide-react';

function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <div className="group rounded-2xl border border-black/10 p-6 transition-transform hover:-translate-y-1 bg-white/70 backdrop-blur">
      <div className="mb-4 inline-flex items-center justify-center rounded-xl border border-black/10 w-10 h-10">
        <Icon size={18} />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-black/70">{desc}</p>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-semibold">{value}</div>
      <div className="text-xs md:text-sm text-black/60">{label}</div>
    </div>
  );
}

export default function Sections() {
  return (
    <>
      {/* About */}
      <section id="about" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">Built for high-performing dental teams</h2>
            <p className="text-black/70 text-base md:text-lg">We automate front desk workflows end-to-end — from first contact to post-visit follow-ups. Our AI receptionist answers, schedules, verifies insurance, and keeps your calendar fully optimized. Privacy-first by design.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Metric value="2×" label="Efficiency ROI" />
            <Metric value="24/7" label="Coverage" />
            <Metric value="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Services</h2>
            <p className="text-black/70 mt-2">Velodent’s AI automation suite, delivered with an enterprise-grade experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard icon={Headphones} title="AI Receptionist" desc="Answering, triage, and intelligent handoff with natural, compliant voice." />
            <ServiceCard icon={Calendar} title="Appointment & Recall" desc="Smart booking, rescheduling, and 6‑month hygiene recalls." />
            <ServiceCard icon={Shield} title="Insurance Verification" desc="Eligibility checks and pre‑auth support before visits." />
            <ServiceCard icon={CreditCard} title="Payment & Claims" desc="Secure payment links and claim assistance with status updates." />
            <ServiceCard icon={PhoneCall} title="Lead Follow‑up" desc="Convert ad leads and revive inactive patients automatically." />
            <ServiceCard icon={BarChart3} title="Dashboard & Analytics" desc="Live KPIs, utilization, and campaign ROI in one view." />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Case Studies</h2>
            <p className="text-black/70 mt-2">Measurable outcomes from real clinics powered by Velodent.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-black/10 p-6 bg-white/70">
              <h3 className="font-semibold mb-2">Urban Dental | 3-location DSO</h3>
              <ul className="text-sm text-black/70 list-disc pl-5 space-y-1">
                <li>+41% more completed hygiene visits</li>
                <li>–28% no‑show rate in 60 days</li>
                <li>2.3× front‑desk productivity</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-black/10 p-6 bg-white/70">
              <h3 className="font-semibold mb-2">BrightSmile Pediatrics</h3>
              <ul className="text-sm text-black/70 list-disc pl-5 space-y-1">
                <li>Insurance checks cut from 7 min → 90 sec</li>
                <li>24/7 call capture with 96% CSAT</li>
                <li>$38k added monthly production</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-black/10 p-6 bg-white/70">
              <h3 className="font-semibold mb-2">OrthoPlus Aligners</h3>
              <ul className="text-sm text-black/70 list-disc pl-5 space-y-1">
                <li>+52% lead-to-start conversion</li>
                <li>Automated braces tighten reminders</li>
                <li>Full HIPAA audit trail on calls</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="mb-8 md:mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">What Our Clients Say</h2>
              <p className="text-black/70 mt-2">Authentic feedback from practices we power every day.</p>
            </div>
            <Star className="hidden md:block" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[`“Velodent feels like an elite front-desk team that never sleeps.”`, `“The ROI is obvious — our phones are finally an asset.”`, `“Setup was painless and privacy checks passed instantly.”`].map((q, i) => (
              <figure key={i} className="rounded-2xl border border-black/10 p-6 bg-white/70">
                <Quote className="mb-3" />
                <blockquote className="text-sm text-black/80">{q}</blockquote>
                <figcaption className="mt-4 text-xs text-black/60">— {['Dr. Patel', 'Office Manager, CS Dental', 'Dr. Nguyen'][i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="divide-y divide-black/10 rounded-2xl border border-black/10 overflow-hidden">
            {[
              {
                q: 'Is patient data secure and compliant?',
                a: 'Yes. We follow strict privacy controls with encryption in transit and at rest, role-based access, and audit trails.'
              },
              {
                q: 'How fast is setup?',
                a: 'Most clinics go live in under a week with our guided onboarding and templates.'
              },
              {
                q: 'Do you handle insurance verification?',
                a: 'We automate eligibility checks and pre-auth steps and surface results directly in your workflow.'
              },
              {
                q: 'What ROI can we expect?',
                a: 'We guarantee 2× efficiency ROI, with typical gains in show rates, lead conversion, and staff time savings.'
              },
            ].map((item, i) => (
              <details key={i} className="group open:bg-white/60">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={16} />
                    <span className="font-medium">{item.q}</span>
                  </div>
                  <span className="text-sm text-black/50 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-black/70">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Book CTA */}
      <section id="book" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
          <h3 className="text-xl md:text-3xl font-semibold mb-3">Schedule a Private Demo or Strategy Call</h3>
          <p className="text-black/70 mb-6">Pick a time that fits your day. We’ll map your automation blueprint.</p>
          <a href="https://cal.com/velodent-ogbkfv/20min" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90">
            Open Booking
          </a>
        </div>
      </section>
    </>
  );
}

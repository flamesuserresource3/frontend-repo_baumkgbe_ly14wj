import { Calendar, Headphones, Shield, CreditCard, PhoneCall, BarChart3, Star, Quote, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function ServiceCard({ icon: Icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-black/10 p-6 bg-white/70 backdrop-blur shadow-sm transition-all hover:shadow-md"
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-xl border border-black/10 w-10 h-10">
        <Icon size={18} />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-black/70">{desc}</p>
    </motion.div>
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
            {[
              { icon: Headphones, title: 'AI Receptionist', desc: 'Answering, triage, and intelligent handoff with natural, compliant voice.' },
              { icon: Calendar, title: 'Appointment & Recall', desc: 'Smart booking, rescheduling, and 6‑month hygiene recalls.' },
              { icon: Shield, title: 'Insurance Verification', desc: 'Eligibility checks and pre‑auth support before visits.' },
              { icon: CreditCard, title: 'Payment & Claims', desc: 'Secure payment links and claim assistance with status updates.' },
              { icon: PhoneCall, title: 'Lead Follow‑up', desc: 'Convert ad leads and revive inactive patients automatically.' },
              { icon: BarChart3, title: 'Dashboard & Analytics', desc: 'Live KPIs, utilization, and campaign ROI in one view.' },
            ].map((s, i) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} desc={s.desc} index={i} />
            ))}
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
            {[
              {
                title: 'Urban Dental | 3-location DSO',
                bullets: ['+41% more completed hygiene visits', '–28% no‑show rate in 60 days', '2.3× front‑desk productivity'],
              },
              {
                title: 'BrightSmile Pediatrics',
                bullets: ['Insurance checks cut from 7 min → 90 sec', '24/7 call capture with 96% CSAT', '$38k added monthly production'],
              },
              {
                title: 'OrthoPlus Aligners',
                bullets: ['+52% lead-to-start conversion', 'Automated braces tighten reminders', 'Full HIPAA audit trail on calls'],
              },
            ].map((cs, i) => (
              <motion.div
                key={cs.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-black/10 p-6 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold mb-2">{cs.title}</h3>
                <ul className="text-sm text-black/70 list-disc pl-5 space-y-1">
                  {cs.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="mt-5 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                <div className="mt-3 text-[11px] uppercase tracking-wide text-black/40">Performance Snapshot</div>
              </motion.div>
            ))}
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
            {[
              {
                q: 'Velodent feels like an elite front-desk team that never sleeps.',
                a: '— Dr. Patel, Downtown Family Dental'
              },
              {
                q: 'We cut no-shows by nearly a third and filled hygiene gaps automatically.',
                a: '— Office Manager, CS Dental'
              },
              {
                q: 'Our online booking rate improved and we saw a 2× ROI within two months.',
                a: '— Dr. Nguyen, SmileWorks'
              },
              {
                q: 'Insurance checks went from minutes to seconds — patients notice the difference.',
                a: '— Billing Lead, BrightSmile Pediatrics'
              },
              {
                q: '24/7 coverage means weekend calls finally convert. The pipeline is healthier than ever.',
                a: '— Practice Owner, Lakeside Dental'
              },
              {
                q: 'Onboarding was smooth, and support actually feels proactive — not reactive.',
                a: '— Operations Director, OrthoPlus Aligners'
              },
            ].map((item, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                className="group relative rounded-2xl border border-black/10 p-6 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white"
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: '0 1px 0 0 rgba(0,0,0,0.06) inset' }} />
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-black/10">
                    <Quote size={16} />
                  </div>
                  <blockquote className="text-sm text-black/80 leading-relaxed">{item.q}</blockquote>
                </div>
                <figcaption className="mt-4 text-xs text-black/60">{item.a}</figcaption>
                <div className="mt-5 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wide text-black/40">Verified Client</span>
                  <span className="text-[11px] text-black/40 transition-colors group-hover:text-black/60">Read more</span>
                </div>
              </motion.figure>
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
                q: 'How long does it take to deliver the full AI automation system?',
                a: 'Most clinics go live in 5–10 business days. Day 1–2: discovery and system mapping; Day 3–5: integration and testing; Day 6–10: staff training, soft launch, and optimization.'
              },
              {
                q: 'How is pricing determined based on the complexity of the AI infrastructure?',
                a: 'Pricing is scoped to call volume, number of locations, integrations, and workflows (e.g., insurance, recalls, payments). We offer tiered plans with flat monthly pricing and optional usage add-ons.'
              },
              {
                q: 'How does Velodent ensure patient data privacy and compliance?',
                a: 'We use encryption in transit and at rest, signed BAAs, role-based access, audit logging, and strict data retention controls. Our infrastructure and processes are designed to support HIPAA compliance.'
              },
              {
                q: 'What kind of support and maintenance do clients receive?',
                a: 'Dedicated success manager, proactive monitoring, monthly optimization reviews, and priority support during business hours with 24/7 incident coverage.'
              },
              {
                q: 'Can Velodent integrate with existing dental management software?',
                a: 'Yes. We integrate with leading PMS/EHR systems and phone platforms. Where direct APIs are limited, we use secure middleware and vetted connectors.'
              },
              {
                q: 'What measurable outcomes should we expect?',
                a: 'Typical results include 20–40% fewer no-shows, higher online booking rates, faster insurance checks, and 2× efficiency ROI within 60–90 days.'
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

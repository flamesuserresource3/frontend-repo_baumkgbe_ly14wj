import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative pt-24 md:pt-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            AI Automation for Modern Dental Clinics
          </h1>
          <p className="text-base md:text-lg text-black/70 mb-6">
            Velodent streamlines front-desk ops, patient onboarding, and recall systems using safe, compliant AI.
          </p>
          <div className="w-full aspect-video rounded-2xl border border-black/10 overflow-hidden shadow-sm">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Nw478YoO3og?si=0Pcoc1145T6JDndl"
              title="Velodent Overview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="mt-6">
            <p className="mb-3 text-sm md:text-base">Book a 20-Minute Discovery Call — Choose a Time That Works for You</p>
            <a
              href="https://cal.com/velodent-ogbkfv/20min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2.5 text-sm font-medium hover:-translate-y-px transition-transform"
            >
              Book Now
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 relative h-[360px] md:h-[520px]">
          <div className="absolute inset-0 rounded-3xl border border-black/10 overflow-hidden">
            <Spline
              scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

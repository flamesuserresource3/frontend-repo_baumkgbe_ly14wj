export default function Hero() {
  return (
    <section id="home" className="relative pt-24 md:pt-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-5xl text-center">
          <div className="w-full aspect-video rounded-2xl border border-black/10 overflow-hidden shadow-sm mx-auto">
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

          <div className="mt-8 md:mt-10 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">
              AI Automation for Modern Dental Clinics
            </h1>
            <p className="text-base md:text-lg text-black/70">
              Velodent streamlines front-desk ops, patient onboarding, and recall systems using safe, compliant AI.
            </p>
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
      </div>
    </section>
  );
}

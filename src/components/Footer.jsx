import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-black/60">© {new Date().getFullYear()} Velodent. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="mailto:velodent.ai@gmail.com" className="inline-flex items-center gap-2 text-sm hover:opacity-70">
            <Mail size={16} /> velodent.ai@gmail.com
          </a>
          <a href="#" className="inline-flex items-center gap-2 text-sm hover:opacity-70">
            <MessageCircle size={16} /> Book Now
          </a>
        </div>
      </div>
    </footer>
  );
}

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Sections from './components/Sections.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Sections />
        <Footer />
      </main>
    </div>
  );
}

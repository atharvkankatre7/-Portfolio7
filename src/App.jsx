import { useState, useEffect } from 'react';

// Layout components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

// Section components
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import AIWorkflow from './components/Sections/AIWorkflow';
import Projects from './components/Sections/Projects';
import Blog from './components/Sections/Blog';
import Resume from './components/Sections/Resume';
import Contact from './components/Sections/Contact';

// UI components
import WelcomeOverlay from './components/UI/WelcomeOverlay';
import ParticlesCanvas from './components/UI/ParticlesCanvas';
import ScrollProgress from './components/UI/ScrollProgress';
import BackToTop from './components/UI/BackToTop';
import FAB from './components/UI/FAB';
import AchievementDialog from './components/UI/AchievementDialog';
import WaterRipple from './components/UI/WaterRipple';
import PullToRefresh from './components/UI/PullToRefresh';

// Hooks
import { useParallax } from './hooks/useParallax';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize smooth scrolling
  useSmoothScroll();

  // Initialize parallax effect
  useParallax();

  // Handle page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Stagger card animations on load
  useEffect(() => {
    if (!isLoaded) return;

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease-out';
        card.style.opacity = '1';
      }, index * 50);
    });
  }, [isLoaded]);

  return (
    <>
      {/* Welcome overlay */}
      <WelcomeOverlay />

      {/* Background effects */}
      <ScrollProgress />
      <ParticlesCanvas />
      <WaterRipple />

      {/* Header */}
      <Header />

      {/* Navigation */}
      <Sidebar />

      {/* Main content */}
      <main id="content" className="content" tabIndex="-1">
        <Hero />
        <About />
        <Skills />
        <AIWorkflow />
        <Projects />
        <Blog />
        <Resume />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating elements */}
      <BackToTop />
      <FAB />
      <PullToRefresh />

      {/* Dialogs */}
      <AchievementDialog />

      {/* Noscript fallback */}
      <noscript>
        <div className="noscript">
          This site uses light animations and JavaScript for interactions. Everything is
          still readable without it.
        </div>
      </noscript>
    </>
  );
}

export default App;

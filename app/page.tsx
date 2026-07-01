'use client';

import { useEffect, useState, useRef } from 'react';
import {
  TrendingUp,
  Search,
  FileText,
  Cpu,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  ArrowUp,
  Download,
  Menu,
  X,
  Lock,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Briefcase,
  Layers,
  GraduationCap
} from 'lucide-react';

/* --- Custom Hooks --- */

// Custom Typist Typing Effect Hook
function useTypingEffect(words: string[], speed = 100, delay = 2500) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (words.length === 0) return;

    if (subIndex === words[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === -1 && isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setSubIndex(0);
      }, 150);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText(words[index].substring(0, subIndex + (isDeleting ? -1 : 1)));
      setSubIndex((prevSubIndex) => prevSubIndex + (isDeleting ? -1 : 1));
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, words, speed, delay]);

  return text;
}

// Fade In On Scroll helper using standard Intersection Observer
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

function FadeIn({ children, className = '', delay = '' }: FadeInProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-[0.98]'
      } ${delay} ${className}`}
    >
      {children}
    </div>
  );
}

export default function PortfolioPage() {
  const typingWords = ["Digital Marketer", "AI Marketing Learner"];
  const typedText = useTypingEffect(typingWords, 80, 2000);

  // States
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Sticky Navbar state & Scroll to Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-sliding Testimonial Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerAuditCTA = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Free 15-Minute AI Marketing & SEO Audit request',
      message: 'Hi Rojal, I would love to schedule a free 15-minute AI marketing & SEO audit for my business. Looking forward to connecting!'
    });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Portfolio items matching categories
  const portfolioItems = [
    { id: 1, name: 'Growth Campaign Accelerator', category: 'SEO', desc: 'AI-assisted semantic search blueprint & keyword dominance map.' },
    { id: 2, name: 'Hyper-Targeted Content Hub', category: 'Content', desc: 'SaaS user acquisition & semantic architecture funnel.' },
    { id: 3, name: 'SocioSphere AI Automation', category: 'Social Media', desc: 'Intelligent multi-channel narrative distribution engine.' },
  ];

  const filteredPortfolio = portfolioFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);

  // Testimonials content
  const testimonials = [
    {
      id: 1,
      name: "Saurav Karki",
      role: "SEO Strategist",
      rating: 5,
      text: "Rojal demonstrates a rare curiosity for AI automation. His dedication to learning next-gen workflows makes him a highly forward-thinking digital marketer."
    },
    {
      id: 2,
      name: "Alisha Shrestha",
      role: "Creative Director",
      rating: 5,
      text: "Collaborating with Rojal is an absolute breeze. He excels in structuring comprehensive content plans and injecting data-driven insights into strategy."
    },
    {
      id: 3,
      name: "Prabin Bajracharya",
      role: "E-commerce Founder",
      rating: 5,
      text: "Rojal's understanding of social media reach, paired with newly acquired AI techniques, is exactly what modern businesses in Kathmandu need."
    }
  ];

  // Blog Posts
  const blogPosts = [
    {
      id: 1,
      title: "Synthesizing AI in Digital Campaigns: A 2026 Shift",
      category: "AI Marketing",
      date: "June 2026",
      readTime: "4 min read",
      gradient: "from-amber-600 to-yellow-500",
      excerpt: "Unpacking the synergy of generative models and customer behavior analytics to form high-conversion marketing matrices."
    },
    {
      id: 2,
      title: "SEO Foundations & Semantic Search Dominance",
      category: "SEO Strategy",
      date: "May 2026",
      readTime: "5 min read",
      gradient: "from-yellow-600 to-orange-500",
      excerpt: "Why legacy keyword stuffing is obsolete and how context-driven semantic clusters are winning modern Search Engine ranks."
    },
    {
      id: 3,
      title: "The Dynamic Funnel: Content Automation Scale",
      category: "Content Strategy",
      date: "April 2026",
      readTime: "6 min read",
      gradient: "from-orange-600 to-amber-500",
      excerpt: "Building localized, contextually accurate marketing architectures to scale content output while preserving organic brand voices."
    }
  ];

  // SINGLE FILE HTML EXPORT FUNCTIONALITY
  // Generates the self-contained, beautifully functional portfolio.html matching user guidelines.
  const triggerSelfContainedDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rojal Bajracharya | Digital Marketer & AI Marketing Learner</title>
  
  <!-- Font Integrations -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Poppins', 'sans-serif'],
          },
          colors: {
            gold: {
              DEFAULT: '#F5A623',
              hover: '#D48C12',
              glow: 'rgba(245, 166, 35, 0.3)'
            },
            dark: {
              bg: '#0A0A0A',
              card: '#141414',
              section: '#111111'
            }
          }
        }
      }
    }
  </script>
  
  <style>
    /* Glow highlights */
    .glow-gold {
      box-shadow: 0 0 20px rgba(245, 166, 35, 0.2);
    }
    .hover-glow:hover {
      box-shadow: 0 0 25px rgba(245, 166, 35, 0.4);
    }
    
    /* Reveal sections on scroll */
    .fade-in-section {
      opacity: 0;
      transform: translateY(40px) scale(0.98);
      transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .fade-in-section.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    
    /* Typist blinking cursor */
    .typing-cursor::after {
      content: '|';
      animation: blink 0.8s infinite;
      color: #F5A623;
      margin-left: 3px;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    /* Float logo */
    @keyframes floating {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    .animate-float {
      animation: floating 6s ease-in-out infinite;
    }
    
    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0A0A0A;
    }
    ::-webkit-scrollbar-thumb {
      background: #1F1F1F;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #F5A623;
    }
  </style>
</head>
<body class="bg-[#0A0A0A] text-white font-sans antialiased">

  <!-- sticky transparent navbar -->
  <header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 px-6 md:px-12 flex items-center justify-between">
    <div class="flex items-center">
      <a href="#home" class="text-2xl font-display font-extrabold text-gold tracking-wider">RB<span class="text-white">.</span></a>
    </div>
    
    <!-- desktop nav options -->
    <nav class="hidden lg:flex items-center space-x-8">
      <a href="#home" class="hover:text-gold transition-colors font-medium">Home</a>
      <a href="#about" class="hover:text-gold transition-colors font-medium">About</a>
      <a href="#services" class="hover:text-gold transition-colors font-medium">Services</a>
      <a href="#portfolio" class="hover:text-gold transition-colors font-medium">Portfolio</a>
      <a href="#testimonials" class="hover:text-gold transition-colors font-medium">Testimonials</a>
      <a href="#blog" class="hover:text-gold transition-colors font-medium">Blog</a>
      <a href="#contact" class="hover:text-gold transition-colors font-medium">Contact</a>
    </nav>
    
    <div class="hidden lg:block">
      <a href="#contact" class="px-6 py-2.5 bg-gold text-black hover:text-black font-semibold rounded-md hover-glow transition-all duration-300 transform hover:-translate-y-0.5">
        Hire Me
      </a>
    </div>

    <!-- mobile hamburger container -->
    <button id="mobile-menu-btn" class="lg:hidden text-white focus:outline-none" aria-label="Toggle Menu">
      <svg id="hamburger-icon" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <svg id="close-icon" class="w-7 h-7 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </header>

  <!-- Mobile Drawer Menu -->
  <div id="mobile-drawer" class="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-md transform translate-x-full transition-transform duration-300 lg:hidden flex flex-col justify-center items-center space-y-6 text-xl">
    <a href="#home" class="mobile-link hover:text-gold font-medium duration-200">Home</a>
    <a href="#about" class="mobile-link hover:text-gold font-medium duration-200">About</a>
    <a href="#services" class="mobile-link hover:text-gold font-medium duration-200">Services</a>
    <a href="#portfolio" class="mobile-link hover:text-gold font-medium duration-200">Portfolio</a>
    <a href="#testimonials" class="mobile-link hover:text-gold font-medium duration-200">Testimonials</a>
    <a href="#blog" class="mobile-link hover:text-gold font-medium duration-200">Blog</a>
    <a href="#contact" class="mobile-link hover:text-gold font-medium duration-200">Contact</a>
    <a href="#contact" class="mobile-link px-8 py-3 bg-gold text-black font-bold rounded-md hover-glow duration-200">Hire Me</a>
  </div>

  <!-- HERO SECTION -->
  <section id="home" class="min-h-screen relative flex items-center justify-center px-6 md:px-12 pt-24 overflow-hidden" 
           style="background-image: radial-gradient(at 0% 0%, rgba(245, 166, 35, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(245, 166, 35, 0.05) 0px, transparent 50%); background-size: 100% 100%;">
    
    <!-- background grid overlays -->
    <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none" style="background-size: 40px 40px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);"></div>
    
    <div class="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      
      <!-- copy details column -->
      <div class="space-y-6 text-left">
        <h3 class="text-gold font-medium tracking-widest text-sm uppercase">Welcome to my Digital Space</h3>
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
          Hi, I'm <span class="text-gold">Rojal</span><br>Bajracharya
        </h1>
        <h2 class="text-lg md:text-2xl text-slate-300 font-medium h-12 flex items-center">
          I am a&nbsp;<span id="typewriter" class="text-gold font-semibold typing-cursor">Digital Marketer</span>
        </h2>
        <p class="text-slate-400 max-w-lg leading-relaxed text-sm md:text-base">
          Crafting data-driven strategies for digital growth and integrating cutting-edge AI automation models to disrupt Kathmandu's marketing paradigm.
        </p>
        
        <div class="flex flex-wrap gap-4 pt-4">
          <a href="#contact" class="px-8 py-3.5 bg-gold text-black font-bold rounded-md hover-glow transition-all duration-300 transform hover:-translate-y-1">
            Hire Me
          </a>
          <a href="#portfolio" class="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-md hover:border-gold hover:text-gold transition-all duration-300 transform hover:-translate-y-1">
            View My Work
          </a>
        </div>

        <!-- socials -->
        <div class="flex items-center space-x-6 pt-6">
          <span class="text-xs text-white/40 tracking-wider uppercase font-medium">Follow My Progress</span>
          <div class="h-px w-8 bg-white/20"></div>
          <a href="https://linkedin.com/in/rojalbajracharya" target="_blank" class="text-white/60 hover:text-gold transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a href="https://instagram.com/bajracharyarojal" target="_blank" class="text-white/60 hover:text-gold transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m8.4 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
          </a>
        </div>
      </div>

      <!-- creative layout floating illustration -->
      <div class="relative flex justify-center items-center py-12">
        <div class="w-72 h-72 md:w-96 md:h-96 rounded-2xl bg-gradient-to-tr from-gold/10 to-transparent p-1.5 animate-float glow-gold relative">
          <div class="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-gold to-yellow-500 opacity-20 blur pointer-events-none"></div>
          <div class="w-full h-full bg-[#0E0E0E] rounded-xl flex flex-col justify-center items-center p-8 text-center space-y-4">
            
            <!-- tech overlay graphic elements -->
            <div class="absolute top-4 right-4 text-gold/30 text-xs font-mono">2026_STAGE //</div>
            <div class="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" stroke-shadow="0 0 10px #F5A623" />
              </svg>
            </div>
            <h3 class="text-xl font-display font-semibold tracking-wide text-white">AI Automation Lab</h3>
            <p class="text-xs text-white/50 max-w-xs leading-relaxed">
              Synergizing deep analytics, programmatic search architectures, and behavioral model triggers.
            </p>
            <div class="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
              <div class="bg-gold h-full rounded-full" style="width: 78%"></div>
            </div>
            <div class="flex justify-between w-full text-[10px] font-mono text-white/40">
              <span>SEO INTEGRITY</span>
              <span>78% DEEP INTEGRATION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT SECTION -->
  <section id="about" class="py-24 px-6 md:px-12 bg-dark-section relative fade-in-section">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      <!-- profile grid photo mockup -->
      <div class="relative flex justify-center">
        <div class="absolute -inset-4 bg-gradient-to-br from-gold/10 to-transparent blur-xl pointer-events-none rounded-full"></div>
        <div class="relative w-72 h-96 md:w-80 md:h-[420px] rounded-2xl border border-white/10 p-3 bg-gradient-to-b from-[#181818] to-dark-bg glow-gold">
          <div class="w-full h-full bg-neutral-900 rounded-xl overflow-hidden relative flex flex-col justify-end p-6">
            <!-- abstract vector mesh layout inside frame -->
            <div class="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10"></div>
            <div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(circle at 50% 50%, #F5A623 0.5px, transparent 1px); background-size: 16px 16px;"></div>
            
            <div class="z-20 relative">
              <span class="text-xs font-mono text-gold tracking-widest uppercase">Based in Nepal</span>
              <h4 class="text-xl font-display font-semibold mt-1">Rojal Bajracharya</h4>
              <p class="text-xs text-white/55 mt-1 font-mono">Digital Marketing & AI Alumnus</p>
            </div>
          </div>
        </div>
      </div>

      <!-- bio detail column -->
      <div class="space-y-6">
        <div class="inline-block px-3 py-1 bg-gold/10 text-gold text-xs tracking-wider uppercase rounded-full border border-gold/20">
          Curriculum Vitaas
        </div>
        <h2 class="text-3xl md:text-4xl font-display font-bold">About Rojal</h2>
        <p class="text-slate-300 leading-relaxed text-sm md:text-base">
          I'm a passionate Digital Marketer and AI Marketing Learner based in Kathmandu, Nepal. I recently completed an AI marketing course and I'm actively building my skills in SEO, content strategy, social media marketing, and AI-driven campaigns. I'm open to freelance work and collaborations.
        </p>

        <!-- Skill block container -->
        <div class="space-y-4 pt-2">
          <h4 class="text-sm font-semibold text-white/80 tracking-wide uppercase">Core Capacities</h4>
          <div class="flex flex-wrap gap-2.5">
            <span class="px-4 py-2 bg-black hover:border-gold/50 duration-300 transition-all text-xs border border-white/5 rounded-md font-medium text-slate-300">Digital Marketing</span>
            <span class="px-4 py-2 bg-black hover:border-gold/50 duration-300 transition-all text-xs border border-white/5 rounded-md font-medium text-slate-300">SEO</span>
            <span class="px-4 py-2 bg-black hover:border-gold/50 duration-300 transition-all text-xs border border-white/5 rounded-md font-medium text-slate-300">Content Strategy</span>
            <span class="px-4 py-2 bg-black hover:border-gold/50 duration-300 transition-all text-xs border border-white/5 rounded-md font-medium text-slate-300">AI Marketing</span>
            <span class="px-4 py-2 bg-black hover:border-gold/50 duration-300 transition-all text-xs border border-white/5 rounded-md font-medium text-slate-300">Social Media</span>
          </div>
        </div>

        <div class="pt-4">
          <a href="javascript:void(0)" onclick="triggerSelfContainedDownload()" class="inline-flex items-center space-x-2 px-6 py-3 border border-gold/30 hover:bg-gold hover:text-black duration-300 text-gold text-sm font-semibold rounded-md">
            <span>Download Portfolio HTML</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES SECTION -->
  <section id="services" class="py-24 px-6 md:px-12 bg-dark-bg relative fade-in-section">
    <div class="max-w-6xl mx-auto">
      
      <div class="text-center space-y-4 mb-16">
        <span class="text-sm font-semibold text-gold tracking-widest uppercase">My Expertises</span>
        <h2 class="text-3xl md:text-5xl font-display font-bold">What I Offer</h2>
        <div class="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Strategy card -->
        <div class="bg-dark-card p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            </div>
            <h3 class="text-lg font-display font-semibold text-white">Digital Marketing Strategy</h3>
            <p class="text-white/50 text-xs md:text-sm leading-relaxed">
              Constructing end-to-end multi-channel action guides to position brands strategically for optimum engagement.
            </p>
          </div>
          <div class="w-full h-px bg-white/5 mt-6"></div>
        </div>

        <!-- SEO card -->
        <div class="bg-dark-card p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 class="text-lg font-display font-semibold text-white">SEO Optimization</h3>
            <p class="text-white/50 text-xs md:text-sm leading-relaxed">
              Enhancing dynamic search discoverability to dominate modern localized search results structures natively.
            </p>
          </div>
          <div class="w-full h-px bg-white/5 mt-6"></div>
        </div>

        <!-- Content card -->
        <div class="bg-dark-card p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 class="text-lg font-display font-semibold text-white">Content Strategy</h3>
            <p class="text-white/50 text-xs md:text-sm leading-relaxed">
              Architecting tailored material workflows designed to secure inbound interest and foster deep client retention.
            </p>
          </div>
          <div class="w-full h-px bg-white/5 mt-6"></div>
        </div>

        <!-- AI marketing card -->
        <div class="bg-dark-card p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 class="text-lg font-display font-semibold text-white">AI Marketing</h3>
            <p class="text-white/50 text-xs md:text-sm leading-relaxed">
              Injecting automated models, cognitive optimization heuristics, and behavioral content engines for rapid lift.
            </p>
          </div>
          <div class="w-full h-px bg-white/5 mt-6"></div>
        </div>

      </div>
    </div>
  </section>

  <!-- PORTFOLIO SECTION -->
  <section id="portfolio" class="py-24 px-6 md:px-12 bg-dark-section relative fade-in-section">
    <div class="max-w-6xl mx-auto">
      
      <div class="text-center space-y-4 mb-16">
        <span class="text-sm font-semibold text-gold tracking-widest uppercase">Curated Catalog</span>
        <h2 class="text-3xl md:text-5xl font-display font-bold">My Work</h2>
        <div class="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button onclick="filterPortfolio('All')" class="portfolio-tag-btn px-5 py-2.5 bg-gold text-black rounded-md font-semibold text-xs uppercase duration-200" id="filter-all">All</button>
        <button onclick="filterPortfolio('SEO')" class="portfolio-tag-btn px-5 py-2.5 bg-black/60 hover:bg-gold hover:text-black hover:font-semibold text-white rounded-md text-xs uppercase duration-200" id="filter-seo">SEO</button>
        <button onclick="filterPortfolio('Content')" class="portfolio-tag-btn px-5 py-2.5 bg-black/60 hover:bg-gold hover:text-black hover:font-semibold text-white rounded-md text-xs uppercase duration-200" id="filter-content">Content</button>
        <button onclick="filterPortfolio('Social Media')" class="portfolio-tag-btn px-5 py-2.5 bg-black/60 hover:bg-gold hover:text-black hover:font-semibold text-white rounded-md text-xs uppercase duration-200" id="filter-social">Social Media</button>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- item 1 -->
        <div class="portfolio-card relative bg-[#0E0E0E] rounded-xl overflow-hidden border border-white/5 p-6 space-y-4 filter-seo" data-category="SEO">
          <div class="relative overflow-hidden rounded-lg aspect-video w-full bg-gradient-to-tr from-amber-600/10 to-yellow-500/20 flex flex-col items-center justify-center filter blur-[1px]">
            <div class="p-6 text-center z-10">
              <span class="text-[10px] text-gold uppercase tracking-wider font-mono">Project SEO Alpha</span>
              <h4 class="text-lg font-display font-semibold mt-1">Growth Campaign Accelerator</h4>
            </div>
            
            <!-- blur lock layer -->
            <div class="absolute inset-0 bg-neutral-950/80 backdrop-blur-md flex flex-col items-center justify-center space-y-3">
              <svg class="w-8 h-8 text-gold animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span class="text-xs text-white/50 font-mono tracking-widest uppercase">Coming Soon</span>
            </div>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-gold font-semibold tracking-wider">SEO OPTIMIZATION</span>
            <span class="text-white/40">LOCK STATUS</span>
          </div>
        </div>

        <!-- item 2 -->
        <div class="portfolio-card relative bg-[#0E0E0E] rounded-xl overflow-hidden border border-white/5 p-6 space-y-4 filter-content" data-category="Content">
          <div class="relative overflow-hidden rounded-lg aspect-video w-full bg-gradient-to-tr from-yellow-600/10 to-orange-500/20 flex flex-col items-center justify-center filter blur-[1px]">
            <div class="p-6 text-center z-10">
              <span class="text-[10px] text-gold uppercase tracking-wider font-mono">Project Copywriter Beta</span>
              <h4 class="text-lg font-display font-semibold mt-1">Hyper-Targeted Content Hub</h4>
            </div>
            
            <!-- blur lock layer -->
            <div class="absolute inset-0 bg-neutral-950/80 backdrop-blur-md flex flex-col items-center justify-center space-y-3">
              <svg class="w-8 h-8 text-gold animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span class="text-xs text-white/50 font-mono tracking-widest uppercase">Coming Soon</span>
            </div>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-gold font-semibold tracking-wider">CONTENT STRATEGY</span>
            <span class="text-white/40">LOCK STATUS</span>
          </div>
        </div>

        <!-- item 3 -->
        <div class="portfolio-card relative bg-[#0E0E0E] rounded-xl overflow-hidden border border-white/5 p-6 space-y-4 filter-social" data-category="Social Media">
          <div class="relative overflow-hidden rounded-lg aspect-video w-full bg-gradient-to-tr from-orange-600/10 to-amber-500/20 flex flex-col items-center justify-center filter blur-[1px]">
            <div class="p-6 text-center z-10">
              <span class="text-[10px] text-gold uppercase tracking-wider font-mono">Project Social Gamma</span>
              <h4 class="text-lg font-display font-semibold mt-1">SocioSphere AI Automation</h4>
            </div>
            
            <!-- blur lock layer -->
            <div class="absolute inset-0 bg-neutral-950/80 backdrop-blur-md flex flex-col items-center justify-center space-y-3">
              <svg class="w-8 h-8 text-gold animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span class="text-xs text-white/50 font-mono tracking-widest uppercase">Coming Soon</span>
            </div>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-gold font-semibold tracking-wider">SOCIAL MEDIA</span>
            <span class="text-white/40">LOCK STATUS</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- TESTIMONIALS SECTION -->
  <section id="testimonials" class="py-24 px-6 md:px-12 bg-dark-bg relative overflow-hidden fade-in-section">
    <div class="max-w-4xl mx-auto text-center">
      
      <div class="space-y-4 mb-12">
        <span class="text-sm font-semibold text-gold tracking-widest uppercase">Kind Words</span>
        <h2 class="text-3xl md:text-5xl font-display font-bold">What People Say</h2>
        <div class="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
      </div>

      <!-- sliding track -->
      <div class="relative h-[280px] md:h-[220px]">
        
        <!-- testimonial 0 -->
        <div class="testimonial-slide absolute inset-0 transition-opacity duration-500 ease-in-out opacity-100 flex flex-col justify-center items-center" id="testimonial-slide-0">
          <p class="text-base md:text-lg text-slate-300 italic max-w-2xl leading-relaxed">
            "Rojal demonstrates a rare curiosity for AI automation. His dedication to learning next-gen workflows makes him a highly forward-thinking digital marketer."
          </p>
          <div class="flex items-center space-x-1 text-gold mt-6 justify-center">
            ★★★★★
          </div>
          <h4 class="font-display font-medium text-white text-sm md:text-base mt-2">Saurav Karki</h4>
          <span class="text-xs text-white/45 mt-0.5">SEO Strategist</span>
        </div>

        <!-- testimonial 1 -->
        <div class="testimonial-slide absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none flex flex-col justify-center items-center" id="testimonial-slide-1">
          <p class="text-base md:text-lg text-slate-300 italic max-w-2xl leading-relaxed">
            "Collaborating with Rojal is an absolute breeze. He excels in structuring comprehensive content plans and injecting data-driven insights into strategy."
          </p>
          <div class="flex items-center space-x-1 text-gold mt-6 justify-center">
            ★★★★★
          </div>
          <h4 class="font-display font-medium text-white text-sm md:text-base mt-2">Alisha Shrestha</h4>
          <span class="text-xs text-white/45 mt-0.5">Creative Director</span>
        </div>

        <!-- testimonial 2 -->
        <div class="testimonial-slide absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none flex flex-col justify-center items-center" id="testimonial-slide-2">
          <p class="text-base md:text-lg text-slate-300 italic max-w-2xl leading-relaxed">
            "Rojal's understanding of social media reach, paired with newly acquired AI techniques, is exactly what modern businesses in Kathmandu need."
          </p>
          <div class="flex items-center space-x-1 text-gold mt-6 justify-center">
            ★★★★★
          </div>
          <h4 class="font-display font-medium text-white text-sm md:text-base mt-2">Prabin Bajracharya</h4>
          <span class="text-xs text-white/45 mt-0.5">E-commerce Founder</span>
        </div>

      </div>

      <!-- dots menu controls -->
      <div class="flex gap-2.5 justify-center mt-6">
        <button onclick="gotoSlide(0)" class="w-2.5 h-2.5 rounded-full transition-colors duration-200 bg-gold testimonial-dot" id="dot-0" aria-label="Slide 1"></button>
        <button onclick="gotoSlide(1)" class="w-2.5 h-2.5 rounded-full transition-colors duration-200 bg-white/10 hover:bg-white/40 testimonial-dot" id="dot-1" aria-label="Slide 2"></button>
        <button onclick="gotoSlide(2)" class="w-2.5 h-2.5 rounded-full transition-colors duration-200 bg-white/10 hover:bg-white/40 testimonial-dot" id="dot-2" aria-label="Slide 3"></button>
      </div>

    </div>
  </section>

  <!-- BLOG SECTION -->
  <section id="blog" class="py-24 px-6 md:px-12 bg-dark-section relative fade-in-section">
    <div class="max-w-6xl mx-auto">
      
      <div class="text-center space-y-4 mb-16">
        <span class="text-sm font-semibold text-gold tracking-widest uppercase">Deep Research</span>
        <h2 class="text-3xl md:text-5xl font-display font-bold">Latest Insights</h2>
        <div class="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Post 1 -->
        <div class="bg-dark-card rounded-xl border border-white/5 overflow-hidden group hover:border-gold/30 hover:-translate-y-2 duration-300 transition-all">
          <div class="bg-gradient-to-tr from-amber-600 to-yellow-500 h-44 relative flex items-center justify-center text-center p-6 bg-cover bg-center">
            <div class="absolute inset-0 bg-[#0E0E0E]/70"></div>
            <!-- layout text design inside thumbnail -->
            <div class="relative z-10">
              <span class="text-[10px] uppercase font-mono tracking-wider font-semibold text-gold">AI integration</span>
              <h4 class="text-sm font-display font-semibold mt-1.5 text-white capitalize max-w-xs">Cognitive heuristics in rapid growth cycles</h4>
            </div>
          </div>
          <div class="p-6 space-y-3.5">
            <div class="flex items-center space-x-3 text-xs">
              <span class="px-2.5 py-0.5 rounded bg-amber-500/10 text-gold border border-gold/20 text-[10px] font-semibold tracking-wider uppercase">AI MARKETING</span>
              <span class="text-white/40">Incoming</span>
            </div>
            <h3 class="font-display font-semibold text-sm md:text-base group-hover:text-gold duration-200">Synthesizing AI in Digital Campaigns: A 2026 Shift</h3>
            <p class="text-white/50 text-xs lines-clamp-3 leading-relaxed">
              Unpacking the synergy of generative models and customer behavior analytics to form high-conversion marketing matrices.
            </p>
            <div class="pt-2 flex justify-between items-center text-xs">
              <span class="text-white/30 font-medium">Coming Soon</span>
              <button disabled class="text-white/25 cursor-not-allowed font-semibold">Read More</button>
            </div>
          </div>
        </div>

        <!-- Post 2 -->
        <div class="bg-dark-card rounded-xl border border-white/5 overflow-hidden group hover:border-gold/30 hover:-translate-y-2 duration-300 transition-all">
          <div class="bg-gradient-to-tr from-yellow-600 to-orange-500 h-44 relative flex items-center justify-center text-center p-6 bg-cover bg-center">
            <div class="absolute inset-0 bg-[#0E0E0E]/70"></div>
            <!-- layout text design inside thumbnail -->
            <div class="relative z-10">
              <span class="text-[10px] uppercase font-mono tracking-wider font-semibold text-gold">SEO search maps</span>
              <h4 class="text-sm font-display font-semibold mt-1.5 text-white capitalize max-w-xs">Advanced intent indexing patterns</h4>
            </div>
          </div>
          <div class="p-6 space-y-3.5">
            <div class="flex items-center space-x-3 text-xs">
              <span class="px-2.5 py-0.5 rounded bg-yellow-500/10 text-gold border border-gold/20 text-[10px] font-semibold tracking-wider uppercase">SEO STRATEGY</span>
              <span class="text-white/40">Incoming</span>
            </div>
            <h3 class="font-display font-semibold text-sm md:text-base group-hover:text-gold duration-200">SEO Foundations & Semantic Search Dominance</h3>
            <p class="text-white/50 text-xs lines-clamp-3 leading-relaxed">
              Why legacy keyword stuffing is obsolete and how context-driven semantic clusters are winning modern Search Engine ranks.
            </p>
            <div class="pt-2 flex justify-between items-center text-xs">
              <span class="text-white/30 font-medium">Coming Soon</span>
              <button disabled class="text-white/25 cursor-not-allowed font-semibold">Read More</button>
            </div>
          </div>
        </div>

        <!-- Post 3 -->
        <div class="bg-dark-card rounded-xl border border-white/5 overflow-hidden group hover:border-gold/30 hover:-translate-y-2 duration-300 transition-all">
          <div class="bg-gradient-to-tr from-orange-600 to-amber-500 h-44 relative flex items-center justify-center text-center p-6 bg-cover bg-center">
            <div class="absolute inset-0 bg-[#0E0E0E]/70"></div>
            <!-- layout text design inside thumbnail -->
            <div class="relative z-10">
              <span class="text-[10px] uppercase font-mono tracking-wider font-semibold text-gold">dynamic copy</span>
              <h4 class="text-sm font-display font-semibold mt-1.5 text-white capitalize max-w-xs">High-end content production scale</h4>
            </div>
          </div>
          <div class="p-6 space-y-3.5">
            <div class="flex items-center space-x-3 text-xs">
              <span class="px-2.5 py-0.5 rounded bg-orange-500/10 text-gold border border-gold/20 text-[10px] font-semibold tracking-wider uppercase">CONTENT STRATEGY</span>
              <span class="text-white/40">Incoming</span>
            </div>
            <h3 class="font-display font-semibold text-sm md:text-base group-hover:text-gold duration-200">The Dynamic Funnel: Content Automation Scale</h3>
            <p class="text-white/50 text-xs lines-clamp-3 leading-relaxed">
              Building localized, contextually accurate marketing architectures to scale content output while preserving organic brand voices.
            </p>
            <div class="pt-2 flex justify-between items-center text-xs">
              <span class="text-white/30 font-medium">Coming Soon</span>
              <button disabled class="text-white/25 cursor-not-allowed font-semibold">Read More</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- CONTACT SECTION -->
  <section id="contact" class="py-24 px-6 md:px-12 bg-dark-bg relative fade-in-section">
    <div class="max-w-6xl mx-auto">
      
      <div class="text-center space-y-4 mb-16">
        <span class="text-sm font-semibold text-gold tracking-widest uppercase font-semibold">Reach Out</span>
        <h2 class="text-3xl md:text-5xl font-display font-bold">Let's Work Together</h2>
        <div class="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <!-- left informational block -->
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-2xl font-display font-bold text-white">Let's Create Something Extraordinary</h3>
            <p class="text-slate-300 leading-relaxed text-sm md:text-base">
              Whether you want to launch high-conversion search campaigns, automate your content pipeline using intelligent tools, or integrate data-centric local optimizations, let's build your brand equity.
            </p>
          </div>

          <!-- details -->
          <div class="space-y-5">
            <div class="flex items-center space-x-4">
              <div class="w-11 h-11 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h4 class="text-[10px] font-mono uppercase tracking-widest text-white/40">Location</h4>
                <p class="text-slate-200 text-sm font-medium">Kathmandu, Nepal</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-11 h-11 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 class="text-[10px] font-mono uppercase tracking-widest text-white/40">Email Dispatch</h4>
                <p class="text-slate-200 text-sm font-medium">hello@byrojal.com</p>
              </div>
            </div>
          </div>

          <!-- social channels layout -->
          <div class="pt-4 space-y-3">
            <h4 class="text-xs font-mono tracking-widest text-white/50 uppercase">Sync Channels</h4>
            <div class="flex items-center space-x-4">
              <a href="https://linkedin.com/in/rojalbajracharya" target="_blank" class="w-10 h-10 border border-white/5 hover:border-gold duration-250 bg-[#0E0E0E] text-white/70 hover:text-gold rounded-md flex items-center justify-center">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://instagram.com/bajracharyarojal" target="_blank" class="w-10 h-10 border border-white/5 hover:border-gold duration-250 bg-[#0E0E0E] text-white/70 hover:text-gold rounded-md flex items-center justify-center">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m8.4 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Interactive form on right -->
        <div class="bg-dark-card p-8 rounded-2xl border border-white/5 relative">
          <form id="contact-form" onsubmit="handleDemoContact(event)" class="space-y-5">
            <div>
              <label class="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Your Name</label>
              <input required type="text" name="name" placeholder="Rojal Bajracharya" class="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all text-slate-200">
            </div>

            <div>
              <label class="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
              <input required type="email" name="email" placeholder="example@domain.com" class="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all text-slate-200">
            </div>

            <div>
              <label class="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Subject Action</label>
              <input required type="text" name="subject" placeholder="Campaign proposal, Collaboration..." class="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all text-slate-200">
            </div>

            <div>
              <label class="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Detailed Message</label>
              <textarea required name="message" rows="4" placeholder="Let's build a programmatic growth strategy..." class="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all resize-none text-slate-200"></textarea>
            </div>

            <button type="submit" class="w-full py-4 bg-gold hover:bg-gold-hover text-black font-extrabold uppercase text-xs tracking-widest hover-glow rounded-md duration-300">
              Send Proposal Message
            </button>
          </form>

          <!-- success overlay alert toast element -->
          <div id="success-toast" class="absolute inset-0 bg-neutral-950/95 rounded-2xl flex flex-col justify-center items-center text-center p-8 opacity-0 pointer-events-none transition-opacity duration-300">
            <svg class="w-16 h-16 text-gold mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h4 class="text-xl font-display font-medium text-white mb-2">Proposal Sent Successfully</h4>
            <p class="text-xs text-white/50 max-w-sm leading-relaxed">
              Message dispatched! Rojal's digital desk has been notified. Expect a responsive strategy brief shortly!
            </p>
            <button onclick="dismissToast()" class="mt-6 px-5 py-2 border border-white/20 hover:border-gold hover:text-gold text-white text-xs font-mono rounded duration-255">
              Reset Form
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- MINIMAL DARK FOOTER -->
  <footer class="py-12 border-t border-white/5 bg-[#060606] px-6 md:px-12 text-center text-white/40 text-xs text-medium relative">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <p>© 2026 Rojal Bajracharya. All rights reserved.</p>
        <p class="mt-1 flex items-center justify-center md:justify-start space-x-1 hover:text-gold duration-200">
          <span>Kathmandu, Nepal</span>
        </p>
      </div>

      <!-- quick scroll arrow -->
      <div>
        <a href="#home" class="w-10 h-10 bg-gold/10 hover:bg-gold hover:text-black border border-gold/20 duration-300 rounded-md flex justify-center items-center text-gold ml-auto" aria-label="Scroll to top">
          ▲
        </a>
      </div>
    </div>
  </footer>

  <!-- SCRIPT ENGINE -->
  <script>
    // 1. Navbar transition on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-[#0A0A0A]/95', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
        navbar.classList.remove('py-5');
      } else {
        navbar.classList.remove('bg-[#0A0A0A]/95', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
        navbar.classList.add('py-5');
      }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
      const isOpen = !mobileDrawer.classList.contains('translate-x-full');
      if (isOpen) {
        mobileDrawer.classList.add('translate-x-full');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        mobileDrawer.classList.remove('translate-x-full');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => {
      mobileDrawer.classList.add('translate-x-full');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }));

    // 3. Typist typing loop simulation
    const typewriterElement = document.getElementById('typewriter');
    const typingPhrases = ["Digital Marketer", "AI Marketing Learner"];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
      const currentPhrase = typingPhrases[phraseIndex];
      if (deleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!deleting && charIndex === currentPhrase.length) {
        deleting = true;
        typingSpeed = 2000; // Hold at the end of word
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typingSpeed = 500; // Wait before starting next text
      }

      setTimeout(handleTypewriter, typingSpeed);
    }
    setTimeout(handleTypewriter, 1000);

    // 4. Reveal items on scroll using Intersection Observer
    const sections = document.querySelectorAll('.fade-in-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach(sec => sectionObserver.observe(sec));

    // 5. Portfolio Filtering
    function filterPortfolio(category) {
      // Manage buttons look
      const buttons = document.querySelectorAll('.portfolio-tag-btn');
      buttons.forEach(btn => {
        btn.classList.add('bg-black/60', 'text-white');
        btn.classList.remove('bg-gold', 'text-black', 'font-semibold');
      });

      // Highlight target button
      let activeBtnId = 'filter-all';
      if (category === 'SEO') activeBtnId = 'filter-seo';
      if (category === 'Content') activeBtnId = 'filter-content';
      if (category === 'Social Media') activeBtnId = 'filter-social';
      
      const activeBtn = document.getElementById(activeBtnId);
      activeBtn.classList.remove('bg-black/60', 'text-white');
      activeBtn.classList.add('bg-gold', 'text-black', 'font-semibold');

      // Manage items visibility
      const items = document.querySelectorAll('.portfolio-card');
      items.forEach(card => {
        if (category === 'All' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // 6. Testimonials cycle simulation
    let currentSlide = 0;
    const totalSlides = 3;

    function gotoSlide(idx) {
      currentSlide = idx;
      
      // Update dots
      const dots = document.querySelectorAll('.testimonial-dot');
      dots.forEach(dot => {
        dot.classList.remove('bg-gold');
        dot.classList.add('bg-white/10', 'hover:bg-white/40');
      });
      document.getElementById('dot-' + idx).classList.add('bg-gold');
      document.getElementById('dot-' + idx).classList.remove('bg-white/10');

      // Update visibility smoothly
      const slides = document.querySelectorAll('.testimonial-slide');
      slides.forEach((sl, sIdx) => {
        if (sIdx === idx) {
          sl.classList.remove('opacity-0', 'pointer-events-none');
          sl.classList.add('opacity-100');
        } else {
          sl.classList.add('opacity-0', 'pointer-events-none');
          sl.classList.remove('opacity-100');
        }
      });
    }

    setInterval(() => {
      const next = (currentSlide + 1) % totalSlides;
      gotoSlide(next);
    }, 6000);

    // 7. Interactive contact message success simulated callback
    function handleDemoContact(event) {
      event.preventDefault();
      const toast = document.getElementById('success-toast');
      toast.classList.remove('opacity-0', 'pointer-events-none');
      toast.classList.add('opacity-100');
      
      // Clean inputs
      document.getElementById('contact-form').reset();
    }

    function dismissToast() {
      const toast = document.getElementById('success-toast');
      toast.classList.add('opacity-0', 'pointer-events-none');
      toast.classList.remove('opacity-100');
    }
  </script>
</body>
</html>`;

    // Download flow
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rojal_Bajracharya_Portfolio.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      
      {/* 1. Header/Translucent Sticky Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-5 flex items-center justify-between ${
          scrolled 
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center">
          <a href="#home" className="text-2xl font-display font-extrabold tracking-wider text-gold">
            RB<span className="text-white">.</span>
          </a>
        </div>

        {/* Desktop Directory links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Blog', 'Contact'].map((section) => (
            <a 
              key={section} 
              href={`#${section.toLowerCase()}`}
              className="text-white/85 hover:text-gold transition-colors duration-200 text-sm font-medium tracking-wide"
            >
              {section}
            </a>
          ))}
        </nav>

        {/* Right CTA button */}
        <div className="hidden lg:flex items-center space-x-4">
          <button 
            onClick={triggerSelfContainedDownload}
            className="flex items-center space-x-2 px-4 py-2 border border-white/10 text-white/80 rounded-md hover:border-gold hover:text-gold duration-200 text-xs font-semibold"
            title="Download full self-contained single-page HTML Portfolio"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get HTML Copy</span>
          </button>
          <button 
            onClick={triggerAuditCTA} 
            className="px-5 py-2.5 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold text-xs uppercase tracking-wider rounded-md transition-all duration-300 hover:scale-102 hover-glow focus:outline-none"
          >
            Get Free Audit
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <button 
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="lg:hidden text-white hover:text-gold duration-200"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </header>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-45 bg-[#0A0A0A]/98 backdrop-blur-md lg:hidden flex flex-col justify-center items-center space-y-6 text-xl p-6">
          {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Blog', 'Contact'].map((section) => (
            <a 
              key={section} 
              href={`#${section.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-gold transition-colors duration-200 font-medium"
            >
              {section}
            </a>
          ))}
          <button 
            onClick={() => { setMobileMenuOpen(false); triggerAuditCTA(); }}
            className="px-8 py-3.5 bg-[#F5A623] hover:bg-gold text-black font-extrabold text-sm uppercase tracking-wider rounded-md hover-glow duration-200"
          >
            Get Free Audit
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); triggerSelfContainedDownload(); }}
            className="flex items-center space-x-2 text-gold font-mono text-xs hover:underline pt-4"
          >
            <Download className="w-4 h-4" />
            <span>Download HTML Portfolio</span>
          </button>
        </div>
      )}

      {/* 2. Hero Section */}
      <section 
        id="home" 
        className="min-h-screen relative flex items-center justify-center px-6 md:px-12 pt-28 pb-16 overflow-hidden radial-mesh"
      >
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-6 text-left">
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs tracking-widest uppercase rounded-full border border-gold/25 font-semibold">
              Ready for collaborations
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
              Hi, I&apos;m <span className="text-gold">Rojal</span><br />Bajracharya
            </h1>
            <h2 className="text-lg md:text-2xl text-slate-350 font-medium h-12 flex items-center">
              I am a&nbsp;
              <span className="text-gold font-semibold relative after:content-['|'] after:animate-pulse after:text-gold after:ml-0.5">
                {typedText}
              </span>
            </h2>
            <p className="text-slate-400 max-w-lg leading-relaxed text-sm md:text-base">
              Crafting data-driven strategies for digital growth and integrating cutting-edge AI automation models to disrupt Kathmandu&apos;s marketing paradigm.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={triggerAuditCTA}
                className="px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-md hover-glow transition-all duration-300 transform hover:-translate-y-1 text-center cursor-pointer"
              >
                Claim Free Marketing Audit
              </button>
              <a 
                href="#portfolio" 
                className="px-8 py-4 bg-transparent border border-white/20 hover:border-gold hover:text-gold text-white font-extrabold text-xs uppercase tracking-widest rounded-md transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                View My Portfolio
              </a>
            </div>

            {/* Social media connections */}
            <div className="flex items-center space-x-6 pt-6">
              <span className="text-xs text-white/40 tracking-wider uppercase font-medium">Follow My Progress</span>
              <div className="h-px w-8 bg-white/20"></div>
              <a 
                href="https://linkedin.com/in/rojalbajracharya" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/60 hover:text-gold transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 animate-pulse" />
              </a>
              <a 
                href="https://instagram.com/bajracharyarojal" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/60 hover:text-gold transition-colors duration-200"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Golden animated illustration card */}
          <div className="relative flex justify-center items-center py-12">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-2xl bg-gradient-to-tr from-gold/10 to-transparent p-1 animate-float glow-gold relative select-none">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gold to-yellow-500 opacity-20 blur pointer-events-none"></div>
              <div className="w-full h-full bg-[#0E0E0E] rounded-xl flex flex-col justify-center items-center p-8 text-center space-y-4">
                
                <div className="absolute top-4 right-4 text-gold/30 text-xs font-mono">2026_STAGE //</div>
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-3">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold tracking-wide text-white">AI Automation Lab</h3>
                <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                  Synergizing deep analytics, programmatic search architectures, and behavioral model triggers.
                </p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
                  <div className="bg-gold h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between w-full text-[10px] font-mono text-white/40">
                  <span>SEO INTEGRITY</span>
                  <span>78% DEEP INTEGRATION</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-[#111111] relative border-y border-white/5">
        <FadeIn className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Profile Container */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/10 to-transparent blur-xl pointer-events-none rounded-full"></div>
            <div className="relative w-72 h-96 md:w-80 md:h-[420px] rounded-2xl border border-white/10 p-3 bg-gradient-to-b from-[#181818] to-dark-bg glow-gold">
              <div className="w-full h-full bg-neutral-900 rounded-xl overflow-hidden relative flex flex-col justify-end p-6">
                
                {/* mesh elements represent local SEO layout overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #F5A623 0.5px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                
                <div className="z-20 relative">
                  <span className="text-xs font-mono text-[#F5A623] tracking-widest uppercase">Based in Nepal</span>
                  <h4 className="text-xl font-display font-semibold mt-1">Rojal Bajracharya</h4>
                  <p className="text-xs text-white/55 mt-1 font-mono">Digital Marketing & AI Alumnus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy description */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs tracking-wider uppercase rounded-full border border-gold/20 font-semibold">
              Curriculum Vitae
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">About Rojal</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              I&apos;m a passionate Digital Marketer and AI Marketing Learner based in Kathmandu, Nepal. I recently completed an AI marketing course and I&apos;m actively building my skills in SEO, content strategy, social media marketing, and AI-driven campaigns. I&apos;m open to freelance work and collaborations.
            </p>

            {/* Core Capability display */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-semibold text-white/80 tracking-widest uppercase">Core Capacities</h4>
              <div className="flex flex-wrap gap-2.5">
                {['Digital Marketing', 'SEO', 'Content Strategy', 'AI Marketing', 'Social Media'].map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-black hover:border-gold/50 duration-300 transition-all text-xs border border-white/5 rounded-md font-medium text-slate-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Download Portfolio HTML file buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={triggerSelfContainedDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-gold hover:bg-gold-hover text-black font-extrabold text-sm rounded-md duration-300 shadow hover-glow"
              >
                <Download className="w-4 h-4" />
                <span>Get HTML Copy</span>
              </button>
              <button 
                onClick={() => {
                  alert("Rojal Bajracharya CV is bundled inside this full portfolio code! Click 'Get HTML Copy' to download the actual ready-to-use marketing application locally.");
                }}
                className="inline-flex items-center space-x-2 px-6 py-3 border border-white/10 hover:border-gold hover:text-gold text-white text-sm font-semibold rounded-md transition-colors duration-200"
              >
                <span>Mock download CV</span>
              </button>
            </div>
          </div>

        </FadeIn>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 bg-[#0A0A0A] relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-semibold text-gold tracking-widest uppercase">My Expertises</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">What I Offer</h2>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Service 1 */}
            <FadeIn delay="delay-0" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:scale-102 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">Digital Marketing Strategy</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Constructing end-to-end multi-channel action guides to position brands strategically for optimum engagement.
                </p>
              </div>
              <div className="w-full h-px bg-white/5 mt-6"></div>
            </FadeIn>

            {/* Service 2 */}
            <FadeIn delay="delay-100" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:scale-102 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">SEO Optimization</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Enhancing dynamic search discoverability to dominate modern localized search results structures natively.
                </p>
              </div>
              <div className="w-full h-px bg-white/5 mt-6"></div>
            </FadeIn>

            {/* Service 3 */}
            <FadeIn delay="delay-200" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:scale-102 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">Content Strategy</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Architecting tailored material workflows designed to secure inbound interest and foster deep client retention.
                </p>
              </div>
              <div className="w-full h-px bg-white/5 mt-6"></div>
            </FadeIn>

            {/* Service 4 */}
            <FadeIn delay="delay-300" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-gold/50 hover:scale-102 hover:-translate-y-2 hover-glow duration-300 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">AI Marketing</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Injecting automated models, cognitive optimization heuristics, and behavioral content engines for rapid lift.
                </p>
              </div>
              <div className="w-full h-px bg-white/5 mt-6"></div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 5. Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 md:px-12 bg-[#111111] relative border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-semibold text-gold tracking-widest uppercase">Curated Catalog</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">My Work</h2>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 select-none">
            {['All', 'SEO', 'Content', 'Social Media'].map((category) => (
              <button 
                key={category}
                onClick={() => setPortfolioFilter(category)}
                className={`px-5 py-2.5 rounded-md font-semibold text-xs uppercase duration-200 ${
                  portfolioFilter === category 
                    ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                    : 'bg-black/60 text-white hover:bg-gold hover:text-black hover:font-semibold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 3 locked Coming Soon cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, idx) => (
              <FadeIn 
                key={item.id} 
                delay={`delay-${idx * 150}`} 
                className="group relative bg-[#0E0E0E] rounded-xl overflow-hidden border border-white/5 p-6 space-y-4 hover:border-gold/30 duration-200"
              >
                <div className="relative overflow-hidden rounded-lg aspect-video w-full bg-gradient-to-tr from-amber-600/15 via-yellow-500/10 to-transparent flex flex-col items-center justify-center filter blur-[1px]">
                  
                  <div className="p-6 text-center z-10">
                    <span className="text-[10px] text-gold uppercase tracking-wider font-mono">Project {item.category} Beta</span>
                    <h4 className="text-lg font-display font-semibold mt-1">{item.name}</h4>
                  </div>

                  {/* Dark locked overlay */}
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center space-y-3">
                    <Lock className="w-8 h-8 text-gold animate-pulse" />
                    <span className="text-xs text-white/50 font-mono tracking-widest uppercase">Coming Soon</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gold font-semibold tracking-wider">{item.category} Strategy</span>
                    <span className="text-white/40">LOCK STATUS //</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-sans mt-1">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center pt-12">
            <span className="text-xs text-white/45 font-mono">
              * Case studies locked during build phase in Kathmandu validation labs.
            </span>
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="space-y-4 mb-12">
            <span className="text-sm font-semibold text-gold tracking-widest uppercase">Kind Words</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">What People Say</h2>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
          </div>

          {/* Testimonial Active Display Card with transition overlay */}
          <div className="relative h-[280px] md:h-[220px] flex items-center justify-center">
            {testimonials.map((item, index) => (
              <div 
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center items-center ${
                  activeTestimonial === index 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <p className="text-base md:text-lg text-slate-300 italic max-w-2xl leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center space-x-1 text-gold mt-6 justify-center">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-gold" />
                  ))}
                </div>
                <h4 className="font-display font-medium text-white text-sm md:text-base mt-2">{item.name}</h4>
                <span className="text-xs text-white/45 mt-0.5">{item.role}</span>
              </div>
            ))}
          </div>

          {/* Manual dots menu indicators */}
          <div className="flex gap-2.5 justify-center mt-6">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  activeTestimonial === index 
                    ? 'bg-gold scale-110' 
                    : 'bg-white/10 hover:bg-white/40'
                }`}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Blog Section */}
      <section id="blog" className="py-24 px-6 md:px-12 bg-[#111111] relative border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-semibold text-gold tracking-widest uppercase">Deep Research</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Latest Insights</h2>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <FadeIn 
                key={post.id} 
                delay={`delay-${idx * 150}`}
                className="bg-[#141414] rounded-xl border border-white/5 overflow-hidden group hover:border-[#F5A623]/30 hover:scale-[1.01] hover:-translate-y-2 duration-300 transition-all flex flex-col justify-between"
              >
                
                {/* Simulated dynamic thumbnail header */}
                <div className={`bg-gradient-to-tr ${post.gradient} h-44 relative flex items-center justify-center text-center p-6 bg-cover bg-center select-none`}>
                  <div className="absolute inset-0 bg-neutral-950/70"></div>
                  <div className="relative z-10">
                    <span className="text-[9px] uppercase font-mono tracking-wider font-semibold text-gold">AI integration</span>
                    <h4 className="text-xs font-display font-semibold mt-1.5 text-white capitalize max-w-xs">{post.title.substring(0, 32)}...</h4>
                  </div>
                  
                  {/* badge */}
                  <span className="absolute top-4 right-4 bg-black/60 text-gold font-mono text-[9px] px-2 py-0.5 rounded border border-gold/25 font-bold uppercase transition-transform group-hover:scale-105 duration-200">
                    Coming Soon
                  </span>
                </div>

                {/* post details bodies */}
                <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-gold border border-gold/20 text-[9px] font-semibold tracking-wider uppercase">
                        {post.category}
                      </span>
                      <span className="text-white/40">{post.readTime}</span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-white group-hover:text-gold transition-colors duration-200">
                      {post.title}
                    </h3>

                    <p className="text-white/50 text-xs lines-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between items-center text-xs border-t border-white/5 mt-4 select-none">
                    <span className="text-white/30 font-medium">Coming Soon</span>
                    <button disabled className="text-white/25 cursor-not-allowed font-semibold hover:text-gold/40">Read More</button>
                  </div>
                </div>

              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* 7.5 High-Conversion Call-to-Action Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#111111] via-[#0E0E0E] to-[#0A0A0A] relative border-b border-white/5 overflow-hidden">
        {/* Decorative ambient gold glow dots */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-gold/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <FadeIn className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/10 text-gold text-xs font-mono uppercase tracking-widest rounded-full border border-gold/25">
              <TrendingUp className="w-3 h-3 text-gold animate-pulse" />
              <span>Limited Slots Available This Month</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Ready to Accelerate Your <span className="text-gold">Digital Growth</span>?
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Stop guessing about your organic reach and lead acquisition. Get a comprehensive, custom-tailored <strong className="text-white">15-minute Digital Audit</strong> covering search engine optimization, local Kathmandu brand positioning, and smart automation workflows. Completely free, no obligations.
            </p>
          </FadeIn>

          <FadeIn delay="delay-150">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={triggerAuditCTA}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:opacity-90 text-black font-extrabold uppercase text-xs tracking-widest hover-glow rounded-md duration-300 cursor-pointer"
              >
                Claim Free 15-Min Audit
              </button>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/20 hover:border-gold hover:text-gold text-white font-bold text-xs uppercase tracking-widest rounded-md transition-colors duration-300"
              >
                Inquire For Custom Scope
              </a>
            </div>
            <p className="text-[11px] font-mono text-white/45 mt-4">
              🔥 4 spots remaining for &ldquo;June 2026&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 8. Contact Section with interactive focus glows */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#0A0A0A] relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-semibold text-gold tracking-widest uppercase font-semibold">Reach Out</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Let&apos;s Work Together</h2>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Informational block */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-white">Let&apos;s Create Something Extraordinary</h3>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  Whether you want to launch high-conversion search campaigns, automate your content pipeline using intelligent tools, or integrate data-centric local optimizations, let&apos;s build your brand equity.
                </p>
              </div>

              {/* coordinates */}
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 shadow" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Location</h4>
                    <p className="text-slate-200 text-sm font-medium">Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Email Dispatch</h4>
                    <p className="text-slate-200 text-sm font-medium">hello@byrojal.com</p>
                  </div>
                </div>
              </div>

              {/* socials */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-white/50 uppercase">Sync Channels</h4>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://linkedin.com/in/rojalbajracharya" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 border border-white/5 hover:border-gold duration-250 bg-[#0E0E0E] text-white/70 hover:text-gold rounded-md flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://instagram.com/bajracharyarojal" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 border border-white/5 hover:border-gold duration-250 bg-[#0E0E0E] text-white/70 hover:text-gold rounded-md flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Forms column */}
            <div className="bg-[#141414] p-8 rounded-2xl border border-white/5 relative">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Your Name</label>
                  <input 
                    id="form-name"
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Rojal Bajracharya" 
                    className="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label htmlFor="form-email" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                  <input 
                    id="form-email"
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com" 
                    className="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label htmlFor="form-subject" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Subject Action</label>
                  <input 
                    id="form-subject"
                    required 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Campaign proposal, Collaboration..." 
                    className="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Detailed Message</label>
                  <textarea 
                    id="form-message"
                    required 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    placeholder="Let's build a programmatic growth strategy..." 
                    className="w-full bg-[#0E0E0E] border border-white/5 focus:border-gold outline-none px-4 py-3 rounded-md text-white text-sm transition-all resize-none focus:ring-1 focus:ring-gold"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 bg-gold hover:bg-gold-hover text-black font-extrabold uppercase text-xs tracking-widest hover-glow rounded-md duration-300 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Dispatching Message...' : 'Send Message Proposal'}
                </button>
              </form>

              {/* Overlay success message toast alerts */}
              {formStatus === 'success' && (
                <div className="absolute inset-0 bg-neutral-950/95 rounded-2xl flex flex-col justify-center items-center text-center p-8 transition-all duration-300">
                  <CheckCircle className="w-16 h-16 text-gold mb-4 animate-bounce" />
                  <h4 className="text-xl font-display font-medium text-white mb-2">Proposal Sent Successfully</h4>
                  <p className="text-xs text-white/50 max-w-sm leading-relaxed">
                    Message dispatched! Rojal&apos;s digital desk has been notified. Expect a responsive strategy brief shortly!
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 px-5 py-2 border border-white/20 hover:border-gold hover:text-gold text-white text-xs font-mono rounded duration-250"
                  >
                    Reset Form
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 9. Minimal Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#060606] px-6 md:px-12 text-center text-white/40 text-xs font-medium relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p>© 2026 Rojal Bajracharya. All rights reserved.</p>
            <p className="text-[10px] hover:text-gold duration-200">
              Personal portfolio built with precision &amp; modern styling.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-3">
            <button 
              onClick={triggerSelfContainedDownload} 
              className="text-xs text-gold/80 hover:text-gold hover:underline flex items-center space-x-1 font-mono uppercase tracking-wider"
              title="Click here to extract fully complete single file HTML code of this personal portfolio"
            >
              <span>Download HTML Portfolio</span>
              <Download className="w-3.5 h-3.5 ml-1" />
            </button>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/rojalbajracharya" target="_blank" rel="noreferrer" className="hover:text-white duration-200">LinkedIn</a>
              <span className="text-white/10">|</span>
              <a href="https://instagram.com/bajracharyarojal" target="_blank" rel="noreferrer" className="hover:text-white duration-200">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Backup Scroll-to-Top Button */}
      {showScrollTop && (
        <a 
          href="#home" 
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-gold text-black rounded-full flex justify-center items-center shadow-lg hover:bg-yellow-500 duration-200 font-bold focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </a>
      )}

    </div>
  );
}

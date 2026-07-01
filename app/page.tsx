'use client';
import { useEffect, useState, useRef } from 'react';
import { 
  TrendingUp, Search, FileText, Cpu, Linkedin, Instagram, 
  Mail, MapPin, ArrowUp, Download, Menu, X, Lock, 
  ChevronLeft, ChevronRight, CheckCircle, Star, Briefcase, 
  Layers, GraduationCap 
} from 'lucide-react';

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
      setIsDeleting(false);
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
      setSubIndex(0);
      return;
    }
    const timeout = setTimeout(() => {
      setText(words[index].substring(0, subIndex + (isDeleting ? -1 : 1)));
      setSubIndex((prevSubIndex) => prevSubIndex + (isDeleting ? -1 : 1));
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, words, speed, delay]);

  return text;
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

function FadeIn({ children, className, delay }: FadeInProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        if (domRef.current) observer.unobserve(domRef.current);
      }
    }, { threshold: 0.15 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
      } ${delay} ${className}`}
    >
      {children}
    </div>
  );
}

export default function PortfolioPage() {
  const typingWords = ["Digital Marketer", "AI Marketing Learner"];
  const typedText = useTypingEffect(typingWords, 80, 2000);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
      if (window.scrollY > 500) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    }, 1500);
    setTimeout(() => setFormStatus('idle'), 5000);
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
      message: 'Hi Rojal, I would love to schedule a free 15-minute AI marketing & SEO audit for my brand!'
    });
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const portfolioItems = [
    { id: 1, name: 'Growth Campaign Accelerator', category: 'SEO', desc: 'AI-assisted semantic search engine optimizations.' },
    { id: 2, name: 'Hyper-Targeted Content Hub', category: 'Content', desc: 'SaaS user acquisition & conversion flows.' },
    { id: 3, name: 'SocioSphere AI Automation', category: 'Social Media', desc: 'Intelligent multi-channel visibility pipelines.' }
  ];

  const filteredPortfolio = portfolioFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === portfolioFilter);

  const testimonials = [
    { id: 1, name: "Saurav Karki", role: "SEO Strategist", rating: 5, text: "Rojal demonstrates a rare curiosity for AI automation. His dedication to learning next-gen workflows makes him a highly adaptable partner." },
    { id: 2, name: "Alisha Shrestha", role: "Creative Director", rating: 5, text: "Collaborating with Rojal is an absolute breeze. He excels in structuring comprehensive multi-channel digital audits with high efficiency." },
    { id: 3, name: "Prabin Bajracharya", role: "E-commerce Founder", rating: 5, text: "Rojal's understanding of social media reach, paired with newly acquired AI techniques, yielded great perspective for our performance pipelines." }
  ];

  const blogPosts = [
    { id: 1, title: "Synthesizing AI in Digital Campaigns: A 2026 Shift", category: "AI Marketing", date: "June 2026", readTime: "4 min read", gradient: "from-amber-600 to-yellow-500", excerpt: "Unpacking the synergy of generative models and customer behavior analytics to form harmonious, localized funnels." },
    { id: 2, title: "SEO Foundations & Semantic Search Dominance", category: "SEO Strategy", date: "May 2026", readTime: "5 min read", gradient: "from-yellow-600 to-orange-500", excerpt: "Why legacy keyword stuffing is obsolete and how context-driven semantic clusters are winning local search spaces." },
    { id: 3, title: "The Dynamic Funnel: Content Automation Scale", category: "Content Strategy", date: "April 2026", readTime: "6 min read", gradient: "from-orange-600 to-amber-500", excerpt: "Building localized, contextually accurate marketing architectures to scale content outputs smoothly." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#F5A623] selection:text-black">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-5 flex items-center justify-between ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' : 'bg-transparent'}`}>
        <div className="flex items-center">
          <a href="#home" className="text-2xl font-bold tracking-wider text-[#F5A623]">RB<span className="text-white">.</span></a>
        </div>
        <nav className="hidden lg:flex items-center space-x-8">
          {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Blog', 'Contact'].map((section) => (
            <a key={section} href={`#${section.toLowerCase()}`} className="text-white/85 hover:text-[#F5A623] transition-colors duration-200 text-sm font-medium">{section}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          <button onClick={triggerAuditCTA} className="px-5 py-2.5 bg-gradient-to-r from-[#F5A623] to-yellow-500 text-black font-bold text-sm rounded transition-all transform hover:scale-[1.02]">
            Get Free Audit
          </button>
        </div>
        <button onClick={() => setMobileMenuOpen(prev => !prev)} className="lg:hidden text-white hover:text-[#F5A623] duration-200">
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-md lg:hidden flex flex-col justify-center items-center space-y-6 animate-fadeIn">
          {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Blog', 'Contact'].map((section) => (
            <a key={section} href={`#${section.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#F5A623] transition-colors duration-200 font-medium text-xl">{section}</a>
          ))}
          <button onClick={() => { setMobileMenuOpen(false); triggerAuditCTA(); }} className="px-8 py-3.5 bg-[#F5A623] text-black font-extrabold text-sm uppercase tracking-wider rounded shadow-lg shadow-gold/20">
            Get Free Audit
          </button>
        </div>
      )}

      <section id="home" className="min-h-screen relative flex items-center justify-center px-6 md:px-12 pt-28 pb-16">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, #1F1F1F 1px, transparent 1px), linear-gradient(to bottom, #1F1F1F 1px, transparent 1px)' }}></div>
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-left">
            <div className="inline-block px-3 py-1 bg-[#F5A623]/10 text-[#F5A623] text-xs tracking-widest uppercase rounded font-mono">Ready for collaborations</div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white">Hi, I&apos;m <span className="text-[#F5A623]">Rojal</span><br />Bajracharya</h1>
            <h2 className="text-lg md:text-2xl text-slate-350 font-medium h-12 flex items-center">I am a&nbsp;<span className="text-[#F5A623] font-semibold">{typedText}</span></h2>
            <p className="text-slate-400 max-w-lg leading-relaxed text-sm md:text-base">Crafting data-driven strategies for digital growth and integrating cutting-edge AI marketing frameworks seamlessly.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={triggerAuditCTA} className="px-8 py-4 bg-gradient-to-r from-[#F5A623] to-yellow-500 text-black font-extrabold rounded-md text-sm shadow-lg transform duration-200 hover:scale-[1.02]">Claim Free Marketing Audit</button>
              <a href="#portfolio" className="px-8 py-4 bg-transparent border border-white/20 hover:border-[#F5A623] hover:text-[#F5A623] text-white font-semibold rounded-md text-sm transition-all duration-300">View My Portfolio</a>
            </div>
          </div>
          <div className="relative flex justify-center items-center py-12">
            <div className="w-full h-full bg-[#0E0E0E] rounded-xl border border-white/5 p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-2xl relative">
              <div className="w-16 h-16 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]"><Cpu className="w-8 h-8" /></div>
              <h3 className="text-xl font-semibold tracking-wide text-white">AI Automation Labs</h3>
              <p className="text-xs text-white/50 max-w-xs leading-relaxed">Synergizing deep analytics, programmatic search architectures, and behavioral model fine-tuning.</p>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
                <div className="bg-[#F5A623] h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 md:px-12 bg-[#111111] relative border-y border-white/5">
        <FadeIn className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center">
            <div className="relative w-72 h-96 md:w-80 md:h-[420px] rounded-2xl border border-white/10 p-3 bg-neutral-950 flex flex-col justify-end p-6">
              <span className="text-xs font-mono text-[#F5A623] tracking-widest uppercase">Based in Nepal</span>
              <h4 className="text-xl font-semibold mt-1">Rojal Bajracharya</h4>
              <p className="text-xs text-white/55 mt-1 font-mono">Digital Marketing & AI Alumnus</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-[#F5A623]/10 text-[#F5A623] text-xs tracking-wider uppercase rounded font-mono">Curriculum Vitae</div>
            <h2 className="text-3xl md:text-4xl font-bold">About Rojal</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">I&apos;m a passionate Digital Marketer and AI Marketing Learner based in Kathmandu, Nepal. I specialize in merging traditional digital analytics architectures with the powerful automation tools of today.</p>
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-semibold text-white/80 tracking-widest uppercase">Core Capacities</h4>
              <div className="flex flex-wrap gap-2.5">
                {['Digital Marketing', 'SEO', 'Content Strategy', 'AI Marketing', 'Social Media'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-black hover:border-[#F5A623]/50 duration-300 transition-all text-xs border border-white/5 rounded-md font-medium tracking-wide text-white/90">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section id="services" className="py-24 px-6 md:px-12 bg-[#0A0A0A] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-semibold text-[#F5A623] tracking-widest uppercase">My Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold">What I Offer</h2>
            <div className="w-12 h-1 bg-[#F5A623] mx-auto rounded-full mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay="delay-0" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-[#F5A623]/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-lg flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
                <h3 className="text-lg font-semibold text-white">Digital Marketing Strategy</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">Constructing end-to-end multi-channel action guides to position brands strategically for growth.</p>
              </div>
            </FadeIn>
            <FadeIn delay="delay-100" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-[#F5A623]/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-lg flex items-center justify-center"><Search className="w-6 h-6" /></div>
                <h3 className="text-lg font-semibold text-white">SEO Optimization</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">Enhancing dynamic search discoverability to dominate modern localized search results structurally.</p>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-[#F5A623]/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-lg flex items-center justify-center"><FileText className="w-6 h-6" /></div>
                <h3 className="text-lg font-semibold text-white">Content Strategy</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">Architecting tailored material workflows designed to secure inbound interest and foster community loyalty.</p>
              </div>
            </FadeIn>
            <FadeIn delay="delay-300" className="bg-[#141414] p-8 rounded-xl border border-white/5 hover:border-[#F5A623]/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-lg flex items-center justify-center"><Cpu className="w-6 h-6" /></div>
                <h3 className="text-lg font-semibold text-white">AI Marketing</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">Injecting automated models, cognitive optimization heuristics, and behavioral content engines into standard cycles.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 px-6 md:px-12 bg-[#111111] relative border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-semibold text-[#F5A623] tracking-widest uppercase">Curated Catalog</span>
            <h2 className="text-3xl md:text-5xl font-bold">My Work</h2>
            <div className="w-12 h-1 bg-[#F5A623] mx-auto rounded-full mt-3"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12 select-none">
            {['All', 'SEO', 'Content', 'Social Media'].map((category) => (
              <button key={category} onClick={() => setPortfolioFilter(category)} className={`px-5 py-2.5 rounded-md font-semibold text-xs uppercase duration-200 ${portfolioFilter === category ? 'bg-[#F5A623] text-black shadow-lg shadow-gold/20' : 'bg-black/60 text-white hover:bg-[#F5A623] hover:text-black'}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, idx) => (
              <FadeIn key={item.id} delay={`delay-${idx * 150}`} className="group relative bg-[#0E0E0E] rounded-xl overflow-hidden border border-white/5 p-6 flex flex-col justify-between min-h-[220px]">
                <div className="text-center z-10 space-y-2">
                  <span className="text-[10px] text-[#F5A623] uppercase tracking-wider font-mono">{item.category} Strategy</span>
                  <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-sans mt-2">{item.desc}</p>
                </div>
                <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center space-y-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <Lock className="w-8 h-8 text-[#F5A623] animate-pulse" />
                  <span className="text-xs text-white/50 font-mono tracking-widest uppercase">Coming Soon</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 px-6 md:px-12 bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 mb-12">
            <span className="text-sm font-semibold text-[#F5A623] tracking-widest uppercase">Kind Words</span>
            <h2 className="text-3xl md:text-5xl font-bold">What People Say</h2>
            <div className="w-12 h-1 bg-[#F5A623] mx-auto rounded-full mt-3"></div>
          </div>
          <div className="relative h-[280px] md:h-[220px] flex items-center justify-center">
            {testimonials.map((item, index) => (
              <div key={item.id} className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center items-center ${activeTestimonial === index ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <p className="text-base md:text-lg text-slate-300 italic max-w-2xl leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center space-x-1 text-[#F5A623] mt-6 justify-center">
                  {Array.from({ length: item.rating }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-current text-[#F5A623]" />))}
                </div>
                <h4 className="font-medium text-white text-sm md:text-base mt-2">{item.name}</h4>
                <span className="text-xs text-white/45 mt-0.5">{item.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 md:px-12 bg-[#0A0A0A] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-semibold text-[#F5A623] tracking-widest uppercase">Reach Out</span>
            <h2 className="text-3xl md:text-5xl font-bold">Let&apos;s Work Together</h2>
            <div className="w-12 h-1 bg-[#F5A623] mx-auto rounded-full mt-3"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Let&apos;s Create Something Extraordinary</h3>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">Whether you want to launch high-conversion search campaigns, automate your content pipeline, or consult on modern AI layouts, my desk is completely open.</p>
              </div>
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-[#F5A623]/10 text-[#F5A623] rounded-lg flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Location</h4>
                    <p className="text-slate-200 text-sm font-medium">Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-[#F5A623]/10 text-[#F5A623] rounded-lg flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Email Dispatch</h4>
                    <p className="text-slate-200 text-sm font-medium">hello@byrojal.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#141414] p-8 rounded-2xl border border-white/5 relative">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Your Full Identity</label>
                  <input id="form-name" required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Rojal Bajracharya" className="w-full bg-[#0E0E0E] border border-white/5 focus:border-[#F5A623] outline-none text-sm p-4 rounded text-white transition-all" />
                </div>
                <div>
                  <label htmlFor="form-email" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Email Channels</label>
                  <input id="form-email" required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@domain.com" className="w-full bg-[#0E0E0E] border border-white/5 focus:border-[#F5A623] outline-none text-sm p-4 rounded text-white transition-all" />
                </div>
                <div>
                  <label htmlFor="form-subject" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Subject Matter</label>
                  <input id="form-subject" required type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Campaign proposal, Collaboration..." className="w-full bg-[#0E0E0E] border border-white/5 focus:border-[#F5A623] outline-none text-sm p-4 rounded text-white transition-all" />
                </div>
                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Detailed Scope</label>
                  <textarea id="form-message" required name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Let's build a programmatic growth strategy." className="w-full bg-[#0E0E0E] border border-white/5 focus:border-[#F5A623] outline-none text-sm p-4 rounded text-white transition-all"></textarea>
                </div>
                <button type="submit" disabled={formStatus === 'submitting'} className="w-full py-4 bg-[#F5A623] text-black font-extrabold uppercase tracking-widest rounded text-xs transition-all hover:bg-yellow-500 disabled:opacity-50">
                  {formStatus === 'submitting' ? 'Dispatching Message...' : 'Send Message Proposal'}
                </button>
              </form>
              {formStatus === 'success' && (
                <div className="absolute inset-0 bg-neutral-950/95 rounded-2xl flex flex-col justify-center items-center text-center p-8 z-20">
                  <CheckCircle className="w-16 h-16 text-[#F5A623] mb-4" />
                  <h4 className="text-xl font-medium text-white mb-2">Proposal Sent Successfully</h4>
                  <p className="text-xs text-white/50 max-w-sm leading-relaxed">Message dispatched! Rojal&apos;s digital desk has been notified. Expect a responsive response shortly.</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-6 px-5 py-2 border border-white/20 hover:border-[#F5A623] hover:text-[#F5A623] transition-colors rounded text-xs text-white">Reset Form</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-[#060606] px-6 md:px-12 text-center text-white/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© 2026 Rojal Bajracharya. All rights reserved.</p>
          <a href="#home" className="w-10 h-10 bg-[#F5A623]/10 hover:bg-[#F5A623] hover:text-black text-[#F5A623] border border-[#F5A623]/20 flex justify-center items-center rounded-full transition-all"><ArrowUp className="w-5 h-5" /></a>
        </div>
      </footer>
    </div>
  );
}
import { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import StarBorder from "../components/StarBorder";
import './ScrollStack.css';

const projects = [
  {
    id: "001",
    title: "Aegis — Payment Operations Intelligence Platform",
    stack: "Python / FastAPI / Supabase / Redis / Docker / Groq",
    description: "A Payment Operations Intelligence Platform that reconstructs the complete lifecycle of every payment across Core Banking, RAAST, Wallet APIs, and Settlement Files, featuring AI-assisted incident summaries.",
    links: { live: "https://github.com/FaizanAhmeddd27/sentinel-backend", code: "https://github.com/FaizanAhmeddd27/sentinel-backend" },
    image: "/aegis.jpg",
    cta: "View on Github"
  },
  {
    id: "002",
    title: "FinSync Digital Banking Platform",
    stack: "React / Node.js / PostgreSQL / Redis",
    description: "A secure full-stack finance system with immutable ledger accounting, AI fraud detection, chatbot assistance, investment portfolio tracking, QR payments, and 2FA authentication.",
    links: { live: "https://finsync-official.vercel.app", code: "https://github.com/FaizanAhmeddd27/FinSync" },
    image: "/finsync.jpeg",
    cta: "Live Project"
  },
  {
    id: "003",
    title: "AI Recruitment Platform",
    stack: "React / Node.js / PostgreSQL / MongoDB",
    description: "An AI-powered platform where candidates upload resumes, view matched jobs, and track applications. Recruiters post jobs and get AI-ranked candidates.",
    links: { live: "https://recruit-ai-app.vercel.app", code: "https://github.com/FaizanAhmeddd27/AI-Powered-Recruitment-and-Workforce-Intelligence-Platform" },
    image: "/recruitai.png",
    cta: "Live Project"
  },
  {
    id: "004",
    title: "NeuroFit",
    stack: "React / Node.js / MongoDB / Gemini API",
    description: "A sophisticated AI-powered fitness and nutrition tracker designed to provide personalized health insights using the Gemini API.",
    links: { live: "https://neuro-fitness.vercel.app", code: "https://github.com/FaizanAhmeddd27/NeuroFit" },
    image: "/neurofit.png",
    cta: "Live Project"
  },
  {
    id: "005",
    title: "NexStore",
    stack: "Node.js / Express / MongoDB / Stripe",
    description: "A modular e-commerce API built with Node.js, Express, and MongoDB. Features JWT auth, Cloudinary image uploads, Stripe payments, and Redis caching.",
    links: { live: "https://next-store-mart.vercel.app", code: "http://github.com/FaizanAhmeddd27/E-NexStore" },
    image: "/nexstore.png",
    cta: "Live Project"
  },
  {
    id: "006",
    title: "DentAssist Pro",
    stack: "React / Node.js / MongoDB / AI/ML",
    description: "An AI-powered dental assistant that helps patients and clinics make smarter oral-care decisions leveraging modern AI.",
    links: { live: "https://github.com/FaizanAhmeddd27/DentAssist-Pro", code: "https://github.com/FaizanAhmeddd27/DentAssist-Pro" },
    image: "/dentassist.png",
    cta: "View on Github"
  },
  {
    id: "007",
    title: "AI Loan Risk Assessment Platform",
    stack: "Python / FastAPI / Next.js / XGBoost",
    description: "An advanced fintech platform predicting loan default probability using XGBoost & Scikit-Learn ensembles with Explainable AI (SHAP).",
    links: { live: "https://github.com/FaizanAhmeddd27/AI-Loan-Risk-Assessment-Platform", code: "https://github.com/FaizanAhmeddd27/AI-Loan-Risk-Assessment-Platform" },
    image: "/ai.png",
    cta: "View on Github"
  },
];

interface ScrollStackCardProps {
  project: typeof projects[0];
  index: number;
}

const ScrollStackCard = ({ project, index }: ScrollStackCardProps) => {
  return (
    <StarBorder
      as="div"
      className="scroll-stack-card"
      color="#00f2fe, #4facfe, #7000ff"
      speed="8s"
    >
      <div className="card-top-row">
        <div className="id-brand-group">
          <span className="huge-number">{project.id}</span>
          <div className="client-info">
            <span className="label">{project.title}</span>
            <span className="client-name">{project.stack}</span>
          </div>
        </div>

        <StarBorder
          as="a"
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="live-btn-star"
          color="#f6d365, #fda085"
          speed="3s"
        >
          {project.cta}
        </StarBorder>
      </div>

      <div className="content-grid">
        <img
          src={project.image}
          className="main-image w-full h-auto object-contain"
          alt={project.title}
          onLoad={() => window.dispatchEvent(new Event('resize'))}
        />
        <div className="project-description">
          <p>{project.description}</p>
        </div>
      </div>
    </StarBorder>
  );
};

const BASE_CONFIG = {
  itemDistance: 100,
  itemScale: 0.015,
  itemStackDistance: 18,
  stackPosition: 0.08,
  scaleEndPosition: 0.05,
  baseScale: 0.92,
};

const SelectedWorks = () => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);
  const stackInnerRef = useRef<HTMLDivElement>(null);
  const stackInnerTopRef = useRef<number>(0);
  const voidContainerRef = useRef<HTMLDivElement>(null);
  const kineticWheelRef = useRef<HTMLDivElement>(null);
  const threadPathRef = useRef<SVGPathElement>(null);
  const figureGroupRef = useRef<SVGGElement>(null);
  const threadLenRef = useRef(0);

  // Refs for Typography animation
  const textAnalyzeRef = useRef<SVGTextElement>(null);
  const textDesignRef = useRef<SVGTextElement>(null);
  const textBuildRef = useRef<SVGTextElement>(null);
  const textDeliverRef = useRef<SVGTextElement>(null);

  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLenis(({ scroll }) => {
    if (!ready) return;

    const cards = cardsRef.current;
    const cardOffsets = cardOffsetsRef.current;
    const endElementTop = endOffsetRef.current;
    const stackInnerTop = stackInnerTopRef.current;

    if (!cards.length || !cardOffsets.length) return;

    const containerHeight = window.innerHeight;
    const firstCardHeight = cards[0].offsetHeight;

    const stackPositionPx = (containerHeight - firstCardHeight) / 2;
    const scaleEndPositionPx = stackPositionPx - (BASE_CONFIG.stackPosition - BASE_CONFIG.scaleEndPosition) * containerHeight;

    const lastCardTop = cardOffsets[cards.length - 1];
    const triggerEndLast = lastCardTop - scaleEndPositionPx;

    const voidStart = triggerEndLast;
    const voidDistance = containerHeight * 1.2;
    let voidProgress = 0;

    if (scroll > voidStart) {
      voidProgress = (scroll - voidStart) / voidDistance;
      voidProgress = Math.min(Math.max(voidProgress, 0), 1);
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - BASE_CONFIG.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = Math.max(endElementTop - containerHeight * 0.5, voidStart + voidDistance);

      let scaleProgress = 0;
      if (scroll >= triggerEnd) {
        scaleProgress = 1;
      } else if (scroll > triggerStart) {
        scaleProgress = (scroll - triggerStart) / (triggerEnd - triggerStart);
      }

      scaleProgress = Math.min(Math.max(scaleProgress, 0), 1);

      const targetScale = BASE_CONFIG.baseScale + i * BASE_CONFIG.itemScale;
      const scale = Number((1 - scaleProgress * (1 - targetScale)).toFixed(4));

      let translateY = 0;
      if (scroll >= pinStart && scroll <= pinEnd) {
        translateY = scroll - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      } else if (scroll > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${Math.round(translateY * 10) / 10}px, 0) scale(${scale})`;
    }

    const voidContainer = voidContainerRef.current;
    const stackInner = stackInnerRef.current;

    if (voidContainer && stackInner) {
      const originY = scroll + containerHeight / 2 - stackInnerTop;
      stackInner.style.perspectiveOrigin = `50% ${originY}px`;
      stackInner.style.perspective = '1500px';

      if (voidProgress > 0) {
        if (isMobile) {
          const fadeOutProgress = Math.min(voidProgress / 0.25, 1);
          const currentOpacity = 1 - fadeOutProgress;

          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = `translate3d(0, 0, 0) scale(1)`;
          voidContainer.style.opacity = Math.max(0, currentOpacity).toFixed(3);

          if (fadeOutProgress >= 1) {
            voidContainer.style.visibility = 'hidden';
          } else {
            voidContainer.style.visibility = 'visible';
          }
        } else {
          const easeScale = Math.pow(voidProgress, 1.5);
          const currentZ = -easeScale * 3000;
          const currentScale = 1 - easeScale;
          const currentOpacity = 1 - Math.pow(voidProgress, 2.5);

          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = `translate3d(0, 0, ${currentZ}px) scale(${Math.max(0, currentScale).toFixed(4)})`;
          voidContainer.style.opacity = Math.max(0, currentOpacity).toFixed(3);

          if (voidProgress >= 1) {
            voidContainer.style.visibility = 'hidden';
          } else {
            voidContainer.style.visibility = 'visible';
          }
        }
      } else {
        voidContainer.style.transformOrigin = '';
        voidContainer.style.transform = '';
        voidContainer.style.opacity = '1';
        voidContainer.style.visibility = 'visible';
      }
    }

    const thread = threadPathRef.current;
    const threadLen = threadLenRef.current;

    if (thread && threadLen > 0 && isMobile) {
      let drawP = 0;
      if (voidProgress > 0.2) {
        drawP = (voidProgress - 0.2) / 0.8;
      }
      drawP = Math.min(Math.max(drawP, 0), 1);
      thread.style.strokeDasharray = `${threadLen}`;
      thread.style.strokeDashoffset = `${(threadLen * (1 - drawP)).toFixed(2)}`;

      // Flashlight Typography Animation
      const animateText = (ref: React.RefObject<SVGTextElement>, targetP: number) => {
        if (!ref.current) return;
        const threshold = 0.15; // Width of the "flashlight" beam
        const dist = Math.abs(drawP - targetP);
        let intensity = 0;

        if (dist < threshold) {
          intensity = 1 - (dist / threshold); // Scales from 0 to 1 based on proximity
        }

        const opacity = 0.3 + (0.7 * intensity); // Base 30% opacity, flares to 100%
        const scale = 1 + (0.05 * intensity); // Slight pop in size

        ref.current.style.opacity = opacity.toFixed(2);
        ref.current.style.transform = `scale(${scale})`;
        ref.current.style.transformOrigin = 'center';
        ref.current.style.transformBox = 'fill-box';
      };

      // Recalibrated thresholds for the new S-Curve ribbon
      animateText(textAnalyzeRef, 0.04);
      animateText(textDesignRef, 0.20);
      animateText(textBuildRef, 0.40);
      animateText(textDeliverRef, 0.60);
    }

    const kineticWheel = kineticWheelRef.current;
    if (kineticWheel) {
      if (scroll > endElementTop + containerHeight * 1.2 + containerHeight * 0.2) {
        kineticWheel.style.display = 'none';
        kineticWheel.style.visibility = 'hidden';
      } else if (voidProgress > 0) {
        kineticWheel.style.display = 'block';
        kineticWheel.style.visibility = 'visible';

        if (isMobile) {
          let figOpacity = 0;
          if (voidProgress <= 0.25) {
            figOpacity = 0.5 * (voidProgress / 0.25);
          } else if (voidProgress <= 0.5) {
            figOpacity = 0.5 + 0.5 * ((voidProgress - 0.25) / 0.25);
          } else {
            figOpacity = 1;
          }

          kineticWheel.style.opacity = figOpacity.toFixed(3);
          kineticWheel.style.transform = `translate3d(0, 0, 0)`;

          if (figureGroupRef.current) {
            if (voidProgress >= 0.8) {
              const textFade = 1 - ((voidProgress - 0.8) / 0.2);
              figureGroupRef.current.style.opacity = Math.max(0, textFade).toFixed(3);
            } else {
              figureGroupRef.current.style.opacity = '1';
            }
          }
        } else {
          kineticWheel.style.opacity = Math.min(voidProgress * 4, 1).toFixed(3);
          const targetRotation = 180 * (1 - voidProgress);
          kineticWheel.style.transformOrigin = '50% 100%';
          kineticWheel.style.transform = `rotate(${targetRotation}deg)`;
        }
      } else {
        kineticWheel.style.display = 'block';
        kineticWheel.style.opacity = '0';
        kineticWheel.style.visibility = 'hidden';
        if (isMobile) {
          kineticWheel.style.transform = `translate3d(0, 0, 0)`;
          if (figureGroupRef.current) figureGroupRef.current.style.opacity = '1';
        } else {
          kineticWheel.style.transform = `rotate(180deg)`;
        }
      }
    }
  });

  const cachePositions = useCallback(() => {
    setReady(false);
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    cards.forEach(card => card.style.transform = '');
    if (voidContainerRef.current) {
      voidContainerRef.current.style.transform = '';
      voidContainerRef.current.style.transformOrigin = '';
    }
    if (kineticWheelRef.current) kineticWheelRef.current.style.transform = '';

    if (threadPathRef.current && isMobile) {
      try {
        const len = threadPathRef.current.getTotalLength();
        if (len > 0) {
          threadLenRef.current = len;
          threadPathRef.current.style.strokeDasharray = `${len}`;
          threadPathRef.current.style.strokeDashoffset = `${len}`;
        }
      } catch (e) { }
    }

    const scrollY = window.scrollY;
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + scrollY);
    const endElement = document.querySelector('.scroll-stack-end') as HTMLElement;
    if (endElement) endOffsetRef.current = endElement.getBoundingClientRect().top + scrollY;
    if (stackInnerRef.current) stackInnerTopRef.current = stackInnerRef.current.getBoundingClientRect().top + scrollY;
    setReady(true);
  }, [isMobile]);

  const calculateAndRender = useCallback(() => {
    cachePositions();
  }, [cachePositions]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${BASE_CONFIG.itemDistance}px`;
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });
    const resizeObserver = new ResizeObserver(() => calculateAndRender());
    cards.forEach((card) => resizeObserver.observe(card));
    calculateAndRender();
    const initTimer = setTimeout(calculateAndRender, 100);
    window.addEventListener('resize', calculateAndRender, { passive: true });
    return () => {
      clearTimeout(initTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateAndRender);
    };
  }, [calculateAndRender]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative">
      <div className="w-full h-[25vh] md:h-[25vh] lg:h-[70vh] border-b border-white/20 overflow-hidden flex items-center relative z-10 bg-black">
        <div className="marquee-selected-works">
          <div className="marquee-selected-works__track">
            {[0, 1, 2, 3].map((blockIndex) => (
              <div key={blockIndex} className="marquee-selected-works__segment" aria-hidden={blockIndex > 0 ? "true" : undefined}>
                <span className="marquee-selected-works__text">Selected Works</span>
                <span className="marquee-selected-works__dash">—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={stackInnerRef} className="scroll-stack-inner px-6 md:px-12 lg:px-16" style={{ transformStyle: 'preserve-3d' }}>
        <div ref={voidContainerRef} className="void-container relative w-full flex flex-col items-center justify-center" style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}>
          {projects.map((project, index) => (
            <ScrollStackCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className={`scroll-stack-end pointer-events-none h-[120vh]`} />
      </div>

      <div ref={kineticWheelRef} className="kinetic-wheel pointer-events-none" style={{
        position: 'fixed',
        top: isMobile ? '50%' : 'auto',
        bottom: isMobile ? 'auto' : '-18vh',
        left: '0',
        width: '100vw',
        height: isMobile ? '100vw' : 'auto',
        marginTop: isMobile ? 'calc(-50vw)' : '0',
        zIndex: 0,
        visibility: 'hidden',
        opacity: 0,
        willChange: 'transform, opacity',
      }}>
        {isMobile ? (
          <svg viewBox="0 0 1500 2000" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="15%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="85%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Sweeping S-Curve (Winding Ribbon) */}
            <path
              ref={threadPathRef}
              d="M 750,0 L 750,250 C 750,550 250,500 250,800 C 250,1100 1250,1050 1250,1350 C 1250,1650 750,1600 750,1900 L 750,3000"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g ref={figureGroupRef}>
              <text ref={textAnalyzeRef} x="750" y="150" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">ANALYZE</text>
              <circle cx="750" cy="250" r="15" fill="#ffffff" filter="url(#glow)" />

              <text ref={textDesignRef} x="250" y="700" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">DESIGN</text>
              <circle cx="250" cy="800" r="15" fill="#ffffff" filter="url(#glow)" />

              <text ref={textBuildRef} x="1250" y="1250" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">BUILD</text>
              <circle cx="1250" cy="1350" r="15" fill="#ffffff" filter="url(#glow)" />

              <text ref={textDeliverRef} x="750" y="1800" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">DELIVER</text>
              <circle cx="750" cy="1900" r="20" fill="#ffffff" filter="url(#glow)" />
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 3000 1500" className="w-full h-auto" style={{ overflow: 'visible' }}>
            <path id="arc-path" d="M 400,1500 A 1100,1100 0 0,1 2600,1500" fill="none" stroke="none" />
            {[
              { text: 'ANALYZE', offset: '15%' }, { text: '●', offset: '27%' },
              { text: 'DESIGN', offset: '38%' }, { text: '●', offset: '50%' },
              { text: 'BUILD', offset: '62%' }, { text: '●', offset: '73%' },
              { text: 'DELIVER', offset: '85%' },
            ].map((item, i) => (
              <text key={i} fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: item.text === '●' ? '50px' : '100px', textTransform: 'uppercase' }} dy={item.text === '●' ? '-18' : '0'}>
                <textPath href="#arc-path" startOffset={item.offset} textAnchor="middle">{item.text}</textPath>
              </text>
            ))}
          </svg>
        )}
      </div>
    </section>
  );
};

export default SelectedWorks;
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  // Safe window height check for SSR
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh(); // Set on mount
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const { scrollY } = useScroll();

  // Scroll mapping: 
  // As the user scrolls from 0 to 100vh (the Hero height), 
  // the text precisely fades in and slides up. We stagger the start/end points.

  // Section 1: Context Label
  const y1 = useTransform(scrollY, [0, vh * 0.4], [80, 0]);
  const opacity1 = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  // Section 2: Education
  const y2 = useTransform(scrollY, [vh * 0.1, vh * 0.5], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.1, vh * 0.4], [0, 1]);

  // Section 3: Experience
  const y3 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  // Section 4: Focus
  const y4 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 pt-24 md:pt-32 lg:pt-36 overflow-hidden flex items-start md:items-center justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-6 md:gap-x-12 w-full max-w-[1600px] mx-auto h-full overflow-y-auto md:overflow-visible pb-24 md:pb-0 scrollbar-hide">

        {/* Left Column: Context Label */}
        <motion.div
          className="md:col-span-3 lg:col-span-3 pt-2"
          style={{ y: y1, opacity: opacity1 }}
        >
          <h2 className="font-sans text-[10px] md:text-sm font-bold uppercase tracking-widest text-black/60 md:text-black">
            Background & Data
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="md:col-span-9 lg:col-span-9 flex flex-col gap-5 md:gap-12">

          {/* 01. EDUCATION */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-[10px] md:text-sm font-bold uppercase tracking-wide opacity-100 mb-0 md:mb-1">
              01. Education
            </h3>
            <div className="flex flex-col gap-3 md:gap-6">
              <div className="flex flex-col">
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  NED University of Engineering & Technology
                </p>
                <p className="font-sans text-sm md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Bachelors in Computer Science (2024–2028)
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Intermediate (Pre-Engineering)
                </p>
                <p className="font-sans text-sm md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Completed from Karachi (2024)
                </p>
              </div>
            </div>
          </motion.div>

          {/* 02. EXPERIENCE */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-[10px] md:text-sm font-bold uppercase tracking-wide opacity-100 mb-0 md:mb-1">
              02. Experience
            </h3>

            <div className="flex flex-col gap-4 md:gap-6">
              {/* Job 1 */}
              <div>
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  ComplyEncrypt – NIC Karachi, Pakistan
                </p>
                <p className="font-sans text-sm md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Full Stack Developer Intern (Feb 2026 – May 2026)
                </p>
                <p className="font-sans text-xs md:text-lg lg:text-xl font-normal text-black/60 leading-tight tracking-tight mt-1 md:mt-2">
                  Developed a scalable compliance management platform that helps organizations implement compliance frameworks and streamline regulatory requirements. Built automated workflows to simplify compliance processes.
                </p>
              </div>

              {/* Job 2 */}
              <div>
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  NCCS (National Center for Cyber Security) – NEDUET, Karachi
                </p>
                <p className="font-sans text-sm md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Full Stack Development Intern (Aug 2025 – Sept 2025)
                </p>
                <p className="font-sans text-xs md:text-lg lg:text-xl font-normal text-black/60 leading-tight tracking-tight mt-1 md:mt-2">
                  Worked as a Full Stack Developer Intern contributing to client web development projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. FOCUS */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-[10px] md:text-sm font-bold uppercase tracking-wide opacity-100 mb-0 md:mb-1">
              03. Focus
            </h3>
            <ul className="flex flex-col">
              <li className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Software Engineering Architecture
              </li>
              <li className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Artificial Intelligence & Process Automation
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
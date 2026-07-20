import { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import SkillsPhilosophy from "./SkillsPhilosophy";

function ease(t: number): number {
    const p1x = 0.76, p1y = 0, p2x = 0.24, p2y = 1;
    const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
    const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
    let s = t;
    for (let i = 0; i < 8; i++) {
        const ex = ((ax * s + bx) * s + cx) * s - t;
        const dx = (3 * ax * s + 2 * bx) * s + cx;
        if (Math.abs(dx) < 1e-7) break;
        s -= ex / dx;
    }
    return ((ay * s + by) * s + cy) * s;
}

const VectorBridge = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bridgeLineRef = useRef<SVGPathElement>(null);
    const portalRectRef = useRef<HTMLDivElement>(null);
    const portalInnerRef = useRef<HTMLDivElement>(null);
    const svgContainerRef = useRef<HTMLDivElement>(null);

    const sectionTopRef = useRef(0);
    const totalLineLenRef = useRef(0);
    const rafRef = useRef<number>(0);
    const [ready, setReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const RECT_W = 340;
    const RECT_H = 220;

    const measure = useCallback(() => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);

        if (sectionRef.current) {
            sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        }

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let newPath = '';
        if (!mobile) {
            const scX = vw / 3000;
            const AX = 1500 + 1100 * Math.cos(196 * Math.PI / 180);
            const startX = AX * scX;
            const endX = vw / 2 - RECT_W / 2;
            const endY = vh / 2;
            const R_px = 1100 * scX;
            newPath = `M ${startX},0 A ${R_px},${R_px} 0 0,0 ${endX},${endY}`;
        } else {
            const startX = vw / 2;
            const startY = -10; // Slightly above to eliminate micro-gaps
            const endX = vw / 2;
            const endY = vh / 2 - RECT_H / 2;
            newPath = `M ${startX},${startY} L ${endX},${endY}`;
        }

        if (bridgeLineRef.current) {
            bridgeLineRef.current.setAttribute('d', newPath);
            try {
                const len = bridgeLineRef.current.getTotalLength();
                if (len > 0) totalLineLenRef.current = len;
            } catch (_) { }
        }

        if (portalInnerRef.current && sectionRef.current) {
            const innerHeightPx = portalInnerRef.current.scrollHeight;
            const totalRequiredHeight = (vh * 1.2) + innerHeightPx;
            sectionRef.current.style.height = `${totalRequiredHeight}px`;
            sectionRef.current.style.minHeight = `${totalRequiredHeight}px`;
        }
        setReady(true);
    }, []);

    useEffect(() => {
        requestAnimationFrame(() => { measure(); setTimeout(measure, 150); });
        window.addEventListener('resize', measure, { passive: true });
        return () => {
            window.removeEventListener('resize', measure);
            cancelAnimationFrame(rafRef.current);
        };
    }, [measure]);

    useLenis(({ scroll }) => {
        if (!ready) return;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const line = bridgeLineRef.current;
            const box = portalRectRef.current;
            const inner = portalInnerRef.current;
            const svgCont = svgContainerRef.current;
            const totalLen = totalLineLenRef.current;

            if (!box || !inner) return;

            const vh = window.innerHeight;
            const vw = window.innerWidth;
            const localScroll = scroll - sectionTopRef.current;

            // Handle Bridge Line
            if (line && svgCont && totalLen > 0) {
                const drawProgress = Math.min(Math.max((localScroll + vh) / vh, 0), 1);
                line.style.strokeDasharray = `${totalLen}`;
                line.style.strokeDashoffset = `${(totalLen - (drawProgress * totalLen)).toFixed(1)}`;
            }

            if (localScroll < -vh * 0.35) {
                box.style.visibility = 'hidden';
                box.style.opacity = '0';
            } else {
                box.style.visibility = 'visible';
                box.style.opacity = '1';
            }

            if (localScroll <= 0) {
                box.style.position = 'absolute';
                box.style.top = '50vh';
                box.style.transform = `translate3d(0, 0, 0) scale(1)`;
                if (svgCont) {
                    svgCont.style.position = 'absolute';
                    svgCont.style.top = '0';
                }
                inner.style.transform = `scale(1)`;
                box.style.overflow = 'hidden';
            } else {
                const expansionRunway = vh * 1.2;
                const expansionProgress = Math.min(Math.max(localScroll / expansionRunway, 0), 1);

                if (expansionProgress < 1) {
                    box.style.position = 'fixed';
                    box.style.top = '50%';
                    if (svgCont) {
                        svgCont.style.position = 'fixed';
                        svgCont.style.top = '0';
                    }
                    box.style.overflow = 'hidden';
                } else {
                    box.style.position = 'absolute';
                    box.style.top = `${expansionRunway + vh / 2}px`;
                    if (svgCont) {
                        svgCont.style.position = 'absolute';
                        svgCont.style.top = `${expansionRunway}px`;
                    }
                    box.style.overflow = 'visible';
                }

                const e = ease(expansionProgress);
                const scaleX = 1 + e * (vw / RECT_W - 1);
                const scaleY = 1 + e * (vh / RECT_H - 1);

                box.style.transform = `translate3d(0, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
                inner.style.transform = `scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;

                const bOpacity = Math.max(0, 1 - e / 0.5);
                box.style.borderWidth = bOpacity < 0.01 ? '0px' : '2px';
                box.style.borderColor = `rgba(0,0,0,${bOpacity.toFixed(3)})`;
            }
        });
    });

    return (
        <section ref={sectionRef} className="relative bg-white text-black" style={{ minHeight: '320vh' }}>
            <div id="philosophy" style={{ position: 'absolute', top: '120vh', left: 0, height: '1px', width: '1px', pointerEvents: 'none' }} />
            <div
                ref={svgContainerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 10,
                    willChange: 'transform, top, position'
                }}
            >
                <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                    <path
                        ref={bridgeLineRef}
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        style={{
                            strokeWidth: isMobile ? '0.8vw' : '10px', // Mathematically matches SelectedWorks
                            strokeDasharray: '99999',
                            strokeDashoffset: '99999'
                        }}
                    />
                </svg>
            </div>

            <div ref={portalRectRef} style={{
                position: 'absolute',
                top: '50vh',
                left: '50%',
                width: `${RECT_W}px`,
                height: `${RECT_H}px`,
                marginLeft: `-${RECT_W / 2}px`,
                marginTop: `-${RECT_H / 2}px`,
                background: 'white',
                border: '2px solid black',
                visibility: 'hidden',
                opacity: 0,
                zIndex: 50,
                overflow: 'hidden',
                transformOrigin: 'center center'
            }}>
                <div ref={portalInnerRef} style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '100vh',
                    marginLeft: '-50vw',
                    marginTop: '-50vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transformOrigin: 'center center'
                }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <SkillsPhilosophy />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VectorBridge;
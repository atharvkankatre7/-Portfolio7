import { useEffect, useRef, useState } from 'react';

function hexToRgba(hex, a) {
    const v = hex.replace('#', '');
    const r = parseInt(v.substring(0, 2), 16);
    const g = parseInt(v.substring(2, 4), 16);
    const b = parseInt(v.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function ParticlesCanvas() {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const lastTimeRef = useRef(0);
    const particlesRef = useRef([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isMobile = window.innerWidth <= 980;
        const DPR = Math.min(2, window.devicePixelRatio || 1);

        const settings = {
            N: isMobile ? 35 : 80,
            SPEED: 0.05,
            connectionDistance: isMobile ? 110 : 150,
            particleOpacity: isMobile ? 0.5 : 0.8,
            lineOpacity: isMobile ? 0.3 : 0.5,
            lineWidth: isMobile ? 0.35 : 0.5,
            particleRadius: isMobile ? 1.3 : 1.4,
        };

        // Initialize particles
        particlesRef.current = Array.from({ length: settings.N }, () => ({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * settings.SPEED,
            vy: (Math.random() - 0.5) * settings.SPEED,
        }));

        let w = 0, h = 0;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.floor(w * DPR);
            canvas.height = Math.floor(h * DPR);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
        };

        resize();
        window.addEventListener('resize', resize);

        lastTimeRef.current = performance.now();

        const draw = (currentTime) => {
            const deltaTime = (currentTime - lastTimeRef.current) / 1000;
            lastTimeRef.current = currentTime;
            const dt = Math.min(deltaTime, 0.1);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(DPR, DPR);

            const neon = getComputedStyle(document.documentElement).getPropertyValue('--neon').trim() || '#00e5ff';
            const color = hexToRgba(neon, settings.lineOpacity);
            const maxDist = settings.connectionDistance * settings.connectionDistance;

            const particles = particlesRef.current;

            // Update particles
            for (const p of particles) {
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                if (p.x < 0 || p.x > 1) p.vx *= -1;
                if (p.y < 0 || p.y > 1) p.vy *= -1;
            }

            // Draw particles and connections
            for (let i = 0; i < settings.N; i++) {
                const a = particles[i];
                const ax = a.x * w, ay = a.y * h;

                // Draw particle
                ctx.fillStyle = hexToRgba(neon, settings.particleOpacity);
                ctx.beginPath();
                ctx.arc(ax, ay, settings.particleRadius, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections
                if (!isMobile || i % 2 === 0) {
                    for (let j = i + 1; j < settings.N; j++) {
                        const b = particles[j];
                        const bx = b.x * w, by = b.y * h;
                        const dx = ax - bx, dy = ay - by;
                        const d2 = dx * dx + dy * dy;

                        if (d2 < maxDist) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = settings.lineWidth;
                            ctx.beginPath();
                            ctx.moveTo(ax, ay);
                            ctx.lineTo(bx, by);
                            ctx.stroke();
                        }
                    }
                }
            }

            ctx.restore();
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        const handleVisibility = () => {
            if (document.hidden) {
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                }
            } else {
                lastTimeRef.current = performance.now();
                rafRef.current = requestAnimationFrame(draw);
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', handleVisibility);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isClient]);

    if (!isClient) return null;

    return (
        <canvas
            ref={canvasRef}
            id="particles"
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
            }}
        />
    );
}

import { useEffect, useRef, useState } from 'react';

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 0, g: 229, b: 255 };
}

class WaterRippleEffect {
    constructor(x, y, isMobile = false) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = isMobile ? 80 : 120;
        this.speed = isMobile ? 8 : 6;
        this.opacity = 1;
        this.thickness = 2;
        this.waves = [
            { offset: 0, alpha: 0.4 },
            { offset: 8, alpha: 0.25 },
            { offset: 16, alpha: 0.15 },
        ];
    }

    update() {
        this.radius += this.speed;
        this.opacity = 1 - this.radius / this.maxRadius;
        this.thickness = Math.max(1, 3 - (this.radius / this.maxRadius) * 2);
        return this.radius < this.maxRadius;
    }

    draw(ctx) {
        const neonColor = getComputedStyle(document.documentElement).getPropertyValue('--neon').trim() || '#00e5ff';
        const rgb = hexToRgb(neonColor);

        this.waves.forEach((wave) => {
            const waveRadius = this.radius - wave.offset;
            if (waveRadius > 0) {
                const alpha = this.opacity * wave.alpha;

                // Subtle outer glow
                ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.1})`;
                ctx.lineWidth = this.thickness + 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, waveRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Main ring
                ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.6})`;
                ctx.lineWidth = this.thickness;
                ctx.beginPath();
                ctx.arc(this.x, this.y, waveRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Inner highlight
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, waveRadius, 0, Math.PI * 2);
                ctx.stroke();
            }
        });
    }
}

export default function WaterRipple() {
    const canvasRef = useRef(null);
    const ripplesRef = useRef([]);
    const animatingRef = useRef(false);
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

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        const animate = () => {
            if (ripplesRef.current.length === 0) {
                animatingRef.current = false;
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
                const ripple = ripplesRef.current[i];
                const isActive = ripple.update();
                ripple.draw(ctx);

                if (!isActive) {
                    ripplesRef.current.splice(i, 1);
                }
            }

            if (ripplesRef.current.length > 0) {
                requestAnimationFrame(animate);
            } else {
                animatingRef.current = false;
            }
        };

        const handleClick = (e) => {
            // On mobile, reduce ripple frequency
            if (isMobile && Math.random() > 0.7) return;

            const ripple = new WaterRippleEffect(e.clientX, e.clientY, isMobile);
            ripplesRef.current.push(ripple);

            if (!animatingRef.current) {
                animatingRef.current = true;
                animate();
            }
        };

        document.addEventListener('click', handleClick, { passive: true });

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('click', handleClick);
        };
    }, [isClient]);

    if (!isClient) return null;

    return (
        <canvas
            ref={canvasRef}
            id="ripple-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'screen',
            }}
        />
    );
}

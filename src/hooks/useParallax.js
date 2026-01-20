import { useEffect, useRef, useCallback } from 'react';

export function useParallax() {
    const rafId = useRef(null);
    const lastMouseMove = useRef(0);
    const throttleDelay = 16;

    const handleMouseMove = useCallback((e) => {
        const now = performance.now();
        if (now - lastMouseMove.current < throttleDelay) return;
        lastMouseMove.current = now;

        if (rafId.current) return;

        rafId.current = requestAnimationFrame(() => {
            const { clientX, clientY } = e;
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const x = ((clientX - rect.left) / rect.width) * 100;
                    const y = ((clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mouse-x', x + '%');
                    card.style.setProperty('--mouse-y', y + '%');
                }
            });

            rafId.current = null;
        });
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [handleMouseMove]);
}

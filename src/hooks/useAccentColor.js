import { useState, useEffect, useCallback } from 'react';

export function useAccentColor() {
    const [accent, setAccent] = useState(() => {
        return localStorage.getItem('accent') || '#00e5ff';
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--neon', accent);
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', accent);
        localStorage.setItem('accent', accent);
    }, [accent]);

    const handleAccentChange = useCallback((e) => {
        setAccent(e.target.value);
    }, []);

    return { accent, setAccent, handleAccentChange };
}

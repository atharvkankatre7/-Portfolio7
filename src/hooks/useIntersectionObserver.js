import { useState, useEffect, useRef, useCallback } from 'react';

export function useIntersectionObserver(options = {}) {
    const [entries, setEntries] = useState([]);
    const [elements, setElements] = useState([]);
    const observer = useRef(null);

    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        ...options
    };

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((observedEntries) => {
            setEntries(observedEntries);
        }, defaultOptions);

        elements.forEach(element => {
            if (element) observer.current.observe(element);
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [elements, defaultOptions.rootMargin, defaultOptions.threshold]);

    const observe = useCallback((element) => {
        setElements(prev => [...prev, element]);
    }, []);

    const unobserve = useCallback((element) => {
        if (observer.current && element) {
            observer.current.unobserve(element);
        }
        setElements(prev => prev.filter(el => el !== element));
    }, []);

    return { entries, observe, unobserve };
}

export function useScrollReveal(threshold = 0.1) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: '0px 0px -100px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return { ref, isVisible };
}

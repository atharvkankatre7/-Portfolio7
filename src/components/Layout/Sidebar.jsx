import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'ai-workflow', label: 'AI Workflow' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
];

export default function Sidebar({ isOpen }) {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
        );

        const sections = document.querySelectorAll('main .section');
        sections.forEach((sec) => observer.observe(sec));

        return () => {
            sections.forEach((sec) => observer.unobserve(sec));
        };
    }, []);

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const sidebarVariants = {
        hidden: { x: -220, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
        },
    };

    return (
        <motion.nav
            id="primaryNav"
            className={`sidebar ${isOpen ? 'open' : ''}`}
            aria-label="Primary"
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
        >
            <ul>
                {navItems.map((item, index) => (
                    <motion.li
                        key={item.id}
                        variants={itemVariants}
                        transition={{ delay: index * 0.05 }}
                    >
                        <motion.a
                            href={`#${item.id}`}
                            className={activeSection === item.id ? 'active' : ''}
                            onClick={(e) => handleClick(e, item.id)}
                            whileHover={{
                                x: 8,
                                color: 'var(--neon)',
                                backgroundColor: 'color-mix(in oklab, var(--neon) 10%, transparent)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            style={{ position: 'relative' }}
                        >
                            {item.label}

                            {/* Active indicator dot with animation */}
                            <AnimatePresence>
                                {activeSection === item.id && (
                                    <motion.span
                                        className="active-dot"
                                        style={{
                                            position: 'absolute',
                                            right: '8px',
                                            top: '50%',
                                            width: '8px',
                                            height: '8px',
                                            background: 'var(--neon)',
                                            borderRadius: '50%',
                                            boxShadow: '0 0 12px var(--neon), 0 0 24px var(--neon)',
                                        }}
                                        initial={{ scale: 0, opacity: 0, y: '-50%' }}
                                        animate={{ scale: 1, opacity: 1, y: '-50%' }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.a>
                    </motion.li>
                ))}
            </ul>
        </motion.nav>
    );
}

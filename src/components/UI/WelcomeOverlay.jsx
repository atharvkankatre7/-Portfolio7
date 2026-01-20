import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeOverlay() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const hasSeenWelcome = sessionStorage.getItem('welcomeShown');

        if (hasSeenWelcome) {
            setVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem('welcomeShown', 'true');
        }, 4500);

        return () => clearTimeout(timer);
    }, []);

    const overlayVariants = {
        visible: { opacity: 1 },
        exit: {
            opacity: 0,
            scale: 1.2,
            filter: 'blur(20px)',
            transition: { duration: 0.8, ease: 'easeInOut' },
        },
    };

    const sphereVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const wordVariants = {
        initial: { opacity: 0, y: 30, rotateX: -90 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
                delay: i * 0.15 + 0.3,
            },
        }),
    };

    const subtitleVariants = {
        initial: { opacity: 0, y: 20 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
                delay: i * 0.1 + 1.2,
            },
        }),
    };

    const titles = ['Welcome', 'To', 'My', 'Portfolio'];
    const subtitles = [
        { text: 'Built', className: '' },
        { text: 'On', className: '' },
        { text: 'Liquid', className: 'liquid-text' },
        { text: 'Glass', className: 'glass-text' },
        { text: 'Theme', className: '' },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    id="welcomeOverlay"
                    className="welcome-overlay"
                    variants={overlayVariants}
                    initial="visible"
                    exit="exit"
                >
                    <div className="welcome-content">
                        <motion.div
                            className="liquid-glass-sphere"
                            variants={sphereVariants}
                            initial="initial"
                            animate="animate"
                            style={{
                                width: 250,
                                height: 250,
                                margin: '100 auto 3rem',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(var(--neon-rgb, 0, 229, 255), 0.4), rgba(var(--neon-rgb, 0, 229, 255), 0.2))',
                            }}
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, color-mix(in oklab, var(--neon) 40%, transparent), color-mix(in oklab, var(--neon) 20%, transparent))',
                                }}
                                animate={{
                                    scale: [1, 1.05, 1],
                                    boxShadow: [
                                        '0 0 100px color-mix(in oklab, var(--neon) 50%, transparent)',
                                        '0 0 140px color-mix(in oklab, var(--neon) 70%, transparent)',
                                        '0 0 100px color-mix(in oklab, var(--neon) 50%, transparent)',
                                    ],
                                }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            />
                        </motion.div>

                        <h1 className="welcome-title">
                            {titles.map((word, i) => (
                                <motion.span
                                    key={word}
                                    className="welcome-word"
                                    variants={wordVariants}
                                    initial="initial"
                                    animate="animate"
                                    custom={i}
                                    style={i === 3 ? { color: 'var(--neon)', textShadow: '0 0 30px var(--neon)' } : {}}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        <p className="welcome-subtitle">
                            {subtitles.map((item, i) => (
                                <motion.span
                                    key={item.text}
                                    className={`subtitle-word ${item.className}`}
                                    variants={subtitleVariants}
                                    initial="initial"
                                    animate="animate"
                                    custom={i}
                                >
                                    {item.text}
                                </motion.span>
                            ))}
                        </p>

                        <motion.div
                            className="liquid-waves"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                        >
                            {[1, 2, 3].map((n) => (
                                <motion.div
                                    key={n}
                                    className={`wave wave-${n}`}
                                    animate={{
                                        y: [0, -20, 0],
                                        scaleY: [1, 0.8, 1],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        delay: n * 0.5,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useAccentColor } from '../../hooks/useAccentColor';

export default function Header() {
    const { toggleTheme, isDark } = useTheme();
    const { accent, handleAccentChange } = useAccentColor();

    return (
        <motion.header
            className="topbar"
            role="banner"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.2,
            }}
        >
            <motion.a
                href="#home"
                className="brand"
                aria-label="Go to home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.div
                    className="brand-logo"
                    aria-hidden="true"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                >
                    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <g className="bracket-left">
                            <path
                                d="M 30 20 L 20 20 L 20 60 L 30 60"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g className="bracket-right">
                            <path
                                d="M 50 20 L 60 20 L 60 60 L 50 60"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <motion.circle
                            className="code-dot"
                            cx="40"
                            cy="40"
                            r="3"
                            fill="currentColor"
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </svg>
                </motion.div>
                <span className="brand-text">
                    Atharv<span className="text-neon">K</span>
                    <motion.span
                        className="blink"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        _
                    </motion.span>
                </span>
            </motion.a>

            <div className="controls">
                <motion.div
                    className="control-group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.label
                        className="accent-picker"
                        title="Accent color"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <input
                            type="color"
                            id="accentPicker"
                            value={accent}
                            onChange={handleAccentChange}
                            aria-label="Pick accent color"
                        />
                        <div className="picker-button">
                            <motion.svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                            >
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 2 A10 10 0 0 1 22 12 L12 12 Z" fill="currentColor" opacity="0.3" />
                                <circle cx="12" cy="12" r="4" fill="currentColor" />
                            </motion.svg>
                            <span className="picker-label">Color</span>
                        </div>
                    </motion.label>

                    <motion.button
                        id="themeToggle"
                        className="theme-toggle"
                        aria-pressed={isDark}
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95, rotate: 180 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        <div className="theme-icon-wrapper">
                            <motion.svg
                                className="theme-icon"
                                data-icon="sun"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                animate={isDark ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <circle cx="12" cy="12" r="5" fill="currentColor" />
                                <path
                                    d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </motion.svg>
                            <motion.svg
                                className="theme-icon"
                                data-icon="moon"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                animate={!isDark ? { rotate: 0, scale: 1 } : { rotate: 180, scale: 0 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                            </motion.svg>
                        </div>
                        <span className="theme-label">Theme</span>
                    </motion.button>
                </motion.div>


            </div>
        </motion.header>
    );
}

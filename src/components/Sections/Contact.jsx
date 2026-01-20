import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xwpwgkoy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormState({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        }

        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 3000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15,
            },
        },
    };

    const contactLinks = [
        {
            href: 'mailto:kankatreatharv@gmail.com',
            icon: 'gmail',
            label: 'Email',
            value: 'kankatreatharv@gmail.com',
            iconClass: 'gmail-icon',
        },
        {
            href: 'tel:+917776862111',
            icon: 'phone',
            label: 'Phone',
            value: '+91-7776862111',
            iconClass: '',
        },
        {
            href: 'https://github.com/atharvkankatre7',
            icon: 'github',
            label: 'GitHub',
            value: '@atharvkankatre7',
            iconClass: 'github-icon',
            external: true,
        },
        {
            href: 'https://www.linkedin.com/in/atharvkankatre',
            icon: 'linkedin',
            label: 'LinkedIn',
            value: 'Atharv Kankatre',
            iconClass: 'linkedin-icon',
            external: true,
        },
        {
            href: 'https://www.instagram.com/atharvkankatre_7?igsh=endzMWNuNGk3dWds',
            icon: 'instagram',
            label: 'Instagram',
            value: '@atharvkankatre_7',
            iconClass: 'instagram-icon',
            external: true,
        },
    ];

    const renderIcon = (type) => {
        switch (type) {
            case 'gmail':
                return <img src="/images/gmail-icon.png" alt="Gmail" />;
            case 'phone':
                return (
                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case 'github':
                return <img src="/images/github-icon.png" alt="GitHub" />;
            case 'linkedin':
                return (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                );
            case 'instagram':
                return (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <section id="contact" className="section" aria-label="Contact">
            <motion.div
                className="section-head"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
                <h2 className="h">Contact</h2>
                <p className="kicker">Let's build something amazing together</p>
            </motion.div>
            <motion.div
                className="grid two"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <motion.form
                    className="card form"
                    onSubmit={handleSubmit}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                >
                    <motion.label
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Name
                        <motion.input
                            name="name"
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            whileFocus={{ scale: 1.02 }}
                        />
                    </motion.label>
                    <motion.label
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Email
                        <motion.input
                            name="email"
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            whileFocus={{ scale: 1.02 }}
                        />
                    </motion.label>
                    <motion.label
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Message
                        <motion.textarea
                            name="message"
                            rows="4"
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            whileFocus={{ scale: 1.02 }}
                        />
                    </motion.label>
                    <button
                        className="btn primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span>Sending...</span>
                        ) : submitStatus === 'success' ? (
                            <span>✓ Message Sent!</span>
                        ) : submitStatus === 'error' ? (
                            <span>✕ Try Again</span>
                        ) : (
                            <span>Send Message</span>
                        )}
                    </button>
                </motion.form>
                <motion.article
                    className="card contact-card"
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                >
                    <h3>Find Me</h3>
                    <ul className="contact-links">
                        {contactLinks.map((link, index) => (
                            <motion.li
                                key={link.label}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <motion.a
                                    href={link.href}
                                    className="contact-item"
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                    whileHover={{ x: 8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.div
                                        className={`contact-icon ${link.iconClass}`}
                                        whileHover={{ scale: 1.15, rotate: -5 }}
                                    >
                                        {renderIcon(link.icon)}
                                    </motion.div>
                                    <div className="contact-info">
                                        <span className="contact-label">{link.label}</span>
                                        <span className="contact-value">{link.value}</span>
                                    </div>
                                </motion.a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.article>
            </motion.div>
        </section>
    );
}

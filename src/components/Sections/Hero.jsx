import { motion } from 'framer-motion';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';
import { useState } from 'react';

export default function Hero() {
    const typingText = useTypingAnimation();
    const [imageLoaded, setImageLoaded] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15,
                delay: 0.3,
            },
        },
    };

    return (
        <section id="home" className="section hero" aria-label="Hero">
            <motion.div
                className="hero-inner card glass"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="hero-left">
                    <motion.h1 className="title" variants={itemVariants}>
                        Hi, I'm{' '}
                        <span className="title-word title-word-gradient">Atharv</span>{' '}
                        <span className="title-word title-word-gradient">Kankatre</span>
                    </motion.h1>
                    <motion.div className="role-slider" variants={itemVariants}>
                        <span className="role-prefix">I'm a</span>
                        <span className="role-typing" id="roleTyping">
                            {typingText}
                        </span>
                    </motion.div>
                    <motion.p className="subtitle" variants={itemVariants}>
                        I build interactive, fast, and delightful web experiences specializing in
                        real-time collaborative applications.
                    </motion.p>
                    <motion.div className="cta-row" variants={itemVariants}>
                        <motion.a
                            className="btn primary"
                            href="#projects"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Projects
                        </motion.a>
                        <motion.a
                            className="btn outline"
                            href="#contact"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get In Touch
                        </motion.a>
                    </motion.div>
                    <motion.ul className="meta" variants={itemVariants}>
                        <li>Based in: Pune, India</li>
                        <li>Stack: MERN, React, Node.js, MongoDB</li>
                    </motion.ul>
                </div>
                <motion.div className="hero-right" variants={imageVariants}>
                    <div className="profile-image-container">
                        <img
                            src="/images/profile.jpg"
                            alt="Atharv Kankatre"
                            className={`profile-image ${imageLoaded ? 'loaded' : 'loading'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    <p className="caption">MERN Stack Developer • Full Stack Engineer</p>
                </motion.div>
            </motion.div>
        </section>
    );
}

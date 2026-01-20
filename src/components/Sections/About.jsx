import { motion } from 'framer-motion';

export default function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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

    const headerVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <section id="about" className="section" aria-label="About">
            <motion.div
                className="section-head"
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <h2 className="h">About</h2>
                <p className="kicker mission-statement">
                    My mission: Transform ideas into scalable, user-centric applications that solve
                    real problems and create meaningful impact.
                </p>
            </motion.div>
            <motion.div
                className="grid two"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <motion.article
                    className="card"
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className="card-header">
                        <h3>Who I Am</h3>
                    </div>
                    <p>
                        Motivated MERN Stack Developer pursuing M.C.A. with a passion for crafting
                        seamless digital experiences. I thrive on turning complex challenges into
                        elegant solutions, specializing in real-time collaborative tools that bring
                        teams together.
                    </p>
                    <p className="highlight-text">
                        From concept to deployment, I bring ideas to life with clean code and
                        innovative thinking.
                    </p>
                </motion.article>
                <motion.article
                    className="card"
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className="card-header">
                        <h3>What I Do</h3>
                    </div>
                    <ul className="list enhanced">
                        {[
                            'Full-stack web apps with MERN Stack',
                            'Real-time collaborative applications',
                            'RESTful APIs & database optimization',
                            'Modern UI/UX with React & Tailwind',
                            'AI-powered development workflows',
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </motion.article>
            </motion.div>
        </section>
    );
}

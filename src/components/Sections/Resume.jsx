import { motion } from 'framer-motion';

const resumeItems = [
    { label: 'M.C.A.', detail: 'Master of Computer Applications (Pursuing)' },
    { label: 'Full Stack Developer', detail: 'MERN Stack Specialist' },
    { label: 'Projects', detail: 'Real-time collaborative applications' },
    { label: 'Certifications', detail: 'Web Development, Cloud Computing' },
];

export default function Resume() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15,
            },
        },
    };

    return (
        <section id="resume" className="section" aria-label="Resume">
            <motion.div
                className="section-head"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
                <h2 className="h">Resume</h2>
                <p className="kicker">My professional journey</p>
            </motion.div>
            <motion.article
                className="card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                whileHover={{ y: -5 }}
            >
                <motion.ul
                    className="resume"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                    {resumeItems.map((item, index) => (
                        <motion.li
                            key={item.label}
                            variants={itemVariants}
                            whileHover={{ x: 10, color: 'var(--neon)' }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                borderBottom: index < resumeItems.length - 1 ? '1px solid var(--line)' : 'none',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div>
                                <strong style={{ display: 'block', color: 'var(--text)' }}>
                                    {item.label}
                                </strong>
                                <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                                    {item.detail}
                                </span>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
                <motion.div
                    style={{ marginTop: '24px', textAlign: 'center' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.a
                        className="btn primary"
                        href="/assets/resume.pdf"
                        download
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                        Download Full Resume
                    </motion.a>
                </motion.div>
            </motion.article>
        </section>
    );
}

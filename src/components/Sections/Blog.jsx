import { motion } from 'framer-motion';

const blogPosts = [
    {
        title: 'Building Real-Time Collaborative Apps',
        desc: 'Deep dive into WebSocket architecture and React state management',
        status: 'Coming Soon',
    },
    {
        title: 'AI-Powered Development Workflow',
        desc: 'How I use AI tools to 3x my productivity',
        status: 'Coming Soon',
    },
    {
        title: 'Mastering the MERN Stack',
        desc: 'Best practices and patterns for full-stack development',
        status: 'Coming Soon',
    },
];

export default function Blog() {
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
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15,
            },
        },
    };

    return (
        <section id="blog" className="section" aria-label="Blog">
            <motion.div
                className="section-head"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
                <h2 className="h">Blog</h2>
                <p className="kicker">Sharing knowledge & experiences</p>
            </motion.div>
            <motion.div
                className="grid three"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                {blogPosts.map((post, index) => (
                    <motion.article
                        key={post.title}
                        className="card post"
                        variants={cardVariants}
                        whileHover={{ y: -10, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Blur overlay for "Coming Soon" effect */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
                                backdropFilter: 'blur(2px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                zIndex: 10,
                                borderRadius: 'var(--radius)',
                            }}
                            whileHover={{ opacity: 1 }}
                        >
                            <motion.span
                                style={{
                                    background: 'var(--neon)',
                                    color: 'var(--bg)',
                                    padding: '8px 20px',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                }}
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {post.status}
                            </motion.span>
                        </motion.div>

                        <h3>{post.title}</h3>
                        <p style={{ color: 'var(--muted)' }}>{post.desc}</p>
                        <motion.span
                            className="btn text"
                            style={{ marginTop: '12px', display: 'inline-block' }}
                            whileHover={{ x: 5 }}
                        >
                            Read More →
                        </motion.span>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}

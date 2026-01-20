import { motion } from 'framer-motion';

const aiTools = [
    { name: 'GitHub Copilot', desc: 'AI pair programming' },
    { name: 'ChatGPT', desc: 'Problem solving & docs' },
    { name: 'Claude', desc: 'Code review & optimization' },
    { name: 'Cursor IDE', desc: 'AI-native development' },
    { name: 'Antigravity', desc: 'AI coding assistant' },
    { name: 'v0', desc: 'AI UI generation' },
    { name: 'Lovable', desc: 'AI app builder' },
];

const benefits = [
    { metric: '3x', label: 'Faster Development' },
    { metric: '50%', label: 'Less Debugging Time' },
    { metric: '10x', label: 'Documentation Speed' },
];

export default function AIWorkflow() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    return (
        <section id="ai-workflow" className="section" aria-label="AI Workflow">
            <motion.div
                className="section-head"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
                <h2 className="h">AI-Powered Workflow</h2>
                <p className="kicker">Leveraging AI tools for enhanced productivity</p>
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
                >
                    <div className="card-header">
                        <h3>AI Development Tools</h3>
                    </div>
                    <div className="ai-tools-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginTop: '16px'
                    }}>
                        {aiTools.map((tool, index) => (
                            <motion.div
                                key={tool.name}
                                className="ai-tool-item"
                                style={{
                                    padding: '12px',
                                    borderRadius: '10px',
                                    background: 'color-mix(in oklab, var(--surface) 50%, transparent)',
                                    border: '1px solid var(--line)',
                                    textAlign: 'center',
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: 'var(--neon)',
                                }}
                            >
                                <strong style={{ display: 'block' }}>{tool.name}</strong>
                                <small style={{ color: 'var(--muted)' }}>{tool.desc}</small>
                            </motion.div>
                        ))}
                    </div>
                </motion.article>

                <motion.article
                    className="card"
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                >
                    <div className="card-header">
                        <h3>Productivity Gains</h3>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: '20px',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.label}
                                style={{ textAlign: 'center' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <motion.span
                                    style={{
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        color: 'var(--neon)',
                                        display: 'block',
                                        textShadow: '0 0 20px var(--neon)',
                                    }}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 + index * 0.1 }}
                                >
                                    {benefit.metric}
                                </motion.span>
                                <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                                    {benefit.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                    <motion.p
                        style={{ marginTop: '20px', color: 'var(--muted)', textAlign: 'center' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        AI tools amplify my capabilities, allowing me to focus on creative problem-solving
                        while automating repetitive tasks.
                    </motion.p>
                </motion.article>
            </motion.div>
        </section>
    );
}

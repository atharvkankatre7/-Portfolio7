import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const projects = [
    {
        id: 'contentsync',
        title: 'ContentSync',
        tagline: 'Synchronized video watching app for couples & friends',
        liveUrl: null,
        githubUrl: 'https://github.com/atharvkankatre7',
        status: 'Live',
        videoUrl: 'https://res.cloudinary.com/ddy3ofzg5/video/upload/v1768383661/video_20260114_150641_edit_b7iko5.mp4',
        apkUrl: 'https://drive.google.com/uc?export=download&id=18gNjE5U5kwMXKaG6j1uMrCyn8jrqQt4n',
        description: 'A lightweight mobile app that lets two users watch the same local video file in perfect sync. Enables couples or friends to watch videos together remotely while maintaining perfect synchronization.',
        features: [
            'Local File Sync - Watch videos already on your device',
            'Perfect Synchronization - Advanced sync algorithm with < 100ms accuracy',
            'Chat & Reactions - Interactive overlay during playback',
            'Privacy-First - No video uploads, only metadata exchange',
            'Android Native - Built with Kotlin & LibVLC',
        ],
        techStack: ['Kotlin', 'LibVLC', 'Socket.IO', 'Node.js', 'PostgreSQL', 'Firebase', 'Jetpack Compose'],
        highlights: [
            'RTT compensation for network latency',
            'Smart correction: hard seek vs gentle playback rate nudge',
            'WebSocket signaling server for event relay',
            'SHA-256 file validation',
        ],
    },
    {
        id: 'realcode',
        title: 'Real-Time Code Editor',
        tagline: 'Collaborative code editor enabling multiple users to code together',
        liveUrl: 'https://real-code-six.vercel.app/',
        githubUrl: 'https://github.com/atharvkankatre7',
        status: 'Live',
        description: 'A full-featured collaborative code editor enabling multiple users to code together in real-time. Features live cursor tracking, syntax highlighting with Monaco Editor, role-based permissions, and secure Firebase authentication.',
        features: [
            'Real-time collaborative editing with live cursor tracking',
            'Syntax highlighting for 50+ programming languages',
            'Role-based permissions (Admin, Editor, Viewer)',
            'Secure authentication & session management',
            'WebSocket-based instant synchronization',
        ],
        techStack: ['React', 'Socket.IO', 'Monaco Editor', 'Firebase', 'Tailwind CSS', 'Node.js'],
        highlights: [
            'Multi-user real-time sync',
            '<100ms latency',
            'Secure Firebase Auth',
        ],
        image: '/images/project-realcode.png',
    },
];

const otherProjects = [
    {
        title: 'Data Analyst Portfolio',
        desc: 'Designed and developed a comprehensive portfolio website for a data analyst friend.',
        tech: ['Next.js', 'Tailwind', 'Framer Motion'],
        link: 'https://rportfolio-kappa.vercel.app/',
        type: 'Client Work'
    },
    {
        title: 'Secure Notes',
        desc: 'A secure note-taking application inspired by Google Keep, built during internship.',
        tech: ['MERN Stack', 'Auth'],
        link: 'https://secure-notes-ten.vercel.app/',
        type: 'Team Project'
    },
    {
        title: 'Text Mapper',
        desc: 'Utility tool to find and highlight matched phrases between original and AI-generated text.',
        tech: ['React', 'Text Analysis'],
        link: 'https://text-mapper-mauve.vercel.app/',
        type: 'Personal Tool'
    }
];

export default function Projects() {
    const [expandedProject, setExpandedProject] = useState(null);

    const toggleProject = (projectId) => {
        setExpandedProject(expandedProject === projectId ? null : projectId);
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
        hidden: { opacity: 0, y: 30 },
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
        <section id="projects" className="section" aria-label="Projects">
            <motion.div
                className="section-head"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
                <h2 className="h">Projects</h2>
                <p className="kicker">Building Real Solutions with Modern Technology</p>
            </motion.div>

            <motion.div
                className="projects-list"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={cardVariants}
                        layout
                    >
                        {/* Project Card Header - Always visible */}
                        <motion.div
                            className="card project-card"
                            onClick={() => toggleProject(project.id)}
                            style={{ cursor: 'pointer', position: 'relative' }}
                            whileHover={{ y: -4 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{project.title}</h3>
                                        <span
                                            style={{
                                                fontSize: '0.75rem',
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                background: project.status === 'Live'
                                                    ? 'color-mix(in oklab, var(--good) 20%, transparent)'
                                                    : 'color-mix(in oklab, var(--warn) 20%, transparent)',
                                                color: project.status === 'Live' ? 'var(--good)' : 'var(--warn)',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {project.status === 'Live' && (
                                                <motion.span
                                                    animate={{ opacity: [1, 0.4, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                                    style={{ marginRight: '6px', color: 'var(--good)', display: 'inline-block' }}
                                                >
                                                    ●
                                                </motion.span>
                                            )}
                                            {project.status}
                                        </span>
                                    </div>
                                    <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '0.95rem' }}>
                                        {project.tagline}
                                    </p>
                                </div>
                                <motion.span
                                    animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    style={{ fontSize: '1.5rem', color: 'var(--muted)' }}
                                >
                                    ▾
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Expanded Project Details */}
                        <AnimatePresence>
                            {expandedProject === project.id && (
                                <motion.div
                                    className="card project-details"
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ padding: '4px 0' }}>
                                        {/* Video Demo if available */}
                                        {project.videoUrl && (
                                            <motion.div
                                                className="project-video"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 }}
                                                style={{
                                                    marginBottom: '20px',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    background: 'var(--bg-2)',
                                                    border: '1px solid var(--line)'
                                                }}
                                            >
                                                <video
                                                    controls
                                                    playsInline
                                                    preload="metadata"
                                                    style={{
                                                        width: '100%',
                                                        display: 'block',
                                                        maxHeight: '400px',
                                                        objectFit: 'contain',
                                                        background: '#000'
                                                    }}
                                                    poster=""
                                                >
                                                    <source src={project.videoUrl} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <div style={{
                                                    padding: '12px 16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    borderTop: '1px solid var(--line)'
                                                }}>
                                                    <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                                                        Demo Video
                                                    </span>
                                                    {project.apkUrl && (
                                                        <motion.a
                                                            href={project.apkUrl}
                                                            download
                                                            className="btn primary small"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                fontSize: '0.85rem',
                                                                padding: '8px 16px'
                                                            }}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                                <polyline points="7 10 12 15 17 10" />
                                                                <line x1="12" y1="15" x2="12" y2="3" />
                                                            </svg>
                                                            Download APK
                                                        </motion.a>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Project Image if available */}
                                        {project.image && (
                                            <motion.div
                                                className="project-screenshot"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 }}
                                                style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden' }}
                                            >
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    style={{ width: '100%', display: 'block' }}
                                                />
                                            </motion.div>
                                        )}

                                        {/* Description */}
                                        <p style={{ color: 'var(--text)', lineHeight: 1.7, marginBottom: '20px' }}>
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Tech Stack</h4>
                                            <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {project.techStack.map((tech, index) => (
                                                    <motion.span
                                                        key={tech}
                                                        className="tech-badge"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Key Features</h4>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {project.features.map((feature, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.08 }}
                                                        style={{
                                                            padding: '8px 0',
                                                            borderBottom: index < project.features.length - 1 ? '1px solid var(--line)' : 'none',
                                                            color: 'var(--muted)',
                                                        }}
                                                    >
                                                        • {feature}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                            {project.liveUrl && (
                                                <motion.a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn primary"
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                                >
                                                    <span style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        background: 'var(--good)',
                                                        borderRadius: '50%',
                                                        boxShadow: '0 0 8px var(--good)',
                                                    }}></span>
                                                    Live Demo
                                                </motion.a>
                                            )}
                                            {!project.liveUrl && project.status === 'In Development' && (
                                                <span
                                                    className="btn outline"
                                                    style={{
                                                        opacity: 0.7,
                                                        cursor: 'not-allowed',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    Coming Soon
                                                </span>
                                            )}
                                            <motion.a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn outline"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                                </svg>
                                                View Code
                                            </motion.a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>

            {/* Other Work Section */}
            <motion.div
                className="section-head"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ marginTop: '80px', marginBottom: '40px' }}
            >
                <h3 className="h" style={{ fontSize: '1.8rem' }}>Other Work</h3>
                <p className="kicker">Small experiments, client work & open source</p>
            </motion.div>

            <motion.div
                className="other-projects-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}
            >
                {otherProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5 }}
                        className="card"
                        style={{
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{project.title}</h4>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {project.link && project.link !== '#' && (
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            background: 'color-mix(in oklab, var(--good) 15%, transparent)',
                                            color: 'var(--good)',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <motion.span
                                                animate={{ opacity: [1, 0.4, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                            >●</motion.span>
                                            Live
                                        </span>
                                    )}
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        background: 'var(--bg-2)',
                                        border: '1px solid var(--line)',
                                        color: 'var(--muted)'
                                    }}>
                                        {project.type}
                                    </span>
                                </div>
                            </div>

                            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
                                {project.desc}
                            </p>
                        </div>

                        <div>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                {project.tech.map(t => (
                                    <span key={t} style={{ fontSize: '0.8rem', color: 'var(--text)', fontFamily: 'monospace' }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: 'var(--neon)',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}
                            >
                                View Project
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: 'Frontend',
        skills: ['React', 'Next.js', 'JavaScript', 'HTML5', 'CSS', 'Tailwind', 'Zustand'],
    },
    {
        title: 'Backend',
        skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'REST APIs'],
    },
    {
        title: 'DSA & Languages',
        skills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms'],
    },
    {
        title: 'Tools & Version Control',
        skills: ['Git', 'GitHub'],
    },
];

export default function Skills() {
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
        hidden: { opacity: 0, y: 50, scale: 0.9 },
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

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
        },
    };

    return (
        <section id="skills" className="section" aria-label="Skills">
            <motion.div
                className="section-head"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
                <h2 className="h">Skills</h2>
                <p className="kicker">Technologies I work with</p>
            </motion.div>
            <motion.div
                className="grid three"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                {skillCategories.map((category, catIndex) => (
                    <motion.article
                        key={category.title}
                        className="card stat"
                        variants={cardVariants}
                        whileHover={{ y: -10, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <h3 style={{ marginBottom: '16px' }}>{category.title}</h3>
                        <motion.ul
                            className="tags"
                            variants={containerVariants}
                        >
                            {category.skills.map((skill, index) => (
                                <motion.li
                                    key={skill}
                                    variants={tagVariants}
                                    transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                                    whileHover={{
                                        scale: 1.1,
                                        y: -5,
                                    }}
                                >
                                    {skill}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}

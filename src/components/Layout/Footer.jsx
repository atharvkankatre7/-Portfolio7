import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                © {currentYear}{' '}
                <motion.span
                    style={{ color: 'var(--neon)' }}
                    whileHover={{ textShadow: '0 0 20px var(--neon)' }}
                >
                    Atharv Kankatre
                </motion.span>
                . Built with React
            </motion.p>
        </motion.footer>
    );
}

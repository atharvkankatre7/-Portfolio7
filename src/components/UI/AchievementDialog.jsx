import { useState, useEffect, useCallback } from 'react';

const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function AchievementDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [buffer, setBuffer] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            setBuffer(prev => {
                const newBuffer = [...prev, e.key];
                if (newBuffer.length > sequence.length) newBuffer.shift();

                if (sequence.every((k, i) => newBuffer[i] === k)) {
                    setIsOpen(true);
                    return [];
                }

                return newBuffer;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <dialog id="achievement" className="achievement" open>
            <article>
                <h3>Achievement Unlocked!</h3>
                <p>You discovered the secret code. +10 charisma.</p>
                <button className="btn primary" onClick={handleClose}>
                    Nice!
                </button>
            </article>
        </dialog>
    );
}

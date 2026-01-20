import { useState, useEffect, useCallback } from 'react';

const roles = [
    'MERN Stack Developer',
    'Web Developer',
    'Full Stack Developer',
    'Web Designer'
];

export function useTypingAnimation() {
    const [displayText, setDisplayText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (isDeleting) {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(prev => prev.slice(0, -1));
                }, 50);
            } else {
                setIsDeleting(false);
                setRoleIndex(prev => (prev + 1) % roles.length);
            }
        } else {
            if (displayText.length < currentRole.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                }, 100);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, roleIndex, isDeleting]);

    return displayText;
}

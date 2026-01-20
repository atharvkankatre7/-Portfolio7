import { useState, useRef, useEffect } from 'react';

export default function PullToRefresh() {
    const [visible, setVisible] = useState(false);
    const touchStartYRef = useRef(0);

    useEffect(() => {
        const handleTouchStart = (e) => {
            if (window.scrollY === 0) {
                touchStartYRef.current = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            if (touchStartYRef.current > 0) {
                const pullDistance = e.touches[0].clientY - touchStartYRef.current;
                if (pullDistance > 0 && pullDistance < 150) {
                    setVisible(true);
                }
            }
        };

        const handleTouchEnd = () => {
            const pullDistance = window.scrollY === 0 ? 0 : 0;
            if (visible) {
                // Trigger refresh
                // location.reload();
            }
            touchStartYRef.current = 0;
            setVisible(false);
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [visible]);

    return (
        <div className={`pull-to-refresh ${visible ? 'visible' : ''}`} id="pullToRefresh">
            <div className="pull-to-refresh-icon"></div>
            <span>Release to refresh</span>
        </div>
    );
}

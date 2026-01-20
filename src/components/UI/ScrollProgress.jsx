import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function ScrollProgress() {
    const progress = useScrollProgress();

    return (
        <div
            id="scrollProgress"
            style={{ width: `${progress}%` }}
        />
    );
}

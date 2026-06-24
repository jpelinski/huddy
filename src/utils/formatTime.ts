export function formatTime(seconds: number): string {
    const remainingHours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hh = String(remainingHours);
    const mm = String(remainingMinutes).padStart(2, '0');
    const ss = String(remainingSeconds).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}
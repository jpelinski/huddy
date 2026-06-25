import { useCallback } from "react";

export function useDrag() {
    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return;
        if ((e.target as HTMLElement).closest("button")) return;

        let lastX = e.screenX
        let lastY = e.screenY

        const onMouseMove = (e: MouseEvent) => {
            const deltaX = e.screenX - lastX
            const deltaY = e.screenY - lastY
            lastX = e.screenX
            lastY = e.screenY
            window.api.drag({ x: deltaX, y: deltaY })
        }

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)



    }, [])
    return { onMouseDown }
}
import { useEffect, useState } from "react";

export function useAutoUpdater() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updateDownloaded, setUpdateDownloaded] = useState(false);

    useEffect(() => {
        const removeUpdateAvailableListener = window.api.onUpdateAvailable(() => {
            setUpdateAvailable(true);
        });

        const removeUpdateDownloadedListener = window.api.onUpdateDownloaded(() => {
            setUpdateDownloaded(true);
        });

        return () => {
            removeUpdateAvailableListener();
            removeUpdateDownloadedListener();
        }
    }, [])
    return {
        updateAvailable,
        updateDownloaded,
        installUpdate: () => window.api.installUpdate()
    }
}
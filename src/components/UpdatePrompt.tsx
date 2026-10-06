import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

/**
 * Aviso de "actualización disponible" del service worker.
 * Con registerType: 'prompt', el SW nuevo espera a que el usuario
 * confirme antes de activarse y recargar la app.
 */
export default function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      // Comprueba actualizaciones periódicamente (cada hora) por si la
      // pestaña lleva mucho tiempo abierta.
      if (registration) {
        window.setInterval(
          () => {
            void registration.update()
          },
          60 * 60 * 1000,
        )
      }
    },
  })

  useEffect(() => {
    if (!offlineReady) return
    const timer = window.setTimeout(() => setOfflineReady(false), 6000)
    return () => window.clearTimeout(timer)
  }, [offlineReady, setOfflineReady])

  if (!needRefresh && !offlineReady) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-md"
    >
      <div className="flex items-center gap-3 rounded-xl bg-night px-4 py-3 text-white shadow-2xl">
        <p className="flex-1 text-sm">
          {needRefresh
            ? 'Hay una actualización disponible.'
            : 'La app está lista para usar sin conexión.'}
        </p>
        {needRefresh && (
          <button
            type="button"
            onClick={() => void updateServiceWorker(true)}
            className="transition-soft min-h-[44px] shrink-0 rounded-lg bg-electric px-4 text-sm font-semibold text-white hover:bg-electric-dark"
          >
            Actualizar
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setNeedRefresh(false)
            setOfflineReady(false)
          }}
          aria-label="Cerrar aviso"
          className="transition-soft min-h-[44px] min-w-[44px] shrink-0 rounded-lg text-sm text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
